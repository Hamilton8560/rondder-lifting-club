"use client";

import { motion } from "framer-motion";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { socials } from "@/lib/socials";

// Simple TikTok icon
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.51a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13.2a8.16 8.16 0 005.58 2.18V12a4.83 4.83 0 01-3.77-1.54V6.69h3.77z" />
    </svg>
  );
}

export function Footer() {
  const { t } = useI18n();

  const footerLinks = [
    {
      title: t("footer.shop"),
      links: [
        { label: t("footer.all"), href: "#collection" },
        { label: t("footer.new"), href: "#collection" },
        { label: t("footer.best"), href: "#collection" },
        { label: t("footer.size"), href: "#" },
      ],
    },
    {
      title: t("footer.brand"),
      links: [
        { label: t("footer.story"), href: "#culture" },
        { label: "American Iron", href: "#collab" },
        { label: t("footer.lookbook"), href: "#" },
        { label: t("footer.press"), href: "#" },
      ],
    },
    {
      title: t("footer.help"),
      links: [
        { label: t("footer.shipping"), href: "#" },
        { label: t("footer.returns"), href: "#" },
        { label: t("footer.contactlink"), href: "#contact" },
        { label: t("footer.faq"), href: "#" },
      ],
    },
  ];

  return (
    <footer id="contact" className="relative border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="font-heading text-2xl font-bold tracking-[0.2em] uppercase text-white mb-4">RONDDER</div>
            <p className="text-sm text-neutral-500 font-body leading-relaxed max-w-xs mb-6">{t("footer.desc")}</p>
            <div className="flex items-center gap-4">
              {[
                { icon: Instagram, href: socials.instagram },
                { icon: TikTokIcon, href: socials.tiktok },
                { icon: MessageCircle, href: socials.whatsapp },
                { icon: Mail, href: `mailto:${socials.email}` },
              ].map(({ icon: Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 border border-white/[0.06] flex items-center justify-center text-neutral-600 hover:text-orange-500 hover:border-orange-500/30 transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          {footerLinks.map((group) => (
            <div key={group.title} className="md:col-span-2">
              <h4 className="font-heading text-xs font-bold tracking-[0.25em] uppercase text-neutral-400 mb-4">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-neutral-600 hover:text-orange-500 transition-colors duration-300 font-body">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-neutral-700 font-body">
            <span>© 2026 Rondder Lifting Club</span>
            <span className="text-neutral-800">·</span>
            <span>{t("footer.homegym")}{" "}
              <a href="#collab" className="text-neutral-500 hover:text-orange-500/70 transition-colors">American Iron, El Salvador</a>
            </span>
          </div>
          <div className="flex items-center gap-6 text-xs text-neutral-700 font-body">
            <a href="#" className="hover:text-neutral-400 transition-colors">{t("footer.privacy")}</a>
            <a href="#" className="hover:text-neutral-400 transition-colors">{t("footer.terms")}</a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none overflow-hidden w-full">
        <motion.div className="font-heading text-[12vw] font-bold tracking-[0.15em] uppercase text-white/[0.015] text-center leading-none pb-4 whitespace-nowrap"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
          RONDDER
        </motion.div>
      </div>
    </footer>
  );
}
