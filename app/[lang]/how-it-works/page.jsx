import { HowItWorksPage } from "@/components/marketing/how-it-works-page";
import { getDictionary } from "@/lib/i18n";
import { routes } from "@/lib/site-links";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = getDictionary(lang, "how-it-works");

  return buildMetadata({
    lang,
    title: t.seo.title,
    description: t.seo.description,
    canonical: routes.how,
  });
}

export default async function Page({ params }) {
  const { lang } = await params;
  return <HowItWorksPage lang={lang} />;
}
