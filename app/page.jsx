import { HomePage } from "@/components/marketing/home-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI-assisted Godot, in the browser",
  description:
    "Build, compile, playtest, and publish Godot games from a browser-native AI production workspace.",
  canonical: "/",
});

export default function Page() {
  return <HomePage />;
}
