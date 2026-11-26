import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getLocale } from "@/lib/i18n/server";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <>
      <SiteHeader locale={locale} />
      <main>{children}</main>
      <SiteFooter locale={locale} />
    </>
  );
}
