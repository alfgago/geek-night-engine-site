import { HomePage } from "@/components/marketing/home-page";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = getDictionary(lang, "home");

  return buildMetadata({
    lang,
    title: t.seo.title,
    description: t.seo.description,
    canonical: "/",
  });
}

export default async function Page({ params }) {
  const { lang } = await params;
  return <HomePage lang={lang} />;
}
