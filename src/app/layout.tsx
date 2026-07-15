import type { Metadata } from "next";
import { site } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  title: site.name,
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={site.locale} className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-navy text-white font-sans">
        {children}
      </body>
    </html>
  );
}
