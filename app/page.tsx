import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Marquee } from "@/components/landing/marquee";
import { Products } from "@/components/landing/products";
import { ComingSoon } from "@/components/landing/coming-soon";
import { Manifesto } from "@/components/landing/manifesto";
import { Lifestyle } from "@/components/landing/lifestyle";
import { Collab } from "@/components/landing/collab";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />
      <Hero />
      <Marquee />
      <Products />
      <ComingSoon />
      <Manifesto />
      <Lifestyle />
      <Collab />
      <CTA />
      <Footer />
    </main>
  );
}
