import { NewsPage } from "@/components/marketing/news-page";
import { routes } from "@/lib/site-links";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "News",
  description: "Launch updates, product notes, and build-in-public dispatches from Geek Night Engine.",
  canonical: routes.news,
});

export default function Page() {
  return <NewsPage />;
}
