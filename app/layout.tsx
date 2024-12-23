import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "@/providers/AuthProvider";
import "./globals.css";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Anginat",
    description: "Authenticate your product codes with ease",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <Script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-G1GL3H7LZL"
                ></Script>
                <Script id="google-analytics">
                    {`
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());

                      gtag('config', ' G-G1GL3H7LZL');
                   `}
                </Script>
            </head>
            <body className={inter.className}>
                <AuthProvider>{children}</AuthProvider>
                <SpeedInsights />
            </body>
        </html>
    );
}
