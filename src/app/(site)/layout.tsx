import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Chrome du site public : header + contenu + footer.
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
