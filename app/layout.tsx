import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "./context/AuthProvider";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
            <body className={inter.className}>
                <AuthProvider>
                    <main className="h-screen flex flex-col justify-center items-center">
                        <Navbar />
                        {children}
                    </main>
                </AuthProvider>
            </body>
        </html>
    );
}
