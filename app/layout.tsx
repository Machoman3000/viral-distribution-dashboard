import type { Metadata } from "next";
import { Chakra_Petch, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/contexts/AppContext";
import Header from "@/components/Header";

const chakraPetch = Chakra_Petch({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "MonadRefGraph | Developer Dashboard",
  description: "Configure referral payouts and integrate the Monad multi-level referral system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${chakraPetch.variable} ${spaceGrotesk.variable} ${spaceMono.variable} antialiased`}
      >
        <AppProvider>
          <div className="min-h-screen grid-pattern scanline">
            <Header />
            <main>{children}</main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
