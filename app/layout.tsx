import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./providers";
import ErrorBoundary from "@/components/error-boundary";
import { ModalInitializer } from "./modal-initializer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bauhaus Signet",
  description: "Mint your own unique Bauhaus Signet NFT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <body className={inter.className}>
        <ErrorBoundary>
          <Providers>
            <ModalInitializer />
            {children}
            <div id="wallet-dialog-container"></div>
          </Providers>
        </ErrorBoundary>
        <Toaster />
      </body>
    </html>
  );
}
