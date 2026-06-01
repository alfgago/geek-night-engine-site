import { PricingPage } from "@/components/marketing/pricing-page";
import { routes } from "@/lib/site-links";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pricing",
  description:
    "Review Geek Night Engine pricing for solo creators and studios, including credits, collaboration seats, storage, and production add-ons.",
  canonical: routes.pricing,
});

export default function Page() {
  return <PricingPage />;
}
