export interface Product {
  id: string;
  name: { es: string; en: string };
  price: string;
  showPrice: boolean;
  image: string;
  tag: { es: string; en: string } | null;
  description: { es: string; en: string };
  featured: boolean;
  visible: boolean;
  order: number;
}

export const defaultProducts: Product[] = [
  {
    id: "caffeine-calamity",
    name: { es: "Cafeína & Calamidad", en: "Caffeine & Calamity" },
    price: "$45",
    showPrice: false,
    image: "/images/shirt-caffeine-calamity-nobg.png",
    tag: { es: "MÁS VENDIDA", en: "BEST SELLER" },
    description: { es: "La original. Cráneo y llamas en negro ácido.", en: "The OG. Skull & flames on acid-washed black." },
    featured: true,
    visible: true,
    order: 0,
  },
  {
    id: "caffeinated-afterlife",
    name: { es: "Cafeinado en el Más Allá", en: "Caffeinated in the Afterlife" },
    price: "$45",
    showPrice: false,
    image: "/images/shirt-caffeinated-afterlife-nobg.png",
    tag: { es: "NUEVO", en: "NEW DROP" },
    description: { es: "Esqueleto levantador. Llamas. Rondder Lifting Club.", en: "Skeleton lifter. Flames. Rondder Lifting Club." },
    featured: false,
    visible: true,
    order: 1,
  },
  {
    id: "anti-rondder-red",
    name: { es: "Anti Rondder Club", en: "Anti Rondder Club" },
    price: "$40",
    showPrice: false,
    image: "/images/shirt-anti-rondder-red-nobg.png",
    tag: null,
    description: { es: "Rojo y blanco sobre negro lavado. IYKYK.", en: "Red & white on washed black. IYKYK." },
    featured: false,
    visible: true,
    order: 2,
  },
  {
    id: "anti-rondder-dark",
    name: { es: "Anti Rondder Club — Dark", en: "Anti Rondder Club — Dark" },
    price: "$40",
    showPrice: false,
    image: "/images/shirt-anti-rondder-dark-nobg.png",
    tag: { es: "STEALTH", en: "STEALTH" },
    description: { es: "Todo negro. Estampa tonal sobre lavado ácido.", en: "Murdered out. Tonal print on acid wash." },
    featured: false,
    visible: true,
    order: 3,
  },
];
