import "./globals.css";
import SiteHeader from "@/components/SiteHeader";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>
        <SiteHeader />
        <main className="pt-24">{children}</main>
      </body>
    </html>
  );
}
