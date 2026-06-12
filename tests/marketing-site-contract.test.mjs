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
  assert.equal(common.nav.news, "News");
  assert.match(common.chips.comingSoon, /coming soon/i);

  const chrome = read("components/marketing/chrome.jsx");
  assert.match(chrome, /t\.nav\.news/);
  assert.match(chrome, /t\.chips\.comingSoon/);
  assert.match(chrome, /NewsletterSignup/);
  assert.doesNotMatch(chrome, /href=\{r\.login\}/);
  assert.doesNotMatch(chrome, /href=\{r\.workspace\}/);
  assert.doesNotMatch(chrome, /href=\{routes\.login\}/);
  assert.doesNotMatch(chrome, /href=\{routes\.workspace\}/);
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
