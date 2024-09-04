import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Bauhaus Signet - Schlemmer",
  description: " The Bauhaus Signet NFT, originally created in 1923 by Oskar Schlemmer, is an authorized collaboration with The Oskar Schlemmer Theatre Archives that brings a seminal work of 20th-century design into the blockchain era. The iconic Bauhaus signet will persist on Ethereum forever, as fully onchain generative SVG renditions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/ujq2bhe.css" />
      </head>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
