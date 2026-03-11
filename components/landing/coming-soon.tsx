"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Zap, Coffee, Flame, Bell, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";

function useCountdown(targetDate: Date) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) { setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);
  return time;
}

function CountdownBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 sm:w-20 sm:h-20 border border-orange-500/20 bg-orange-500/[0.03] flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            className="font-heading text-2xl sm:text-3xl font-bold text-white"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[9px] tracking-[0.3em] uppercase text-neutral-600 font-body mt-2 block">
        {label}
      </span>
    </div>
  );
}

export function ComingSoon() {
  const { t } = useI18n();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const launchDate = useRef(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
  const countdown = useCountdown(launchDate.current);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(""); }
  };

  return (
    <section ref={sectionRef} className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-radial from-orange-600/8 via-red-900/3 to-transparent blur-3xl" />
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div className="text-center mb-6" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 border border-red-500/30 bg-red-500/5 px-5 py-2 mb-6">
            <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span className="text-xs tracking-[0.3em] uppercase text-red-400 font-body font-medium">
              {t("soon.badge")}
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
            animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] as const }}
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                className="w-[350px] h-[350px] rounded-full bg-gradient-radial from-orange-500/15 via-orange-600/5 to-transparent blur-3xl"
                animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <div className="relative w-full max-w-[500px] aspect-[4/3] group">
              <Image src="/images/skull-brew.jpg" alt="Skull Brew Pre-Workout Coffee" fill className="object-contain drop-shadow-[0_0_40px_rgba(249,115,22,0.15)] transition-transform duration-700 group-hover:scale-[1.03]" />
              {[
                { left: "25%", top: "15%", yEnd: -45, xEnd: 8, dur: 2.5, del: 0 },
                { left: "68%", top: "50%", yEnd: -55, xEnd: -6, dur: 3.2, del: 0.8 },
                { left: "55%", top: "20%", yEnd: -35, xEnd: 10, dur: 2.8, del: 1.5 },
                { left: "40%", top: "80%", yEnd: -60, xEnd: -4, dur: 3.5, del: 2.2 },
                { left: "72%", top: "35%", yEnd: -50, xEnd: 7, dur: 2.2, del: 0.5 },
                { left: "30%", top: "65%", yEnd: -40, xEnd: -9, dur: 3.0, del: 1.8 },
              ].map((p, i) => (
                <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-orange-500" style={{ left: p.left, top: p.top }}
                  animate={{ y: [0, p.yEnd], x: [0, p.xEnd], opacity: [0, 0.8, 0], scale: [0, 1, 0] }}
                  transition={{ duration: p.dur, repeat: Infinity, delay: p.del, ease: "easeOut" }}
                />
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }}>
            <span className="text-xs tracking-[0.4em] uppercase text-neutral-600 font-body block mb-3">{t("soon.collab")}</span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase leading-[1] mb-2">
              Skull <span className="text-orange-500">Brew</span>
            </h2>
            <p className="font-heading text-lg md:text-xl tracking-[0.1em] uppercase text-neutral-500 mb-6">{t("soon.subtitle")}</p>
            <p className="text-neutral-400 font-body text-base leading-relaxed mb-8 max-w-md">{t("soon.desc")}</p>

            <div className="flex flex-wrap gap-2 mb-10">
              <div className="flex items-center gap-2 border border-white/[0.06] bg-white/[0.02] px-4 py-2 text-xs tracking-wider uppercase text-neutral-400 font-body">
                <Zap className="w-3.5 h-3.5 text-orange-500" />{t("soon.caffeine")}
              </div>
              <div className="flex items-center gap-2 border border-white/[0.06] bg-white/[0.02] px-4 py-2 text-xs tracking-wider uppercase text-neutral-400 font-body">
                <Coffee className="w-3.5 h-3.5 text-orange-500" />{t("soon.realcoffee")}
              </div>
              <div className="flex items-center gap-2 border border-white/[0.06] bg-white/[0.02] px-4 py-2 text-xs tracking-wider uppercase text-neutral-400 font-body">
                <Flame className="w-3.5 h-3.5 text-orange-500" />{t("soon.zerosugar")}
              </div>
            </div>

            <div className="mb-10">
              <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-600 font-body block mb-4">{t("soon.dropsin")}</span>
              <div className="flex gap-3">
                <CountdownBlock value={countdown.days} label={t("soon.days")} />
                <div className="flex items-center text-neutral-700 font-heading text-xl">:</div>
                <CountdownBlock value={countdown.hours} label={t("soon.hours")} />
                <div className="flex items-center text-neutral-700 font-heading text-xl">:</div>
                <CountdownBlock value={countdown.minutes} label={t("soon.min")} />
                <div className="flex items-center text-neutral-700 font-heading text-xl">:</div>
                <CountdownBlock value={countdown.seconds} label={t("soon.sec")} />
              </div>
            </div>

            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-600 font-body block mb-3">{t("soon.notify.label")}</span>
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form key="form" onSubmit={handleSubmit} className="flex gap-2" initial={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }}>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required
                      className="flex-1 bg-white/[0.03] border border-white/[0.08] px-4 py-3 text-sm text-white font-body placeholder:text-neutral-600 focus:outline-none focus:border-orange-500/40 transition-colors" />
                    <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-black font-heading font-bold text-sm tracking-[0.1em] uppercase px-6 py-3 transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.2)] flex items-center gap-2">
                      <Bell className="w-4 h-4" />{t("soon.notify.btn")}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div key="success" className="flex items-center gap-3 border border-emerald-500/20 bg-emerald-500/5 px-5 py-3"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm text-emerald-300 font-body">{t("soon.notify.success")}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
