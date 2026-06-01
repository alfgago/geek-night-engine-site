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
});

test("all public static pages use the shared metadata builder", () => {
  const pageFiles = [
    "app/page.jsx",
    "app/product/page.jsx",
    "app/how-it-works/page.jsx",
    "app/pricing/page.jsx",
    "app/contact/page.jsx",
    "app/privacy/page.jsx",
    "app/terms/page.jsx",
    "app/news/page.jsx",
  ];

  for (const file of pageFiles) {
    const source = read(file);
    assert.match(source, /buildMetadata/, `${file} should import/use buildMetadata`);
    assert.match(source, /canonical:/, `${file} should declare a canonical path`);
  }
});

test("sitemap, robots, and generated OG image routes are present", () => {
  assert.equal(existsSync(new URL("app/sitemap.js", root)), true);
  assert.equal(existsSync(new URL("app/robots.js", root)), true);
  assert.equal(existsSync(new URL("app/opengraph-image.jsx", root)), true);

  const sitemap = read("app/sitemap.js");
  assert.match(sitemap, /newsPosts/);
  assert.match(sitemap, /lastModified/);
  assert.match(sitemap, /changeFrequency/);
  assert.match(sitemap, /priority/);

  const robots = read("app/robots.js");
  assert.match(robots, /sitemap/);
  assert.match(robots, /allow/);
  assert.match(robots, /disallow/);

  const og = read("app/opengraph-image.jsx");
  assert.match(og, /ImageResponse/);
  assert.match(og, /Geek Night Engine/);
});

test("news article metadata includes canonical URL and article Open Graph data", () => {
  const article = read("app/news/[slug]/page.jsx");
  assert.match(article, /buildMetadata/);
  assert.match(article, /canonical:/);
  assert.match(article, /type:\s*"article"/);
  assert.match(article, /publishedTime/);
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
