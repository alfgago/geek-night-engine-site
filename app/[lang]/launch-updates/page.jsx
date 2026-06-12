import { LaunchUpdatesPage } from "@/components/marketing/launch-updates-page";
import { getDictionary } from "@/lib/i18n";
import { routes } from "@/lib/site-links";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = getDictionary(lang, "launch-updates");

  return buildMetadata({
    lang,
    title: t.seo.title,
    description: t.seo.description,
    canonical: routes.launchUpdates,
  });
}

export default async function Page({ params }) {
  const { lang } = await params;
  return <LaunchUpdatesPage lang={lang} />;
}
