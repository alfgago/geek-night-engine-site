import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";

const root = new URL("../", import.meta.url);

function read(relativePath) {
  return readFileSync(new URL(relativePath, root), "utf8");
}

function readJson(relativePath) {
  return JSON.parse(read(relativePath));
}

const NAMESPACES = [
  "common",
  "home",
  "product",
  "how-it-works",
  "pricing",
  "contact",
  "legal",
  "news",
  "news-posts",
];

test("middleware redirects locale-less requests with a scoped matcher", () => {
  assert.equal(existsSync(new URL("middleware.js", root)), true);

  const middleware = read("middleware.js");
  // Reads (never writes) the locale cookie; the switcher owns writing it.
  assert.match(middleware, /LOCALE_COOKIE/);
  assert.doesNotMatch(middleware, /cookies\.set/);
  // Accept-Language fallback via the hand-rolled parser.
  assert.match(middleware, /pickLocale\(request\.headers\.get\("accept-language"\)\)/);
  // Temporary redirect so the locale decision is re-evaluated per visitor.
  assert.match(middleware, /NextResponse\.redirect\(url,\s*307\)/);
  // Matcher skips api, _next internals, and file-extension paths.
  assert.match(middleware, /matcher:/);
  assert.match(middleware, /\?!api\|_next\|/);

  const locales = read("lib/locales.js");
  assert.match(locales, /\["en",\s*"es"\]/);
  assert.match(locales, /defaultLocale\s*=\s*"en"/);
  // es* variants (es-CR, es-MX, ...) and q-values are handled.
  assert.match(locales, /split\("-"\)\[0\]/);
  assert.match(locales, /q/);
});

test("every namespace exists for every locale and es mirrors the en key structure", () => {
  const enDir = new URL("data/i18n/en/", root);
  const esDir = new URL("data/i18n/es/", root);

  // No stray namespaces outside the declared list.
  assert.deepEqual(readdirSync(enDir).sort(), NAMESPACES.map((n) => `${n}.json`).sort());
  assert.deepEqual(readdirSync(esDir).sort(), NAMESPACES.map((n) => `${n}.json`).sort());

  for (const namespace of NAMESPACES) {
    const en = readJson(`data/i18n/en/${namespace}.json`);
    const es = readJson(`data/i18n/es/${namespace}.json`);

    const mismatches = [];
    compareStructure(en, es, namespace, mismatches);
    assert.deepEqual(mismatches, [], `structure drift in ${namespace}.json:\n${mismatches.join("\n")}`);
  }
});

/**
 * Recursive structural parity: identical key sets for objects, identical
 * lengths for arrays, identical types for leaves. Translated VALUES are
 * free to differ — this guards the translation step against dropped or
 * added keys.
 */
function compareStructure(en, es, path, mismatches) {
  const enType = valueType(en);
  const esType = valueType(es);

  if (enType !== esType) {
    mismatches.push(`${path}: type ${enType} (en) vs ${esType} (es)`);
    return;
  }

  if (enType === "array") {
    if (en.length !== es.length) {
      mismatches.push(`${path}: array length ${en.length} (en) vs ${es.length} (es)`);
      return;
    }
    en.forEach((item, index) => compareStructure(item, es[index], `${path}[${index}]`, mismatches));
    return;
  }

  if (enType === "object") {
    const enKeys = Object.keys(en).sort();
    const esKeys = Object.keys(es).sort();
    const missing = enKeys.filter((key) => !esKeys.includes(key));
    const extra = esKeys.filter((key) => !enKeys.includes(key));
    if (missing.length || extra.length) {
      mismatches.push(`${path}: missing in es [${missing}] / extra in es [${extra}]`);
      return;
    }
    for (const key of enKeys) {
      compareStructure(en[key], es[key], `${path}.${key}`, mismatches);
    }
  }
}

function valueType(value) {
  if (Array.isArray(value)) return "array";
  if (value === null) return "null";
  return typeof value;
}

test("interpolation placeholders survive translation", () => {
  // {placeholders} carry pricing numbers and emails from marketing-data.js;
  // a translation that drops one would silently break a price or contact.
  for (const namespace of NAMESPACES) {
    const en = readJson(`data/i18n/en/${namespace}.json`);
    const es = readJson(`data/i18n/es/${namespace}.json`);

    const mismatches = [];
    comparePlaceholders(en, es, namespace, mismatches);
    assert.deepEqual(mismatches, [], `placeholder drift in ${namespace}.json:\n${mismatches.join("\n")}`);
  }
});

function comparePlaceholders(en, es, path, mismatches) {
  if (typeof en === "string" && typeof es === "string") {
    const enVars = (en.match(/\{\w+\}/g) || []).sort();
    const esVars = (es.match(/\{\w+\}/g) || []).sort();
    if (JSON.stringify(enVars) !== JSON.stringify(esVars)) {
      mismatches.push(`${path}: [${enVars}] (en) vs [${esVars}] (es)`);
    }
    return;
  }
  if (Array.isArray(en) && Array.isArray(es)) {
    en.forEach((item, index) => comparePlaceholders(item, es[index], `${path}[${index}]`, mismatches));
    return;
  }
  if (en && es && typeof en === "object" && typeof es === "object") {
    for (const key of Object.keys(en)) {
      comparePlaceholders(en[key], es[key], `${path}.${key}`, mismatches);
    }
  }
}

test("dictionaries load through a static import map (SSG-safe)", () => {
  const i18n = read("lib/i18n.js");
  assert.match(i18n, /getDictionary/);
  assert.match(i18n, /import enCommon from "@\/data\/i18n\/en\/common\.json"/);
  assert.match(i18n, /import esCommon from "@\/data\/i18n\/es\/common\.json"/);
  // No runtime fs / dynamic import.
  assert.doesNotMatch(i18n, /require\(|fs\.|import\(/);
});

test("locale segment routing covers both locales statically", () => {
  const layout = read("app/[lang]/layout.jsx");
  assert.match(layout, /generateStaticParams/);
  assert.match(layout, /locales\.map\(\(lang\) => \(\{ lang \}\)\)/);
  assert.match(layout, /dynamicParams = false/);
  assert.match(layout, /<html lang=\{lang\}/);
});

test("language switcher is wired into the desktop nav and mobile overlay", () => {
  const switcher = read("components/marketing/language-switcher.jsx");
  assert.match(switcher, /aria-current=\{active \? "true" : undefined\}/);
  assert.match(switcher, /data-active=\{active\}/);
  assert.match(switcher, /LOCALE_COOKIE/);
  assert.match(switcher, /max-age=31536000/);
  // Preserves path + query + hash when swapping locales.
  assert.match(switcher, /window\.location\.search/);
  assert.match(switcher, /window\.location\.hash/);

  const chrome = read("components/marketing/chrome.jsx");
  assert.match(chrome, /<LanguageSwitcher/);

  const mobile = read("components/marketing/mobile-nav.jsx");
  assert.match(mobile, /<LanguageSwitcher/);

  const css = read("app/globals.css");
  assert.match(css, /\.lang-switch-option\[data-active="true"\]/);
});

test("pricing numbers and contact emails live in exactly one place", () => {
  const data = read("data/marketing-data.js");
  assert.match(data, /pricingNumbers/);
  assert.match(data, /contacts/);

  // Dictionaries must not hard-code prices, GB quotas, or emails — they
  // interpolate them. (Plain numerals like "2D"/"3D"/dates are fine.)
  for (const lang of ["en", "es"]) {
    for (const namespace of ["pricing", "legal", "contact", "home", "common"]) {
      const source = read(`data/i18n/${lang}/${namespace}.json`);
      assert.doesNotMatch(source, /\$\d+(\.\d+)?/, `${lang}/${namespace}.json should not hard-code dollar amounts`);
      assert.doesNotMatch(source, /@geekengine\.ai/, `${lang}/${namespace}.json should not hard-code emails`);
    }
  }

  const pricingPage = read("components/marketing/pricing-page.jsx");
  assert.match(pricingPage, /pricingNumbers/);
  assert.doesNotMatch(pricingPage, /"\$\d+/);
});
