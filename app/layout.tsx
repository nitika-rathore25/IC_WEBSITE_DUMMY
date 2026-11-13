import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { buildMetadata, SITE_DESCRIPTION } from "@/lib/seo/metadata";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

// Neue Montreal — the font in the new Figma design (Regular / Medium / Bold).
const neueMontreal = localFont({
  src: [
    {
      path: "../public/fonts/NeueMontreal-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/NeueMontreal-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/NeueMontreal-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-neue",
  display: "swap",
});

// Search Console HTML-tag verification codes (comma-separate several, one
// per owner) from NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION. Optional — owners
// can also verify through Google Analytics instead.
const googleVerification = (
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || ""
)
  .split(",")
  .map((code) => code.trim())
  .filter(Boolean);

export const metadata: Metadata = {
  ...buildMetadata({
    title: "AI Market Research Platforms & AI Services",
    description: SITE_DESCRIPTION,
  }),
  // Home tab title in full, so the brand isn't repeated by the " | Insights Curry" suffix.
  title: { absolute: "AI Market Research Platforms & AI Services | Insights Curry" },
  ...(googleVerification.length && {
    verification: { google: googleVerification },
  }),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={neueMontreal.variable}>
      <head>
        <GoogleAnalytics />
      </head>
      <body className="flex min-h-screen flex-col bg-white">
        <Header />
        <main className="mobile-center flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
