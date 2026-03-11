"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Coffee, Dumbbell, Skull, Flame } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Manifesto() {
  const { t } = useI18n();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const values = [
    { icon: Coffee, title: t("culture.caffeine.title"), text: t("culture.caffeine.desc") },
    { icon: Dumbbell, title: t("culture.iron.title"), text: t("culture.iron.desc") },
    { icon: Skull, title: t("culture.calamity.title"), text: t("culture.calamity.desc") },
    { icon: Flame, title: t("culture.community.title"), text: t("culture.community.desc") },
  ];

  return (
    <section id="culture" className="relative py-24 md:py-40 overflow-hidden" ref={sectionRef}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            className="relative aspect-[4/5] lg:aspect-auto lg:h-[700px] overflow-hidden group"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
          >
            <motion.div className="absolute inset-0" style={{ y: imageY }}>
              <Image src="/images/skull-fire.jpg" alt="Rondder skull artwork" fill className="object-cover scale-110" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 z-10">
              <div className="border border-orange-500/30 bg-black/60 backdrop-blur-sm px-4 py-2">
                <span className="font-heading text-xs tracking-[0.3em] uppercase text-orange-400">
                  {t("culture.badge")}
                </span>
              </div>
            </div>
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/40" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-500/40" />
          </motion.div>

          <div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="text-xs tracking-[0.3em] uppercase text-orange-500 font-body font-medium block mb-6">
                {t("culture.label")}
              </span>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase leading-[1.05] mb-8">
                {t("culture.title1")}{" "}
                <span className="text-orange-500">{t("culture.rest")}</span>
                <br />
                {t("culture.title2")}{" "}
                <span className="line-through text-neutral-600 decoration-orange-500/50">
                  {t("culture.decaf")}
                </span>
              </h2>
              <p className="text-neutral-400 font-body text-lg leading-relaxed mb-12 max-w-lg">
                {t("culture.desc")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  className="group border border-white/[0.06] bg-white/[0.02] p-5 hover:border-orange-500/20 hover:bg-orange-500/[0.03] transition-all duration-500"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <value.icon className="w-6 h-6 text-orange-500 mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-heading text-sm font-bold tracking-[0.2em] uppercase text-white mb-2">{value.title}</h3>
                  <p className="text-xs text-neutral-500 font-body leading-relaxed">{value.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
