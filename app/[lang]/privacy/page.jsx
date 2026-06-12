import { PrivacyPage } from "@/components/marketing/legal-page";
import { getDictionary } from "@/lib/i18n";
import { routes } from "@/lib/site-links";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = getDictionary(lang, "legal");

  return buildMetadata({
    lang,
    title: t.privacy.seo.title,
    description: t.privacy.seo.description,
    canonical: routes.privacy,
  });
}

export default async function Page({ params }) {
  const { lang } = await params;
  return <PrivacyPage lang={lang} />;
}
