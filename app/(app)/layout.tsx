import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import styles from "../styles.json";
import { StylesProvider } from "@/components/context/StylesContext";
import { StyleTweaker } from "@/components/style/StyleTweaker";
import { GlobalStyler } from "@/components/style/GlobalStyler";
import { BackgroundLayer } from "@/components/ui/BackgroundLayer";
import { Guides } from "@/components/ui/Guides";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Portfolio Reconstruction",
  description: "A high-fidelity reconstruction of Portfolio",
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
          <Guides />
          {children}
        </StylesProvider>
      </body>
    </html>
  );
}
