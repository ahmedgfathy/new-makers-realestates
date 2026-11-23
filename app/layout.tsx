import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Makers Real Estates — Real Estate Consultants",
    template: "%s | Makers Real Estates",
  },
  description:
    "Makers Real Estates is your real estate consultant for the optimal decision, promising opportunities and a profitable investment across Egypt's top cities and compounds.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
