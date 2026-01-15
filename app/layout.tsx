import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import styles from "./styles.json";
import { StylesProvider } from "@/components/StylesContext";
import { StyleTweaker } from "@/components/StyleTweaker";
import { GlobalStyler } from "@/components/GlobalStyler";
import { BackgroundLayer } from "@/components/BackgroundLayer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Variant.ai Reconstruction",
  description: "A high-fidelity reconstruction of Variant.ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <StylesProvider initialStyles={styles}>
          <StyleTweaker />
          <GlobalStyler />
          <BackgroundLayer />
          {children}
        </StylesProvider>
      </body>
    </html>
  );
}
