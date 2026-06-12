/**
 * Tiny locale configuration shared by middleware, the dictionary loader,
 * and client components (e.g. the language switcher). Keep this module
 * dependency-free so the middleware/client bundles stay small — it must
 * never import the dictionaries themselves.
 */

export const locales = ["en", "es"];
export const defaultLocale = "en";

export const LOCALE_COOKIE = "NEXT_LOCALE";

export function isLocale(value) {
  return locales.includes(value);
}

/**
 * Hand-rolled Accept-Language matcher (no `negotiator` dependency).
 * Parses `es-CR,es;q=0.9,en;q=0.8`-style headers, sorts by quality,
 * and returns the first supported primary language (es* → "es",
 * en* → "en"). Falls back to the default locale.
 */
export function pickLocale(acceptLanguage) {
  if (!acceptLanguage || typeof acceptLanguage !== "string") {
    return defaultLocale;
  }

  const ranges = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      let quality = 1;
      for (const param of params) {
        const [key, value] = param.trim().split("=");
        if (key === "q") {
          const parsed = Number.parseFloat(value);
          if (!Number.isNaN(parsed)) {
            quality = parsed;
          }
        }
      }
      return { tag: tag.trim().toLowerCase(), quality };
    })
    .filter((range) => range.tag && range.quality > 0)
    .sort((a, b) => b.quality - a.quality);

  for (const { tag } of ranges) {
    if (tag === "*") {
      return defaultLocale;
    }
    const primary = tag.split("-")[0];
    if (isLocale(primary)) {
      return primary;
    }
  }

  return defaultLocale;
}

/**
 * Prefix an internal path with a locale segment.
 * Leaves external URLs, mailto links, and bare hash links untouched.
 *   localizePath("es", "/product")      -> "/es/product"
 *   localizePath("en", "/")             -> "/en"
 *   localizePath("en", "/#newsletter")  -> "/en#newsletter"
 */
export function localizePath(lang, path = "/") {
  const locale = isLocale(lang) ? lang : defaultLocale;

  if (!path.startsWith("/")) {
    return path;
  }

  if (path === "/") {
    return `/${locale}`;
  }

  if (path.startsWith("/#")) {
    return `/${locale}${path.slice(1)}`;
  }

  return `/${locale}${path}`;
}
