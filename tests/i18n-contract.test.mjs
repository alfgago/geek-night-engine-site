import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
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
  "product-architect",
  "product-scenes",
  "product-asset-studios",
  "product-playtest",
  "product-workspace",
  "how-it-works",
  "pricing",
  "contact",
  "about",
  "careers",
  "launch-updates",
  "docs",
  "guides",
  "status",
  "legal",
  "security",
  "dmca",
  "news",
  "news-posts",
];

const SOURCE_SCAN_DIRS = ["app", "components", "lib", "data"];
const SOURCE_SCAN_SKIP_DIRS = new Set(["data/i18n"]);
const USER_VISIBLE_ATTRIBUTES = ["aria-label", "placeholder", "title", "alt"];
const VISIBLE_PROPERTY_NAMES = [
  "alt",
  "author",
  "badge",
  "blurb",
  "body",
  "copy",
  "copyright",
  "cta",
  "defaultTitle",
  "description",
  "emptyBody",
  "eyebrow",
  "footer",
  "head",
  "headline",
  "heading",
  "helper",
  "hint",
  "kicker",
  "label",
  "message",
  "name",
  "placeholder",
  "prompt",
  "reply",
  "status",
  "sub",
  "subtitle",
  "text",
  "title",
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

test("Spanish marketing dictionaries avoid known mistranslations", () => {
  const forbidden = [
    "Hablalo",
    "todos los sistemas operativos",
    "Lanzar boletín",
    "todas auditable,",
    "nativa a IA",
    "nativo a IA",
    "nativo de web",
    "Rastrear instantáneamente",
    "Rastrear cursores",
    "cosechar información",
    "copiables por derechos de autor",
    "e yo intentamos",
    "superficie técnica cool",
    "guardos",
    "se convierte en el factor decisivo",
    "Geek Engine se une",
  ];

  const failures = [];
  for (const namespace of NAMESPACES) {
    const values = flattenStrings(readJson(`data/i18n/es/${namespace}.json`));
    for (const { path: keyPath, value } of values) {
      for (const phrase of forbidden) {
        if (value.includes(phrase)) {
          failures.push(`${namespace}.${keyPath}: ${phrase}`);
        }
      }
    }
  }

  assert.deepEqual(failures, [], `Spanish translation quality issues:\n${failures.join("\n")}`);
});

function flattenStrings(value, pathKey = "") {
  if (typeof value === "string") {
    return [{ path: pathKey, value }];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, index) => flattenStrings(item, `${pathKey}[${index}]`));
  }

  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) => {
      const nextPath = pathKey ? `${pathKey}.${key}` : key;
      return flattenStrings(item, nextPath);
    });
  }

  return [];
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

  // Annual prices and the store-export credit cost are canonical numbers in
  // marketing-data, interpolated into copy — never hard-coded in dictionaries.
  assert.match(data, /priceAnnual:\s*"\$290"/);
  assert.match(data, /priceAnnual:\s*"\$990"/);
  assert.match(data, /storeExportCredits/);
  // The annual billing toggle is wired into the pricing page.
  assert.match(pricingPage, /setAnnual/);
  assert.match(pricingPage, /priceAnnual/);
});

test("product mock and pipeline UI copy is dictionary-owned, not hardcoded in JSX", () => {
  const sourceFiles = [
    "components/marketing/hero-product-mock.jsx",
    "components/marketing/module-previews.jsx",
    "components/marketing/how-it-works-page.jsx",
  ];

  const hardcodedPhrases = [
    "You · 12m",
    "just now",
    "Spawned",
    "Tune the boss room",
    "SNAPSHOT #148",
    "nodes ·",
    "revertable · safe to playtest",
    "STUDIO ACTIVITY",
    "sam rebuilt goldcrest-run",
    "Make the boss room",
    "Architect · 6 tickets",
    "READY",
    "Adjust phase 3",
    "INSPECTOR · PLAYER",
    "STORAGE",
    "UNUSED",
    "auto-bind on save",
    "EVT",
    "SESS",
    "COMP",
    "SCAFFOLDING · CHOOSE A STARTER",
    "described by you",
    "DECOMPOSE · 6 ATOMIC TICKETS",
    "CLOUD COMPILE",
    "godot --headless",
    "SELF-HEAL",
    "CollisionShape3D null",
    "DEPLOY · SNAPSHOTS",
    "PINNED",
    "HEAD",
    "LIVE URL",
  ];

  const failures = [];
  for (const file of sourceFiles) {
    const source = read(file);
    for (const phrase of hardcodedPhrases) {
      if (source.includes(phrase)) {
        failures.push(`${file}: ${phrase}`);
      }
    }
  }

  assert.deepEqual(failures, [], `hardcoded user-facing mock copy:\n${failures.join("\n")}`);

  const common = readJson("data/i18n/en/common.json");
  const product = readJson("data/i18n/en/product.json");
  const how = readJson("data/i18n/en/how-it-works.json");
  assert.ok(common.productMock, "common.json owns the homepage product mock copy");
  assert.ok(product.previewMock, "product.json owns the module preview mock copy");
  assert.ok(how.pipelineMock, "how-it-works.json owns the pipeline mock copy");
});

test("visible brand wordmarks are dictionary-owned", () => {
  const common = readJson("data/i18n/en/common.json");
  assert.ok(common.brand, "common.json owns visible brand wordmark copy");

  const brand = read("components/marketing/brand.jsx");
  assert.doesNotMatch(brand, />Geek</);
  assert.doesNotMatch(brand, />Engine</);

  const chrome = read("components/marketing/chrome.jsx");
  assert.doesNotMatch(chrome, /geek<span/);
  assert.match(chrome, /brand=\{t\.brand\}/);
  assert.match(chrome, /brand=\{common\.brand\}/);

  const mobile = read("components/marketing/mobile-nav.jsx");
  assert.match(mobile, /brand=\{t\.brand\}/);

  const og = read("app/[lang]/opengraph-image.jsx");
  assert.doesNotMatch(og, />Geek Engine</);
  assert.match(og, /og\.brandName/);
});

test("source-visible text is owned by EN dictionaries with ES translations", () => {
  const dictionaryIndex = indexDictionaries();
  const violations = findSourceVisibleText();
  const missing = violations.filter((violation) => !dictionaryIndex.hasTranslationPathFor(violation.value));

  if (missing.length > 0) {
    const preview = missing
      .slice(0, 80)
      .map((violation) => `${violation.file}:${violation.line} ${violation.kind} "${violation.value}"`)
      .join("\n");
    assert.fail(`Found ${missing.length} source-visible strings without EN/ES dictionary ownership:\n${preview}`);
  }
});

function indexDictionaries() {
  const englishPathsByValue = new Map();
  const spanishByPath = new Map();

  for (const namespace of NAMESPACES) {
    collectDictionaryLeaves(readJson(`data/i18n/en/${namespace}.json`), namespace, englishPathsByValue);
    collectDictionaryLeaves(readJson(`data/i18n/es/${namespace}.json`), namespace, spanishByPath, { keyByPath: true });
  }

  return {
    hasTranslationPathFor(value) {
      const paths = englishPathsByValue.get(value);
      return Boolean(paths?.some((pathKey) => {
        const spanish = spanishByPath.get(pathKey);
        return typeof spanish === "string" && spanish.trim() !== "";
      }));
    },
  };
}

function collectDictionaryLeaves(value, pathKey, target, options = {}) {
  if (typeof value === "string") {
    if (options.keyByPath) {
      target.set(pathKey, value);
    } else {
      const paths = target.get(value) || [];
      paths.push(pathKey);
      target.set(value, paths);
    }
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => collectDictionaryLeaves(item, `${pathKey}[${index}]`, target, options));
    return;
  }

  if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      collectDictionaryLeaves(item, `${pathKey}.${key}`, target, options);
    }
  }
}

function findSourceVisibleText() {
  const rootDir = fileURLToPath(root);
  return SOURCE_SCAN_DIRS
    .flatMap((dir) => walkSource(path.join(rootDir, dir), rootDir))
    .flatMap((file) => scanSourceFile(file, rootDir))
    .sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line || a.value.localeCompare(b.value));
}

function walkSource(dir, rootDir, files = []) {
  const relativeDir = path.relative(rootDir, dir).replace(/\\/g, "/");
  if (SOURCE_SCAN_SKIP_DIRS.has(relativeDir)) {
    return files;
  }

  for (const entry of readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const relativePath = path.relative(rootDir, fullPath).replace(/\\/g, "/");
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      if (!SOURCE_SCAN_SKIP_DIRS.has(relativePath)) {
        walkSource(fullPath, rootDir, files);
      }
      continue;
    }

    if (/\.(jsx|js)$/.test(entry)) {
      files.push(fullPath);
    }
  }

  return files;
}

function scanSourceFile(file, rootDir) {
  const source = readFileSync(file, "utf8");
  const relative = path.relative(rootDir, file).replace(/\\/g, "/");
  const violations = [];
  const attrPattern = new RegExp(`\\b(${USER_VISIBLE_ATTRIBUTES.join("|")})\\s*=\\s*["']([^"']*[A-Za-z][^"']*)["']`, "g");
  const propPattern = new RegExp(`\\b(${VISIBLE_PROPERTY_NAMES.join("|")})\\s*:\\s*["']([^"']*[A-Za-z][^"']*)["']`, "g");
  const jsxTextPattern = />\s*([^<>{}\n]*[A-Za-z][^<>{}\n]*)\s*</g;
  const indexedArrayPattern = /\b(keywords|tags)\s*:\s*\[([\s\S]*?)\]/g;

  for (const match of source.matchAll(attrPattern)) {
    pushSourceViolation(violations, relative, source, match.index, `attribute:${match[1]}`, match[2]);
  }

  for (const match of source.matchAll(propPattern)) {
    pushSourceViolation(violations, relative, source, match.index, `property:${match[1]}`, match[2]);
  }

  for (const match of source.matchAll(jsxTextPattern)) {
    pushSourceViolation(violations, relative, source, match.index, "jsx-text", match[1]);
  }

  for (const block of source.matchAll(indexedArrayPattern)) {
    for (const item of block[2].matchAll(/["']([^"']*[A-Za-z][^"']*)["']/g)) {
      pushSourceViolation(violations, relative, source, block.index + item.index, block[1], item[1]);
    }
  }

  return violations;
}

function pushSourceViolation(violations, file, source, index, kind, value) {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (!looksUserVisible(normalized)) {
    return;
  }

  violations.push({
    file,
    line: source.slice(0, index).split(/\r?\n/).length,
    kind,
    value: normalized,
  });
}

function looksUserVisible(text) {
  if (!text || !/[A-Za-z]/.test(text)) {
    return false;
  }

  if (text.includes("{") || text.includes("}")) {
    return false;
  }

  if (text.includes("&&") || text.includes("[^") || text.includes("&gt;")) {
    return false;
  }

  if (/^(https?:|mailto:|\/|#|[a-z]+:|[A-Z_]+$)/.test(text)) {
    return false;
  }

  if (/^(var\(|rgba?\(|linear-gradient|radial-gradient|clamp\(|calc\(|inset\(|translate|rotate|url\()/.test(text)) {
    return false;
  }

  if (/^[a-z0-9_.:/#-]+$/.test(text) && !text.includes(" ")) {
    return false;
  }

  if (/^[MLHVCSQTAZmlhvcsqtaz0-9.,\-\s]+$/.test(text)) {
    return false;
  }

  return true;
}
