import { CompanyPage } from "@/components/marketing/company-page";
import { getDictionary } from "@/lib/i18n";
import { routes } from "@/lib/site-links";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = getDictionary(lang, "about");

  return buildMetadata({
    lang,
    title: t.seo.title,
    description: t.seo.description,
    canonical: routes.about,
  });
}

export default async function Page({ params }) {
  const { lang } = await params;
  return <CompanyPage lang={lang} namespace="about" navCurrent="about" />;
}
