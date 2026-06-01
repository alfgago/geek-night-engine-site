import { notFound } from "next/navigation";
import { NewsArticlePage } from "@/components/marketing/news-article-page";
import { getNewsPost, newsPosts } from "@/data/news-posts";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return newsPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getNewsPost(slug);

  if (!post) {
    return buildMetadata({
      title: "News",
      description: "Launch updates and product news from Geek Night Engine.",
      canonical: "/news",
    });
  }

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    canonical: `/news/${post.slug}`,
    type: "article",
    publishedTime: post.datetime,
    modifiedTime: post.datetime,
    authors: [post.author],
    tags: [post.category, "Godot", "AI game development", "Build with Gemini XPRIZE"],
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const post = getNewsPost(slug);

  if (!post) {
    notFound();
  }

  return <NewsArticlePage post={post} />;
}
