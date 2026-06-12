import { localizePath } from "./locales";

const appBase = process.env.NEXT_PUBLIC_APP_URL || "http://127.0.0.1:8000";

/**
 * Locale-less internal paths (used by the sitemap, metadata canonicals,
 * and as the base for `localizedRoutes`).
 */
export const routes = {
  home: "/",
  product: "/product",
  productArchitect: "/product/architect",
  productScenes: "/product/scenes",
  productAssetStudios: "/product/asset-studios",
  productPlaytest: "/product/playtest",
  productWorkspace: "/product/workspace",
  how: "/how-it-works",
  pricing: "/pricing",
  news: "/news",
  contact: "/contact",
  about: "/about",
  launchUpdates: "/launch-updates",
  careers: "/careers",
  docs: "/docs",
  guides: "/guides",
  status: "/status",
  privacy: "/privacy",
  terms: "/terms",
  security: "/security",
  dmca: "/dmca",
  newsletter: "/#newsletter",
  login: `${appBase}/login`,
  workspace: `${appBase}/projects/new`,
};

/**
 * Locale-prefixed routes for rendering links ("/es/product", "/en#newsletter").
 * External product-app URLs pass through unchanged.
 */
export function localizedRoutes(lang) {
  const localized = {};
  for (const [key, path] of Object.entries(routes)) {
    localized[key] = localizePath(lang, path);
  }
  return localized;
}
