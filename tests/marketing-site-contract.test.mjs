import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const root = new URL("../", import.meta.url);

function read(relativePath) {
  return readFileSync(new URL(relativePath, root), "utf8");
}

function readJson(relativePath) {
  return JSON.parse(read(relativePath));
}

test("marketing chrome exposes news and a newsletter-ready launch state", () => {
  const links = read("lib/site-links.js");
  assert.match(links, /news:\s*"\/news"/);
  assert.match(links, /newsletter:\s*"\/#newsletter"/);
  assert.match(links, /localizedRoutes/);

  const common = readJson("data/i18n/en/common.json");
  // News label lives in megaMenu.learn.links now (top-level nav reorganized).
  assert.ok(common.megaMenu.learn.links.news, "news label exists in megaMenu.learn.links");
  assert.match(common.chips.comingSoon, /coming soon/i);

  const chrome = read("components/marketing/chrome.jsx");
  // News link is rendered via MegaMenu component; chrome renders the chips and CTA.
  assert.match(chrome, /t\.chips\.comingSoon/);
  assert.match(chrome, /NewsletterSignup/);
  assert.match(chrome, /MegaMenu/);
  assert.doesNotMatch(chrome, /href=\{r\.login\}/);
  assert.doesNotMatch(chrome, /href=\{r\.workspace\}/);
  assert.doesNotMatch(chrome, /href=\{routes\.login\}/);
  assert.doesNotMatch(chrome, /href=\{routes\.workspace\}/);

  // MegaMenu uses the news route from site-links
  const megaMenu = read("components/marketing/mega-menu.jsx");
  assert.match(megaMenu, /r\.news/);
});

test("legal pages ship without the implementation-ready draft disclaimer", () => {
  const legal = read("components/marketing/legal-page.jsx");
  const legalDictEn = read("data/i18n/en/legal.json");
  const legalDictEs = read("data/i18n/es/legal.json");

  for (const source of [legal, legalDictEn, legalDictEs]) {
    assert.doesNotMatch(source, /implementation-ready/i);
    assert.doesNotMatch(source, /reviewed against the final legal entity/i);
  }

  // The effective-date block stays (rendered from the legal dictionary).
  assert.match(legal, /effectiveDateLabel/);
  assert.equal(readJson("data/i18n/en/legal.json").effectiveDateLabel, "Effective date");
});

test("home page drops the fabricated 'Trusted by studios' social-proof row", () => {
  const data = read("data/marketing-data.js");
  assert.doesNotMatch(data, /trustedStudios/);

  const home = read("components/marketing/home-page.jsx");
  const homeDict = read("data/i18n/en/home.json");
  assert.doesNotMatch(home, /trustedStudios/);
  assert.doesNotMatch(home, /Trusted by studios/i);
  assert.doesNotMatch(homeDict, /Trusted by studios/i);
});

test("nav drops the unlaunched Demo link and keeps a balanced primary CTA", () => {
  const chrome = read("components/marketing/chrome.jsx");
  const common = readJson("data/i18n/en/common.json");

  // No "Demo" entry in the desktop nav (dictionary nav has no demo label,
  // and the nav renders only dictionary-driven entries).
  assert.equal(Object.keys(common.nav).includes("demo"), false);
  assert.doesNotMatch(chrome, /Demo ↗/);
  assert.doesNotMatch(chrome, /\{ id: "demo"/);
  assert.doesNotMatch(read("data/i18n/en/common.json"), /"demo"/); // footer dropped the demo link too
  assert.doesNotMatch(read("data/i18n/es/common.json"), /"demo"/);
  const siteLinks = read("lib/site-links.js");
  assert.doesNotMatch(siteLinks, /demo:/);
  // Newsletter CTA remains.
  assert.match(chrome, /t\.cta\.joinNewsletter/);
  assert.equal(common.cta.joinNewsletter, "Join newsletter");
});

test("mobile navigation is an accessible animated hamburger overlay", () => {
  const mobile = read("components/marketing/mobile-nav.jsx");
  assert.match(mobile, /className="hamburger/);
  assert.match(mobile, /aria-expanded=\{open\}/);
  assert.match(mobile, /aria-controls=\{overlayId\}/);
  assert.match(mobile, /role="dialog"/);
  assert.match(mobile, /aria-modal="true"/);
  // scroll lock, escape, focus management, reduced motion
  assert.match(mobile, /nav-locked/);
  assert.match(mobile, /Escape/);
  assert.match(mobile, /prefers-reduced-motion/);

  const chrome = read("components/marketing/chrome.jsx");
  assert.match(chrome, /MobileNav/);
});

test("mega menu has correct group structure and aria attributes", () => {
  const megaMenu = read("components/marketing/mega-menu.jsx");

  // Four top-level buttons with aria-expanded and aria-controls
  assert.match(megaMenu, /aria-expanded=\{activeId === id\}/);
  assert.match(megaMenu, /aria-controls=\{panelId\}/);

  // All four top-level groups present
  assert.match(megaMenu, /id: "product"/);
  assert.match(megaMenu, /id: "studio"/);
  assert.match(megaMenu, /id: "learn"/);
  assert.match(megaMenu, /id: "company"/);

  // Panel has role="region" and aria-label
  assert.match(megaMenu, /role="region"/);
  assert.match(megaMenu, /aria-label=\{t\.aria\.megaPanel\}/);

  // All 5 product sub-routes present
  assert.match(megaMenu, /r\.product[^A-Z]/);
  assert.match(megaMenu, /r\.productArchitect/);
  assert.match(megaMenu, /r\.productScenes/);
  assert.match(megaMenu, /r\.productAssetStudios/);
  assert.match(megaMenu, /r\.productPlaytest/);
  assert.match(megaMenu, /r\.productWorkspace/);

  // Legal strip lives inside the mega panel
  assert.match(megaMenu, /mega-legal-strip/);
  assert.match(megaMenu, /r\.privacy/);
  assert.match(megaMenu, /r\.terms/);
  assert.match(megaMenu, /r\.security/);
  assert.match(megaMenu, /r\.dmca/);

  // Keyboard: Escape closes
  assert.match(megaMenu, /Escape/);

  // Chrome imports and renders MegaMenu
  const chrome = read("components/marketing/chrome.jsx");
  assert.match(chrome, /MegaMenu/);
  assert.match(chrome, /<MegaMenu/);
});

test("mobile hamburger has 48x48 minimum tap target class", () => {
  const mobile = read("components/marketing/mobile-nav.jsx");

  // The primary trigger has both the hamburger class and mobile-hamburger class
  assert.match(mobile, /mobile-hamburger/);
  assert.match(mobile, /className="hamburger mobile-hamburger mobile-only"/);

  // Globals.css defines min-width/height 48px for mobile-hamburger
  const css = read("app/globals.css");
  assert.match(css, /\.mobile-hamburger/);
  assert.match(css, /min-width:\s*48px/);
  assert.match(css, /min-height:\s*48px/);
});

test("mobile nav has grouped sections with large tap rows", () => {
  const mobile = read("components/marketing/mobile-nav.jsx");

  // Groups keyed by section id
  assert.match(mobile, /id: "product"/);
  assert.match(mobile, /id: "studio"/);
  assert.match(mobile, /id: "learn"/);
  assert.match(mobile, /id: "company"/);

  // All 5 product links present in mobile nav
  assert.match(mobile, /r\.product[^A-Z]/);
  assert.match(mobile, /r\.productArchitect/);
  assert.match(mobile, /r\.productScenes/);
  assert.match(mobile, /r\.productAssetStudios/);
  assert.match(mobile, /r\.productPlaytest/);
  assert.match(mobile, /r\.productWorkspace/);

  // Large tap rows with min-height class
  assert.match(mobile, /mobile-nav-link-row/);

  // Globals.css enforces ≥ 1.25rem font size and ≥48px min-height for rows
  const css = read("app/globals.css");
  assert.match(css, /\.mobile-nav-link-row/);
  assert.match(css, /min-height:\s*48px/);
  assert.match(css, /font-size:\s*1\.25rem/);

  // Staggered entrance uses data-mobile-group
  assert.match(mobile, /data-mobile-group/);

  // Language switcher and CTA pinned at bottom
  assert.match(mobile, /<LanguageSwitcher/);
  assert.match(mobile, /mobile-overlay-foot/);
  assert.match(mobile, /data-mobile-foot/);
});

test("mega menu dictionaries have all required nav labels in en and es", () => {
  const enCommon = readJson("data/i18n/en/common.json");
  const esCommon = readJson("data/i18n/es/common.json");

  // Top-level group labels
  assert.ok(enCommon.megaMenu, "en megaMenu section exists");
  assert.ok(esCommon.megaMenu, "es megaMenu section exists");

  for (const groupId of ["product", "studio", "learn", "company"]) {
    assert.ok(enCommon.megaMenu[groupId], `en megaMenu.${groupId} exists`);
    assert.ok(esCommon.megaMenu[groupId], `es megaMenu.${groupId} exists`);
  }

  // All 5 product sub-page link labels present in both locales
  for (const key of ["architect", "scene", "assets", "playtest", "hub"]) {
    assert.ok(enCommon.megaMenu.product.links[key], `en product.links.${key} exists`);
    assert.ok(esCommon.megaMenu.product.links[key], `es product.links.${key} exists`);
  }

  // Legal strip labels present in both locales
  assert.ok(enCommon.megaMenu.legalStrip, "en legalStrip section exists");
  assert.ok(esCommon.megaMenu.legalStrip, "es legalStrip section exists");
  for (const key of ["privacy", "terms", "security", "dmca"]) {
    assert.ok(enCommon.megaMenu.legalStrip[key], `en legalStrip.${key} exists`);
    assert.ok(esCommon.megaMenu.legalStrip[key], `es legalStrip.${key} exists`);
  }
});

test("footer legal links remain in the footer columns", () => {
  const chrome = read("components/marketing/chrome.jsx");

  // buildFooterCols still references all legal routes
  assert.match(chrome, /r\.privacy/);
  assert.match(chrome, /r\.terms/);
  assert.match(chrome, /r\.security/);
  assert.match(chrome, /r\.dmca/);

  // Footer section still present
  assert.match(chrome, /SiteFooter/);
});

test("newsletter signup uses provider-agnostic public environment variables", () => {
  const signup = read("components/marketing/newsletter-signup.jsx");
  assert.match(signup, /NEXT_PUBLIC_NEWSLETTER_FORM_ACTION/);
  assert.match(signup, /NEXT_PUBLIC_NEWSLETTER_FORM_METHOD/);
  assert.match(signup, /NEXT_PUBLIC_NEWSLETTER_EMAIL_FIELD/);
  assert.match(signup, /type="email"/);
});

test("news route renders the newsletter surface", () => {
  assert.equal(existsSync(new URL("app/[lang]/news/page.jsx", root)), true);

  const newsPage = read("components/marketing/news-page.jsx");
  assert.match(newsPage, /NewsletterSignup/);
});

test("first news post has a detail route and publish-ready localized content", () => {
  assert.equal(existsSync(new URL("app/[lang]/news/[slug]/page.jsx", root)), true);

  // Structural record (slug, datetime, source URLs) lives once in
  // data/news-posts.js; the copy lives per locale in data/i18n/.
  const posts = read("data/news-posts.js");
  assert.match(posts, /build-log-001/);
  assert.match(posts, /getNewsPost/);
  assert.match(posts, /data\/i18n\/\{lang\}\/news-posts\.json|i18n\/(en|es)\/news-posts\.json/);

  const enPosts = read("data/i18n/en/news-posts.json");
  assert.match(enPosts, /The Game Studio We Needed Ten Years Ago/);
  assert.match(enPosts, /Gemini 3\.5 Flash/);
  assert.match(enPosts, /Build with Gemini XPRIZE/);
  assert.match(enPosts, /Google Cloud/);

  const articlePage = read("app/[lang]/news/[slug]/page.jsx");
  assert.match(articlePage, /generateStaticParams/);
  assert.match(articlePage, /notFound/);
});

test("env example documents marketing and newsletter configuration", () => {
  const env = read(".env.example");
  for (const key of [
    "NEXT_PUBLIC_SITE_URL",
    "NEXT_PUBLIC_APP_URL",
    "NEXT_PUBLIC_NEWSLETTER_PROVIDER",
    "NEXT_PUBLIC_NEWSLETTER_FORM_ACTION",
    "NEXT_PUBLIC_NEWSLETTER_FORM_METHOD",
    "NEXT_PUBLIC_NEWSLETTER_EMAIL_FIELD",
  ]) {
    assert.match(env, new RegExp(`^${key}=`, "m"));
  }
});

test("newsletter environment defaults are configured for Brevo hosted forms", () => {
  const env = read(".env.example");
  const readme = read("README.md");
  const signup = read("components/marketing/newsletter-signup.jsx");

  assert.match(env, /^NEXT_PUBLIC_NEWSLETTER_PROVIDER=Brevo$/m);
  assert.match(env, /^NEXT_PUBLIC_NEWSLETTER_EMAIL_FIELD=EMAIL$/m);
  assert.match(env, /YOUR_BREVO_FORM_ACTION_URL/);
  assert.match(readme, /Brevo/i);
  assert.match(readme, /300 daily email sends/i);
  assert.match(signup, /NEXT_PUBLIC_NEWSLETTER_PROVIDER \|\| "Brevo"/);
  assert.match(signup, /NEXT_PUBLIC_NEWSLETTER_EMAIL_FIELD \|\| "EMAIL"/);
});
