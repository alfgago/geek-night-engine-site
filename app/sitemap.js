import { newsPosts } from "@/data/news-posts";
import { routes } from "@/lib/site-links";
import { absoluteUrl } from "@/lib/seo";

const lastModified = new Date("2026-06-01");

const staticRoutes = [
  { path: routes.home, changeFrequency: "weekly", priority: 1 },
  { path: routes.product, changeFrequency: "monthly", priority: 0.9 },
  { path: routes.how, changeFrequency: "monthly", priority: 0.85 },
  { path: routes.pricing, changeFrequency: "monthly", priority: 0.8 },
  { path: routes.news, changeFrequency: "weekly", priority: 0.75 },
  { path: routes.contact, changeFrequency: "monthly", priority: 0.55 },
  { path: routes.privacy, changeFrequency: "yearly", priority: 0.25 },
  { path: routes.terms, changeFrequency: "yearly", priority: 0.25 },
];

export default function sitemap() {
  const staticEntries = staticRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const newsEntries = newsPosts.map((post) => ({
    url: absoluteUrl(`/news/${post.slug}`),
    lastModified: new Date(post.datetime),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...newsEntries];
}
