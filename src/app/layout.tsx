import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProviders } from "@/components/global-cmps/theme-providers";
import Header from "@/components/global-cmps/header";
import { GoogleAnalytics } from '@next/third-parties/google'

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
  title: "AI Image to Code Transformer",
  description: "AI Powered UI to Code Convertor that helps you build beautiful, accessible, and performant user interfaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} overflow-hidden flex flex-col  dark:text-white antialiased bg-white h-screen text-black  dark:bg-[#020617]`}
      >
        <ThemeProviders>
          <Header/>
          <main className="max-w-7xl mx-auto flex-grow [&::-webkit-scrollbar]:hidden overflow-auto overflow-x-hidden w-full px-3 md:px-2 ">
            {children}
          </main>
        </ThemeProviders>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID as string} />
      </body>
    </html>
  );
}
