import { ProductSubpage } from "@/components/marketing/product-subpage";
import { getDictionary } from "@/lib/i18n";
import { routes } from "@/lib/site-links";
import { buildMetadata } from "@/lib/seo";

const NAMESPACE = "product-architect";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = getDictionary(lang, NAMESPACE);

  return buildMetadata({
    lang,
    title: t.seo.title,
    description: t.seo.description,
    canonical: routes.productArchitect,
  });
}

export default async function Page({ params }) {
  const { lang } = await params;
  return <ProductSubpage lang={lang} namespace={NAMESPACE} previewKind="ai" />;
}
