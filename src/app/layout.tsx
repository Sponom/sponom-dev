import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "sponom.dev | Apps that simplify your everyday life",
  description: "Browser extensions and web apps designed for real people. Built by Sergei Ponomarev.",
  keywords: ["apps", "browser extensions", "web apps", "sponom", "Sergei Ponomarev"],
  authors: [{ name: "Sergei Ponomarev" }],
  creator: "Sergei Ponomarev",
  metadataBase: new URL("https://sponom.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sponom.dev",
    siteName: "sponom.dev",
    title: "sponom.dev | Apps that simplify your everyday life",
    description: "Browser extensions and web apps designed for real people. Built by Sergei Ponomarev.",
  },
  twitter: {
    card: "summary_large_image",
    title: "sponom.dev | Apps that simplify your everyday life",
    description: "Browser extensions and web apps designed for real people. Built by Sergei Ponomarev.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
