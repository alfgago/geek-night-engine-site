import enCommon from "@/data/i18n/en/common.json";
import esCommon from "@/data/i18n/es/common.json";
import { defaultLocale, isLocale, localizePath, locales } from "./locales";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://127.0.0.1:3000";

function normalizeSiteUrl(url) {
  return url.replace(/\/+$/, "");
}

const ogLocales = {
  en: "en_US",
  es: "es_LA",
};

const commonSeo = {
  en: enCommon.seo,
  es: esCommon.seo,
};

export const siteConfig = {
  name: enCommon.brand.name,
  defaultTitle: enCommon.seo.defaultTitle,
  description: enCommon.seo.description,
  url: normalizeSiteUrl(rawSiteUrl),
  locale: "en_US",
  keywords: enCommon.seo.keywords,
};

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
}

function resolveTitle(title) {
  if (!title) {
    return siteConfig.defaultTitle;
  }

  if (typeof title === "string") {
    return title;
  }

  return title.default || siteConfig.defaultTitle;
}

function socialTitle(title) {
  const resolvedTitle = resolveTitle(title);
  return resolvedTitle === siteConfig.defaultTitle ? resolvedTitle : `${resolvedTitle} | ${siteConfig.name}`;
}

/**
 * Build hreflang alternates for a locale-less canonical path.
 * Every page gets en/es pairs plus x-default pointing at English.
 */
export function languageAlternates(path = "/") {
  const languages = {};
  for (const locale of locales) {
    languages[locale] = absoluteUrl(localizePath(locale, path));
  }
  languages["x-default"] = absoluteUrl(localizePath(defaultLocale, path));
  return languages;
}

export function buildMetadata({
  lang = defaultLocale,
  title = siteConfig.defaultTitle,
  description = siteConfig.description,
  canonical = "/",
  image,
  type = "website",
  noIndex = false,
  publishedTime,
  modifiedTime,
  authors,
  keywords,
  tags = [],
} = {}) {
  const locale = isLocale(lang) ? lang : defaultLocale;
  const localeSeo = commonSeo[locale] || commonSeo[defaultLocale];
  const metadataKeywords = keywords || localeSeo.keywords || siteConfig.keywords;
  // `canonical` is the locale-less path ("/product"); the canonical URL and
  // hreflang alternates are derived from it per locale.
  const canonicalUrl = absoluteUrl(localizePath(locale, canonical));
  const imageUrl = absoluteUrl(image || localizePath(locale, "/opengraph-image"));
  const resolvedSocialTitle = socialTitle(title);

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    keywords: [...metadataKeywords, ...tags],
    alternates: {
      canonical: canonicalUrl,
      languages: languageAlternates(canonical),
    },
    openGraph: {
      title: resolvedSocialTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: ogLocales[locale] || siteConfig.locale,
      alternateLocale: locales.filter((other) => other !== locale).map((other) => ogLocales[other]),
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: resolvedSocialTitle,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(authors ? { authors } : {}),
      ...(tags.length ? { tags } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedSocialTitle,
      description,
      images: [imageUrl],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
