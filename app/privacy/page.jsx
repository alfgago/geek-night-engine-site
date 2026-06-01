import { PrivacyPage } from "@/components/marketing/legal-page";
import { routes } from "@/lib/site-links";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Read how Geek Night Engine handles account data, project content, AI workflows, telemetry, support requests, and billing information.",
  canonical: routes.privacy,
});

export default function Page() {
  return <PrivacyPage />;
}
