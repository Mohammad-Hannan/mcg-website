import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import { QualificationModalProvider } from "@/components/QualificationModal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Market Capital Group | Bitcoin Risk Management Advisory",
  description:
    "A non-custodial Bitcoin risk management firm helping serious long-term investors manage volatility, reduce drawdowns, and build generational wealth through disciplined strategic positioning.",
  keywords:
    "Bitcoin risk management, Bitcoin wealth management, Bitcoin portfolio management, non-custodial Bitcoin advisory, Bitcoin drawdown protection, Bitcoin market cycle strategy",
  openGraph: {
    title: "Market Capital Group | Bitcoin Risk Management Advisory",
    description:
      "Boutique institutional Bitcoin risk management for serious long-term investors.",
    siteName: "Market Capital Group",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-obsidian-900 text-white antialiased overflow-x-hidden">
        <ThemeProvider>
          <QualificationModalProvider>
            <Navigation />
            <main>{children}</main>
            <Footer />
          </QualificationModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
