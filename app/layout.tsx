import type { Metadata } from "next";
import { Oswald, Raleway } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "RONDDER — Cafeína & Calamidad | Lifting Club Apparel",
  description:
    "Donde la cafeína se encuentra con la calamidad. Ropa premium de lifting club forjada en American Iron. Únete al Rondder Lifting Club.",
  openGraph: {
    title: "RONDDER — Cafeína & Calamidad",
    description: "Ropa premium de lifting club. Impulsada por café. Forjada en hierro.",
    images: ["/images/hero-bg.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${oswald.variable} ${raleway.variable} antialiased bg-black text-white`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
