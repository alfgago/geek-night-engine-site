/**
 * Canonical (locale-independent) news post records.
 *
 * Structural fields only: slug, machine-readable dates, author, and source
 * URLs live here exactly once. All translatable copy (title, excerpt, dek,
 * hero stats, body blocks, source labels) lives in the parallel
 * `data/i18n/{lang}/news-posts.json` dictionaries, keyed by slug with an
 * identical structure per locale.
 */
import enPosts from "./i18n/en/news-posts.json";
import esPosts from "./i18n/es/news-posts.json";

const localizedPosts = { en: enPosts, es: esPosts };

export const newsPosts = [
  {
    slug: "build-log-001-game-studio-we-needed",
    datetime: "2026-06-01",
    author: "Geek Engine",
    sources: [
      { href: "https://www.geminixprize.com/" },
      {
        href: "https://www.xprize.org/news/xprize-launches-hackathon-with-2-million-prize-pool-backed-by-google",
      },
      {
        href: "https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights",
      },
    ],
  },
];

function mergePost(post, lang) {
  const locale = localizedPosts[lang] ? lang : "en";
  const copy = localizedPosts[locale][post.slug];

  if (!copy) {
    return null;
  }

  return {
    ...post,
    ...copy,
    sources: post.sources.map((source, index) => ({
      ...source,
      label: copy.sourceLabels?.[index] ?? source.href,
    })),
  };
}

export function getNewsPosts(lang = "en") {
  return newsPosts.map((post) => mergePost(post, lang)).filter(Boolean);
}

export function getNewsPost(slug, lang = "en") {
  const post = newsPosts.find((entry) => entry.slug === slug);
  return post ? mergePost(post, lang) : undefined;
}
