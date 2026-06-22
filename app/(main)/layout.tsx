import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import { QualificationModalProvider } from "@/components/QualificationModal";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-obsidian-900 text-white">
      <ThemeProvider>
        <QualificationModalProvider>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </QualificationModalProvider>
      </ThemeProvider>
    </div>
  );
}
