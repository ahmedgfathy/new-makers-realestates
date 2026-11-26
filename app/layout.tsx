import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_KEYWORDS } from "@/lib/seo";
import { getLocale } from "@/lib/i18n/server";
import { textDirection } from "@/lib/i18n/config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.makersegypt.com"),
  title: {
    default: "Makers Real Estates — Real Estate Consultants",
    template: "%s | Makers Real Estates",
  },
  description:
    "Makers Real Estates is your real estate consultant for the optimal decision, promising opportunities and a profitable investment across Egypt's top cities and compounds.",
  keywords: SITE_KEYWORDS,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={textDirection(locale)}>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
