import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { MarketingAnimations } from "@/components/marketing/marketing-animations";
import { buildMetadata } from "@/lib/seo";
import { getDictionary, locales } from "@/lib/i18n";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = getDictionary(lang, "common");

  return buildMetadata({
    lang,
    title: {
      default: t.seo.defaultTitle,
      template: `%s | ${t.brand.name}`,
    },
    description: t.seo.description,
    canonical: "/",
  });
}

export default async function RootLayout({ children, params }) {
  const { lang } = await params;

  return (
    <html lang={lang} className={`${geist.variable} ${geistMono.variable}`}>
      <body className="gne">
        <MarketingAnimations />
        <div className="site-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
