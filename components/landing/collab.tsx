"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Shield, MapPin, Users, Award } from "lucide-react";
import { useI18n } from "@/lib/i18n";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    const startTime = performance.now();
    function animate(now: number) {
      const progress = Math.min((now - startTime) / 2000, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(target);
    }
    requestAnimationFrame(animate);
  }, [isInView, target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export function Collab() {
  const { t } = useI18n();
  const stats = [
    { icon: Shield, label: t("collab.sqm"), value: 600, suffix: "m²" },
    { icon: Award, label: t("collab.sauna"), value: 1, suffix: "" },
    { icon: Users, label: t("collab.cowork"), value: 1, suffix: "" },
    { icon: MapPin, label: t("collab.since"), value: 2025, suffix: "" },
  ];

  return (
    <section id="collab" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src="/images/gym-interior.jpg" alt="American Iron gym" fill className="object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="text-xs tracking-[0.3em] uppercase text-neutral-500 font-body font-medium block mb-4">{t("collab.label")}</span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-[0.08em] uppercase mb-2">
            <span className="text-white">American</span>{" "}<span className="text-neutral-500">Iron</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-neutral-700" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-neutral-600 font-body">El Salvador</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-neutral-700" />
          </div>
        </motion.div>

        <motion.div className="max-w-2xl mx-auto text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
          <p className="text-neutral-400 font-body text-lg leading-relaxed">{t("collab.desc")}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} className="text-center p-6 border border-white/[0.04] bg-white/[0.01] group hover:border-white/10 transition-all duration-500"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <stat.icon className="w-5 h-5 text-neutral-600 mx-auto mb-3 group-hover:text-orange-500/50 transition-colors duration-500" />
              <div className="font-heading text-3xl md:text-4xl font-bold text-white mb-1">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs tracking-[0.2em] uppercase text-neutral-600 font-body">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div className="flex justify-center" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
          <div className="inline-flex items-center gap-4 border border-white/[0.06] bg-white/[0.02] px-8 py-4">
            <div className="flex items-center gap-3">
              <span className="font-heading text-lg font-bold tracking-[0.15em] uppercase text-orange-500">RLC</span>
              <span className="text-neutral-600">×</span>
              <span className="font-heading text-lg font-bold tracking-[0.15em] uppercase text-white">AI</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <span className="text-xs tracking-[0.2em] uppercase text-neutral-500 font-body">{t("collab.partnership")}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
