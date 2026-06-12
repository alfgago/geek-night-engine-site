import { CompanyPage } from "@/components/marketing/company-page";
import { getDictionary } from "@/lib/i18n";
import { routes } from "@/lib/site-links";
import { buildMetadata } from "@/lib/seo";
import { contacts } from "@/data/marketing-data";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = getDictionary(lang, "careers");

  return buildMetadata({
    lang,
    title: t.seo.title,
    description: t.seo.description,
    canonical: routes.careers,
  });
}

export default async function Page({ params }) {
  const { lang } = await params;
  return <CompanyPage lang={lang} namespace="careers" navCurrent="careers" contactEmail={contacts.support} />;
}
