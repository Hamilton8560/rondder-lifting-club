"use client";

import { useI18n } from "@/lib/i18n";

export function Marquee() {
  const { t } = useI18n();

  const words = [
    "CAFFEINE", "×", "CALAMITY", "×", "IRON", "×", "RONDDER", "×",
    "LIFTING CLUB", "×", t("marquee.norestdays"), "×", t("marquee.nodecaf"), "×",
    "AMERICAN IRON", "×", t("marquee.skullandfire"), "×", "RLC", "×",
  ];
  const doubled = [...words, ...words];

  return (
    <div className="relative py-6 overflow-hidden border-y border-white/[0.04] bg-neutral-950/50">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((word, i) => (
          <span key={i} className={`mx-4 font-heading text-sm tracking-[0.3em] uppercase ${
            word === "×" ? "text-orange-500/60" : i % 4 === 0 ? "text-neutral-400" : "text-neutral-600"
          }`}>
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
