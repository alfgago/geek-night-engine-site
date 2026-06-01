import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MarketingAnimations } from "@/components/marketing/marketing-animations";

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

export const metadata = {
  title: "Geek Night Engine - AI-assisted Godot, in the browser",
  description:
    "The professional cloud workspace for AI-native game production.",
};

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
