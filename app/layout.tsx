import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./providers";
import ErrorBoundary from "@/components/error-boundary";

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
        <style dangerouslySetInnerHTML={{ __html: `
          @font-face {
            font-family: 'century-gothic';
            src: url('https://use.typekit.net/af/021f74/00000000000000003b9aee44/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3') format('woff2'),
                 url('https://use.typekit.net/af/021f74/00000000000000003b9aee44/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3') format('woff');
            font-weight: 700;
            font-style: normal;
          }
          @font-face {
            font-family: 'century-gothic';
            src: url('https://use.typekit.net/af/5dd5cb/00000000000000003b9aee45/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3') format('woff2'),
                 url('https://use.typekit.net/af/5dd5cb/00000000000000003b9aee45/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3') format('woff');
            font-weight: 400;
            font-style: normal;
          }
        ` }} />
      </head>
      <body>
        <ErrorBoundary>
          <Providers>
            {children}
          </Providers>
        </ErrorBoundary>
        <Toaster />
      </body>
    </html>
  );
}
