"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const lifestyleImages = [
  { src: "/images/coffee-iron.jpg", alt: "Coffee and iron aesthetic" },
  { src: "/images/shirt-caffeine-calamity.jpg", alt: "Caffeine & Calamity tee" },
  { src: "/images/skull-fire.jpg", alt: "Skull fire artwork" },
  { src: "/images/gym-interior.jpg", alt: "American Iron gym" },
  { src: "/images/shirt-caffeinated-afterlife.jpg", alt: "Caffeinated in the Afterlife tee" },
  { src: "/images/shirt-anti-rondder-red.jpg", alt: "Anti Rondder Club tee" },
];

export function Lifestyle() {
  const doubled = [...lifestyleImages, ...lifestyleImages];

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Section label */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <span className="text-[10px] tracking-[0.4em] uppercase text-neutral-600 font-body">
          @RONDDER
        </span>
      </motion.div>

      {/* Scrolling image strip */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />

        <div className="flex animate-marquee gap-4">
          {doubled.map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[280px] h-[350px] relative overflow-hidden group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />
              {/* Corner accents on hover */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-orange-500/0 group-hover:border-orange-500/50 transition-all duration-500" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-orange-500/0 group-hover:border-orange-500/50 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
