import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { GeistSans } from "geist/font/sans";
import { DEFAULT_URL } from "./constants";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(DEFAULT_URL),
  title: "EduBill",
  description: "A billing system for a subscription-based online education platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
