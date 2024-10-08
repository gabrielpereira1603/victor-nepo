import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/app/components/header/header";
import Footer from "@/app/components/footer/footer";
import { FilterProvider } from "@/contexts/FilterContext";
import { BodyNightMode } from "@/app/components/BodyNightMode/BodyNightMode";

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

// Exportando metadata
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
        <FilterProvider>
            <div className="flex flex-col min-h-screen">
                <Header />
                <BodyNightMode>
                    {children}
                </BodyNightMode>
                <Footer />
            </div>
        </FilterProvider>
        </body>
        </html>
    );
}
