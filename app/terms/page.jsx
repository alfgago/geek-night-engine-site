import { TermsPage } from "@/components/marketing/legal-page";
import { routes } from "@/lib/site-links";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms & Conditions",
  description:
    "Read the terms for using Geek Night Engine's marketing site, AI-assisted game production tools, cloud builds, playtests, and billing systems.",
  canonical: routes.terms,
});

export default function Page() {
  return <TermsPage />;
}
