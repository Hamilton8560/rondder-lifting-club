"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { socials } from "@/lib/socials";

export function CTA() {
  const { t } = useI18n();

  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src="/images/cta-bg.jpg" alt="" fill className="object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-orange-600/10 via-transparent to-transparent blur-3xl pointer-events-none z-[1]" />

      <motion.div className="relative z-10 text-center max-w-3xl mx-auto px-6" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}>
        <span className="text-xs tracking-[0.4em] uppercase text-orange-500/60 font-body font-medium block mb-8">{t("cta.label")}</span>
        <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight uppercase leading-[0.95] mb-8">
          {t("cta.title1")}<br /><span className="text-orange-500">{t("cta.title2")}</span>
        </h2>
        <p className="text-neutral-500 font-body text-lg max-w-md mx-auto mb-12 leading-relaxed">{t("cta.desc")}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a
            href={socials.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-orange-500 hover:bg-orange-600 text-black font-heading font-bold text-base tracking-[0.15em] uppercase px-12 py-5 transition-all duration-300 inline-flex items-center justify-center gap-3 animate-pulse-glow"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle className="w-5 h-5" />
            {t("contact.whatsapp")}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
          <a
            href={socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/10 hover:border-white/20 text-neutral-400 hover:text-white font-heading font-medium text-base tracking-[0.15em] uppercase px-12 py-5 transition-all duration-300 inline-flex items-center justify-center"
          >
            {t("cta.follow")}
          </a>
        </div>

        <p className="mt-10 text-xs text-neutral-700 font-body tracking-wider">{t("cta.shipping")}</p>
      </motion.div>
    </section>
  );
}
