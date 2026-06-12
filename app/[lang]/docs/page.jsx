import { DocsPage } from "@/components/marketing/docs-page";
import { getDictionary } from "@/lib/i18n";
import { routes } from "@/lib/site-links";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = getDictionary(lang, "docs");

  return buildMetadata({
    lang,
    title: t.seo.title,
    description: t.seo.description,
    canonical: routes.docs,
  });
}

export default async function Page({ params }) {
  const { lang } = await params;
  return <DocsPage lang={lang} />;
}
