import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/global/Footer";
import BurgerMenu from "./components/ui/BurgerMenu";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShareYourSpace 2.0",
  description: "The Airbnb for the Modern Workforce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <BurgerMenu />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
