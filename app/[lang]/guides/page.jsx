import { GuidesPage } from "@/components/marketing/guides-page";
import { getDictionary } from "@/lib/i18n";
import { routes } from "@/lib/site-links";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = getDictionary(lang, "guides");

  return buildMetadata({
    lang,
    title: t.seo.title,
    description: t.seo.description,
    canonical: routes.guides,
  });
}

export default async function Page({ params }) {
  const { lang } = await params;
  return <GuidesPage lang={lang} />;
}
