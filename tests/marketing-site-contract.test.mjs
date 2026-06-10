import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const root = new URL("../", import.meta.url);

function read(relativePath) {
  return readFileSync(new URL(relativePath, root), "utf8");
}

test("marketing chrome exposes news and a newsletter-ready launch state", () => {
  const links = read("lib/site-links.js");
  assert.match(links, /news:\s*"\/news"/);
  assert.match(links, /newsletter:\s*"\/#newsletter"/);

  const chrome = read("components/marketing/chrome.jsx");
  assert.match(chrome, /label:\s*"News"/);
  assert.match(chrome, /Coming soon/i);
  assert.match(chrome, /NewsletterSignup/);
  assert.doesNotMatch(chrome, /href=\{routes\.login\}/);
  assert.doesNotMatch(chrome, /href=\{routes\.workspace\}/);
});

test("newsletter signup uses provider-agnostic public environment variables", () => {
  const signup = read("components/marketing/newsletter-signup.jsx");
  assert.match(signup, /NEXT_PUBLIC_NEWSLETTER_FORM_ACTION/);
  assert.match(signup, /NEXT_PUBLIC_NEWSLETTER_FORM_METHOD/);
  assert.match(signup, /NEXT_PUBLIC_NEWSLETTER_EMAIL_FIELD/);
  assert.match(signup, /type="email"/);
});

test("news route renders the newsletter surface", () => {
  assert.equal(existsSync(new URL("app/news/page.jsx", root)), true);

  const newsPage = read("components/marketing/news-page.jsx");
  assert.match(newsPage, /NewsletterSignup/);
});

test("first news post has a detail route and publish-ready content", () => {
  assert.equal(existsSync(new URL("app/news/[slug]/page.jsx", root)), true);

  const posts = read("data/news-posts.js");
  assert.match(posts, /build-log-001/);
  assert.match(posts, /The Game Studio We Needed Ten Years Ago/);
  assert.match(posts, /Gemini 3\.5 Flash/);
  assert.match(posts, /Build with Gemini XPRIZE/);
  assert.match(posts, /Google Cloud/);

  const articlePage = read("app/news/[slug]/page.jsx");
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
