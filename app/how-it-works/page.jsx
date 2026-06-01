import { HowItWorksPage } from "@/components/marketing/how-it-works-page";
import { routes } from "@/lib/site-links";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "How it works",
  description:
    "See how Geek Night Engine turns game ideas into structured AI tickets, safe Godot mutations, cloud builds, snapshots, and browser playtests.",
  canonical: routes.how,
});

export default function Page() {
  return <HowItWorksPage />;
}
