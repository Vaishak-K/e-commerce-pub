"use client";

import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";

import { Providers } from "./providers";
import { SessionProvider } from "next-auth/react";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";

import { CartValues } from "./products/_state/CartValues";
import SessionWrapper from "@/components/SessionWrapper";

import { AdminNavbar } from "@/components/adminnavbar";
import NavBarComb from "@/components/NavBarComb";
// import { AppProps } from "next/app";

// export const metadata: Metadata = {
//   title: {
//     default: siteConfig.name,
//     template: `%s - ${siteConfig.name}`,
//   },
//   description: siteConfig.description,
//   icons: {
//     icon: "/favicon.ico",
//   },
// };

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
  // pageProps,
}: {
  children: React.ReactNode;
  // pageProps: AppProps;
}) {
  return (
    <SessionWrapper>
      <html suppressHydrationWarning lang="en">
        <head />
        <body
          className={clsx(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <CartValues>
              <div className="relative flex flex-col h-screen">
                <NavBarComb />
                <main className="container mx-auto max-w-7xl pt-16 flex-grow">
                  {children}
                </main>
              </div>
            </CartValues>
          </Providers>
        </body>
      </html>
    </SessionWrapper>
  );
}
