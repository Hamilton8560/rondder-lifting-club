"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { socials } from "@/lib/socials";

export function Navbar() {
  const { locale, setLocale, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: t("nav.collection"), href: "#collection" },
    { label: t("nav.culture"), href: "#culture" },
    { label: t("nav.gym"), href: "#collab" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/90 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <span className="font-heading text-2xl font-bold tracking-[0.2em] uppercase text-white group-hover:text-orange-500 transition-colors duration-300">
              RONDDER
            </span>
            <span className="hidden sm:block text-[10px] tracking-[0.3em] uppercase text-neutral-500 font-body">
              Lifting Club
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm tracking-[0.15em] uppercase text-neutral-400 hover:text-orange-500 transition-colors duration-300 font-body font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <button
              onClick={() => setLocale(locale === "es" ? "en" : "es")}
              className="text-[11px] tracking-[0.2em] uppercase font-heading font-semibold border border-white/10 px-3 py-1.5 text-neutral-400 hover:text-orange-500 hover:border-orange-500/30 transition-all duration-300"
            >
              {locale === "es" ? "EN" : "ES"}
            </button>

            {/* WhatsApp CTA */}
            <a
              href={socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-black font-heading font-semibold text-sm tracking-wider uppercase px-5 py-2.5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]"
            >
              <MessageCircle className="w-4 h-4" />
              {t("contact.message")}
            </a>

            <button
              className="md:hidden text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/98 flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="font-heading text-4xl font-bold tracking-[0.2em] uppercase text-white hover:text-orange-500 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href={socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 bg-orange-500 text-black font-heading font-bold text-lg tracking-wider uppercase px-10 py-4 flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => setMobileOpen(false)}
            >
              <MessageCircle className="w-5 h-5" />
              {t("contact.message")}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
