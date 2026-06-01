import { ProductPage } from "@/components/marketing/product-page";
import { routes } from "@/lib/site-links";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Product",
  description:
    "Explore Geek Night Engine's AI Game Architect, Godot scene inspector, asset labs, cloud compiler, playtesting, and telemetry modules.",
  canonical: routes.product,
});

export default function Page() {
  return <ProductPage />;
}
