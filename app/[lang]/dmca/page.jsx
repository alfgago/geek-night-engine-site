import { LegalDocPage } from "@/components/marketing/legal-doc-page";
import { getDictionary } from "@/lib/i18n";
import { routes } from "@/lib/site-links";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = getDictionary(lang, "dmca");

  return buildMetadata({
    lang,
    title: t.seo.title,
    description: t.seo.description,
    canonical: routes.dmca,
  });
}

export default async function Page({ params }) {
  const { lang } = await params;
  return <LegalDocPage lang={lang} namespace="dmca" navCurrent="dmca" />;
}
