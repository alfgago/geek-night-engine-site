import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MarketingAnimations } from "@/components/marketing/marketing-animations";
import { buildMetadata, siteConfig } from "@/lib/seo";

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

export const metadata = buildMetadata({
  title: {
    default: siteConfig.defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  canonical: "/",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="gne">
        <MarketingAnimations />
        {children}
      </body>
    </html>
  );
}
