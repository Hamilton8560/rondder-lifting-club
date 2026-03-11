"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Flame, Star, MessageCircle } from "lucide-react";
import { useI18n, Locale } from "@/lib/i18n";
import { Product, defaultProducts } from "@/lib/products";
import { socials } from "@/lib/socials";

function ProductCard({ product, index, locale }: { product: Product; index: number; locale: Locale }) {
  const { t } = useI18n();
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / 25;
    const y = -(e.clientX - rect.left - rect.width / 2) / 25;
    setRotateX(x);
    setRotateY(y);
  };

  const span = product.featured
    ? "md:col-span-2 md:row-span-2"
    : index === 3
    ? "md:col-span-2 md:row-span-1"
    : "md:col-span-1 md:row-span-1";

  const tagText = product.tag?.[locale] || null;

  return (
    <motion.div
      className={`group relative ${span}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] as const }}
    >
      <motion.div
        className="relative h-full overflow-hidden bg-neutral-950 border border-white/[0.06] cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => { setRotateX(0); setRotateY(0); setHovering(false); }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        transition={{ duration: 0.1 }}
        whileHover={{ borderColor: "rgba(249, 115, 22, 0.2)" }}
      >
        {product.featured && (
          <motion.div
            className="absolute inset-0 z-0"
            style={{ background: "conic-gradient(from 0deg, transparent 0%, rgba(249,115,22,0.4) 15%, transparent 30%)" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
        )}

        <div className={`relative bg-neutral-950 ${product.featured ? "m-px" : ""} h-full flex flex-col`}>
          {/* Image with transparent background — add subtle gradient behind */}
          <div className={`relative overflow-hidden ${product.featured ? "aspect-[4/5] md:aspect-auto md:flex-1" : "aspect-[3/4]"} bg-gradient-to-b from-neutral-900/50 via-neutral-950 to-neutral-950 flex items-center justify-center`}>
            <Image
              src={product.image}
              alt={product.name[locale]}
              fill
              className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-40" />

            {tagText && (
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-orange-500 text-black font-heading font-bold text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 inline-flex items-center gap-1.5">
                  {tagText === "BEST SELLER" || tagText === "MÁS VENDIDA" ? <Star className="w-3 h-3" /> : null}
                  {tagText === "NEW DROP" || tagText === "NUEVO" ? <Flame className="w-3 h-3" /> : null}
                  {tagText}
                </span>
              </div>
            )}

            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-orange-500/10 via-transparent to-transparent pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: hovering ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Info */}
          <div className="p-5 relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-heading text-lg font-semibold tracking-wide uppercase text-white">
                  {product.name[locale]}
                </h3>
                <p className="text-sm text-neutral-500 font-body mt-1">
                  {product.description[locale]}
                </p>
              </div>
              {product.showPrice && (
                <span className="font-heading text-xl font-bold text-orange-500">
                  {product.price}
                </span>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: hovering ? 1 : 0, y: hovering ? 0 : 10 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <a
                href={socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white/5 border border-white/10 hover:bg-orange-500 hover:text-black hover:border-orange-500 text-white font-heading font-semibold text-sm tracking-[0.15em] uppercase py-3 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                {t("products.contact")}
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Products() {
  const { locale, t } = useI18n();
  const [products, setProducts] = useState<Product[]>(defaultProducts);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setProducts(data);
      })
      .catch(() => {});
  }, []);

  const visibleProducts = products
    .filter((p) => p.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <section id="collection" className="relative py-24 md:py-32">
      <motion.div
        className="text-center mb-16 px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-xs tracking-[0.3em] uppercase text-orange-500 font-body font-medium block mb-4">
          {t("products.label")}
        </span>
        <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-tight uppercase">
          {t("products.title1")} <span className="text-orange-500">{t("products.title2")}</span>
        </h2>
        <p className="mt-4 text-neutral-500 font-body text-lg max-w-lg mx-auto">
          {t("products.subtitle")}
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-[auto_auto_auto] gap-4">
          {visibleProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
