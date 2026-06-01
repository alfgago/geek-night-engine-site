const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://127.0.0.1:3000";

function normalizeSiteUrl(url) {
  return url.replace(/\/+$/, "");
}

export const siteConfig = {
  name: "Geek Night Engine",
  defaultTitle: "Geek Night Engine - AI-assisted Godot, in the browser",
  description: "The professional cloud workspace for AI-native Godot game production.",
  url: normalizeSiteUrl(rawSiteUrl),
  locale: "en_US",
  keywords: [
    "Geek Night Engine",
    "AI game development",
    "Godot game engine",
    "browser game development",
    "AI game studio",
    "cloud game compiler",
    "indie game development",
    "Godot 4",
  ],
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

export function buildMetadata({
  title = siteConfig.defaultTitle,
  description = siteConfig.description,
  canonical = "/",
  image = "/opengraph-image",
  type = "website",
  noIndex = false,
  publishedTime,
  modifiedTime,
  authors,
  tags = [],
} = {}) {
  const canonicalUrl = absoluteUrl(canonical);
  const imageUrl = absoluteUrl(image);
  const resolvedSocialTitle = socialTitle(title);

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    keywords: [...siteConfig.keywords, ...tags],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: resolvedSocialTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
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
