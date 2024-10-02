import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/app/components/header/header";
import Footer from "@/app/components/footer/footer";
import { FilterProvider } from "@/contexts/FilterContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Victor Hugo Nepomuceno",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="pt">
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
              <FilterProvider> {/* Envolva o children com o FilterProvider */}
                <Header />
                {children}
                <Footer />
              </FilterProvider>
          </body>
      </html>
  );
}
