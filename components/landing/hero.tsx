"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";

// ===== SCRAMBLE TEXT HOOK =====
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

function useScrambleReveal(text: string, trigger: boolean, duration = 1400) {
  const [display, setDisplay] = useState("");
  const [done, setDone] = useState(false);

  // When language changes after animation finished, update immediately
  useEffect(() => {
    if (done) setDisplay(text);
  }, [text, done]);

  // Run scramble animation when triggered
  useEffect(() => {
    if (!trigger) return;

    let cancelled = false;
    const startTime = performance.now();

    function animate() {
      if (cancelled) return;
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const revealedCount = Math.floor(progress * text.length);
      let result = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") result += " ";
        else if (i < revealedCount) result += text[i];
        else result += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setDisplay(result);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplay(text);
        setDone(true);
      }
    }

    requestAnimationFrame(animate);
    return () => { cancelled = true; };
  }, [trigger, text, duration]);

  return display;
}

// ===== EMBER PARTICLE CANVAS =====
function EmberCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    let animId: number;
    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    window.addEventListener("mousemove", handleMouse);

    const PARTICLE_COUNT = 60;
    const colors = [
      "rgba(249, 115, 22,",
      "rgba(234, 88, 12,",
      "rgba(251, 146, 60,",
      "rgba(253, 186, 116,",
      "rgba(220, 38, 38,",
    ];

    interface Ember {
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; life: number; maxLife: number; color: string;
    }

    const createEmber = (): Ember => ({
      x: Math.random() * w,
      y: h + Math.random() * 50,
      vx: (Math.random() - 0.5) * 0.8,
      vy: -(Math.random() * 1.5 + 0.5),
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      life: 0,
      maxLife: Math.random() * 400 + 200,
      color: colors[Math.floor(Math.random() * colors.length)],
    });

    const embers: Ember[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const e = createEmber();
      e.y = Math.random() * h;
      e.life = Math.random() * e.maxLife;
      embers.push(e);
    }

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      embers.forEach((ember, i) => {
        ember.life++;
        if (ember.life > ember.maxLife) { embers[i] = createEmber(); return; }
        if (mouseRef.current.active) {
          const dx = ember.x - mouseRef.current.x;
          const dy = ember.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) { ember.vx += (dx / dist) * 0.15; ember.vy += (dy / dist) * 0.15; }
        }
        ember.vx += (Math.random() - 0.5) * 0.05;
        ember.vx *= 0.99;
        ember.vy *= 0.998;
        ember.x += ember.vx;
        ember.y += ember.vy;
        const lr = ember.life / ember.maxLife;
        const alpha = lr < 0.1 ? lr * 10 * ember.opacity : lr > 0.7 ? (1 - (lr - 0.7) / 0.3) * ember.opacity : ember.opacity;
        const g = ctx.createRadialGradient(ember.x, ember.y, 0, ember.x, ember.y, ember.size * 4);
        g.addColorStop(0, `${ember.color}${alpha})`);
        g.addColorStop(0.4, `${ember.color}${alpha * 0.4})`);
        g.addColorStop(1, `${ember.color}0)`);
        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `${ember.color}${Math.min(alpha * 1.5, 1)})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[2]" />;
}

// ===== HERO SECTION =====
export function Hero() {
  const { t } = useI18n();
  const [loaded, setLoaded] = useState(false);
  const headlineText = t("hero.headline");
  const headline = useScrambleReveal(headlineText, loaded, 1600);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src="/images/hero-bg.jpg" alt="" fill className="object-cover opacity-40" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80" />
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-orange-600/20 via-orange-900/5 to-transparent blur-3xl pointer-events-none z-[1]" />
      <EmberCanvas />
      <div className="absolute inset-0 grain-overlay pointer-events-none z-[3]" />

      <motion.div className="relative z-10 text-center max-w-5xl mx-auto px-6" variants={container} initial="hidden" animate="show">
        <motion.div variants={item} className="flex justify-center mb-8">
          <div className="border border-orange-500/30 bg-orange-500/5 px-5 py-2 inline-flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-xs tracking-[0.3em] uppercase text-orange-400 font-body font-medium">
              {t("hero.badge")}
            </span>
          </div>
        </motion.div>

        <motion.h1 variants={item} className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-[0.05em] uppercase leading-[0.95] mb-6">
          {headline.split("").map((char, i) => (
            <span key={`${i}-${char}`} className={i < headlineText.length && headline[i] === headlineText[i] ? "text-white" : "text-orange-500/70"}>
              {char}
            </span>
          ))}
        </motion.h1>

        <motion.p variants={item} className="text-lg md:text-xl text-neutral-400 max-w-xl mx-auto mb-10 font-body leading-relaxed">
          {t("hero.sub1")}
          <br />
          <span className="text-neutral-500">{t("hero.sub2")}</span>
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#collection" className="group relative bg-orange-500 hover:bg-orange-600 text-black font-heading font-bold text-base tracking-[0.15em] uppercase px-10 py-4 transition-all duration-300 hover:shadow-[0_0_40px_rgba(249,115,22,0.3)] inline-flex items-center justify-center gap-2">
            {t("hero.cta1")}
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <a href="#culture" className="border border-white/15 hover:border-orange-500/40 text-white font-heading font-medium text-base tracking-[0.15em] uppercase px-10 py-4 transition-all duration-300 hover:bg-white/5 inline-flex items-center justify-center">
            {t("hero.cta2")}
          </a>
        </motion.div>

        <motion.div className="mt-16" variants={item}>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown className="w-6 h-6 text-neutral-600 mx-auto" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
