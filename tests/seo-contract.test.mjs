import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const root = new URL("../", import.meta.url);

function read(relativePath) {
  return readFileSync(new URL(relativePath, root), "utf8");
}

test("site SEO is centralized and exposes complete social metadata defaults", () => {
  assert.equal(existsSync(new URL("lib/seo.js", root)), true);

  const seo = read("lib/seo.js");
  assert.match(seo, /siteConfig/);
  assert.match(seo, /buildMetadata/);
  assert.match(seo, /metadataBase/);
  assert.match(seo, /openGraph/);
  assert.match(seo, /twitter/);
  assert.match(seo, /alternates/);
  assert.match(seo, /canonical/);
  assert.match(seo, /commonSeo/);
  assert.match(seo, /metadataKeywords/);
  assert.match(seo, /keywords:\s*\[\.\.\.metadataKeywords,\s*\.\.\.tags\]/);
  // Locale awareness: canonical URLs carry the locale prefix and every page
  // declares hreflang pairs plus x-default.
  assert.match(seo, /languageAlternates/);
  assert.match(seo, /languages:\s*languageAlternates\(canonical\)/);
  assert.match(seo, /x-default/);
  assert.match(seo, /localizePath\(locale,\s*canonical\)/);
});

test("all public static pages use the shared metadata builder with locale params", () => {
  const pageFiles = [
    "app/[lang]/page.jsx",
    "app/[lang]/product/page.jsx",
    "app/[lang]/product/architect/page.jsx",
    "app/[lang]/product/scenes/page.jsx",
    "app/[lang]/product/asset-studios/page.jsx",
    "app/[lang]/product/playtest/page.jsx",
    "app/[lang]/product/workspace/page.jsx",
    "app/[lang]/how-it-works/page.jsx",
    "app/[lang]/pricing/page.jsx",
    "app/[lang]/contact/page.jsx",
    "app/[lang]/about/page.jsx",
    "app/[lang]/launch-updates/page.jsx",
    "app/[lang]/careers/page.jsx",
    "app/[lang]/docs/page.jsx",
    "app/[lang]/guides/page.jsx",
    "app/[lang]/status/page.jsx",
    "app/[lang]/security/page.jsx",
    "app/[lang]/dmca/page.jsx",
    "app/[lang]/privacy/page.jsx",
    "app/[lang]/terms/page.jsx",
    "app/[lang]/news/page.jsx",
  ];

  for (const file of pageFiles) {
    const source = read(file);
    assert.match(source, /buildMetadata/, `${file} should import/use buildMetadata`);
    assert.match(source, /canonical:/, `${file} should declare a canonical path`);
    assert.match(source, /generateMetadata\(\{ params \}\)/, `${file} should build per-locale metadata`);
    assert.match(source, /lang/, `${file} should pass the locale through`);
  }
});

test("sitemap, robots, and generated OG image routes are present and locale-aware", () => {
  assert.equal(existsSync(new URL("app/sitemap.js", root)), true);
  assert.equal(existsSync(new URL("app/robots.js", root)), true);
  assert.equal(existsSync(new URL("app/[lang]/opengraph-image.jsx", root)), true);

  const sitemap = read("app/sitemap.js");
  assert.match(sitemap, /newsPosts/);
  assert.match(sitemap, /lastModified/);
  assert.match(sitemap, /changeFrequency/);
  assert.match(sitemap, /priority/);
  // Both locales are listed, with hreflang alternates per entry.
  assert.match(sitemap, /locales\.flatMap/);
  assert.match(sitemap, /localizePath\(lang/);
  assert.match(sitemap, /alternates:\s*\{\s*languages:/);
  // Every new content route is enumerated in the sitemap.
  for (const route of [
    "routes.productArchitect",
    "routes.productScenes",
    "routes.productAssetStudios",
    "routes.productPlaytest",
    "routes.productWorkspace",
    "routes.docs",
    "routes.guides",
    "routes.about",
    "routes.launchUpdates",
    "routes.careers",
    "routes.status",
    "routes.security",
    "routes.dmca",
  ]) {
    assert.ok(sitemap.includes(route), `sitemap should list ${route}`);
  }

  const robots = read("app/robots.js");
  assert.match(robots, /sitemap/);
  assert.match(robots, /allow/);
  assert.match(robots, /disallow/);

  // The OG image lives under [lang] and renders dictionary copy per locale.
  const og = read("app/[lang]/opengraph-image.jsx");
  assert.match(og, /ImageResponse/);
  assert.match(og, /og\.brandName/);
  assert.match(og, /getDictionary\(lang,\s*"common"\)/);
});

test("news article metadata includes canonical URL and article Open Graph data", () => {
  const article = read("app/[lang]/news/[slug]/page.jsx");
  assert.match(article, /buildMetadata/);
  assert.match(article, /canonical:/);
  assert.match(article, /type:\s*"article"/);
  assert.match(article, /publishedTime/);
  assert.match(article, /getNewsPost\(slug,\s*lang\)/);
});

test("status page probes the app health endpoint honestly", () => {
  const statusPage = read("components/marketing/status-page.jsx");
  // Probes the live /up endpoint on the app platform.
  assert.match(statusPage, /app\.geekengine\.ai\/up/);
  // Bounded fetch (~3s timeout) so a hung upstream can't block the render.
  assert.match(statusPage, /AbortController/);
  assert.match(statusPage, /3000/);
  // ISR revalidation keeps the check fresh without hammering upstream.
  assert.match(statusPage, /next:\s*\{\s*revalidate:\s*60\s*\}/);
  // 200 -> operational; anything else (incl. network error) -> degraded.
  assert.match(statusPage, /response\.ok\s*\?\s*"operational"\s*:\s*"degraded"/);
  assert.match(statusPage, /catch\s*\{[\s\S]*?return\s*"degraded"/);
  // Renders a last-checked timestamp.
  assert.match(statusPage, /lastChecked/);

  // The footer status link points at the internal /status route, not the
  // old status.geekengine.ai host.
  const chrome = read("components/marketing/chrome.jsx");
  assert.match(chrome, /href=\{r\.status\}/);
});

test("page components keep a semantic heading hierarchy", () => {
  const chrome = read("components/marketing/chrome.jsx");
  const home = read("components/marketing/home-page.jsx");
  const newsIndex = read("components/marketing/news-page.jsx");
  const article = read("components/marketing/news-article-page.jsx");

  assert.match(chrome, /<h1/);
  assert.match(home, /<h1/);
  assert.match(article, /<h1/);
  assert.match(article, /<h2/);
  assert.doesNotMatch(newsIndex, /<h1/);
  assert.doesNotMatch(article, /<h3/);
});
