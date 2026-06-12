import { notFound } from "next/navigation";
import { NewsArticlePage } from "@/components/marketing/news-article-page";
import { getNewsPost, newsPosts } from "@/data/news-posts";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return newsPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const post = getNewsPost(slug, lang);

  if (!post) {
    const t = getDictionary(lang, "news");
    return buildMetadata({
      lang,
      title: t.article.fallbackSeo.title,
      description: t.article.fallbackSeo.description,
      canonical: "/news",
    });
  }

  return buildMetadata({
    lang,
    title: post.title,
    description: post.excerpt,
    canonical: `/news/${post.slug}`,
    type: "article",
    publishedTime: post.datetime,
    modifiedTime: post.datetime,
    authors: [post.author],
    tags: post.seoTags,
  });
}

export default async function Page({ params }) {
  const { lang, slug } = await params;
  const post = getNewsPost(slug, lang);

  if (!post) {
    notFound();
  }

  return <NewsArticlePage lang={lang} post={post} />;
}
