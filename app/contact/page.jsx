import { ContactPage } from "@/components/marketing/contact-page";
import { routes } from "@/lib/site-links";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact Geek Night Engine for support, studio inquiries, feature feedback, launch updates, and early access questions.",
  canonical: routes.contact,
});

export default function Page() {
  return <ContactPage />;
}
