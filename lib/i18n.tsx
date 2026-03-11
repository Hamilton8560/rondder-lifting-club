"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Locale = "es" | "en";

const translations = {
  // Navbar
  "nav.collection": { es: "Colección", en: "Collection" },
  "nav.culture": { es: "Cultura", en: "Culture" },
  "nav.gym": { es: "El Gym", en: "The Gym" },
  "nav.contact": { es: "Contacto", en: "Contact" },
  "nav.shop": { es: "Ver", en: "Shop" },

  // Hero
  "hero.badge": { es: "Rondder Lifting Club — Est. MMXXVI", en: "Rondder Lifting Club — Est. MMXXVI" },
  "hero.headline": { es: "CAFEÍNA Y CALAMIDAD", en: "CAFFEINE AND CALAMITY" },
  "hero.sub1": { es: "Donde el esfuerzo nunca para y el café nunca se enfría.", en: "Where the grind never stops and the coffee never runs cold." },
  "hero.sub2": { es: "Ropa premium para levantar. Impulsada por cafeína. Forjada en hierro.", en: "Premium lifting apparel. Fueled by caffeine. Forged in iron." },
  "hero.cta1": { es: "Ver la Colección", en: "Shop the Collection" },
  "hero.cta2": { es: "La Cultura", en: "The Culture" },

  // Marquee
  "marquee.norestdays": { es: "SIN DÍAS DE DESCANSO", en: "NO REST DAYS" },
  "marquee.nodecaf": { es: "SIN DESCAFEINADO", en: "NO DECAF" },
  "marquee.skullandfire": { es: "CRÁNEO Y FUEGO", en: "SKULL & FIRE" },

  // Products
  "products.label": { es: "// LA COLECCIÓN", en: "// THE COLLECTION" },
  "products.title1": { es: "Viste el", en: "Wear the" },
  "products.title2": { es: "Esfuerzo", en: "Grind" },
  "products.subtitle": { es: "Lavado ácido. Forjado en fuego. Cada pieza cuenta una historia de cafeína y hierro.", en: "Acid-washed. Fire-forged. Every piece tells a story of caffeine and iron." },
  "products.bestseller": { es: "MÁS VENDIDA", en: "BEST SELLER" },
  "products.newdrop": { es: "NUEVO", en: "NEW DROP" },
  "products.stealth": { es: "STEALTH", en: "STEALTH" },
  "products.contact": { es: "Consultar", en: "Inquire" },

  // Coming Soon
  "soon.badge": { es: "Próximamente", en: "Coming Soon" },
  "soon.collab": { es: "Rondder × FUEL", en: "Rondder × FUEL" },
  "soon.subtitle": { es: "Café Pre-Entreno", en: "Pre-Workout Coffee" },
  "soon.desc": { es: "No es tu latte de la mañana. Skull Brew es un café pre-entreno de alto octanaje hecho para levantadores que se rehúsan a elegir entre cafeína y rendimiento. Preparado para pegar diferente. Próximamente.", en: "Not your morning latte. Skull Brew is a high-octane pre-workout coffee built for lifters who refuse to choose between caffeine and performance. Brewed to hit different. Dropping soon." },
  "soon.caffeine": { es: "300MG CAFEÍNA", en: "300MG CAFFEINE" },
  "soon.realcoffee": { es: "CAFÉ REAL", en: "REAL COFFEE" },
  "soon.zerosugar": { es: "CERO AZÚCAR", en: "ZERO SUGAR" },
  "soon.dropsin": { es: "Se lanza en", en: "Drops In" },
  "soon.days": { es: "Días", en: "Days" },
  "soon.hours": { es: "Horas", en: "Hours" },
  "soon.min": { es: "Min", en: "Min" },
  "soon.sec": { es: "Seg", en: "Sec" },
  "soon.notify.label": { es: "Recibe notificación el día del lanzamiento", en: "Get Notified on Drop Day" },
  "soon.notify.btn": { es: "Notificarme", en: "Notify Me" },
  "soon.notify.success": { es: "Estás en la lista. Te avisaremos el día del lanzamiento.", en: "You're on the list. We'll hit you up on drop day." },

  // Manifesto
  "culture.label": { es: "// LA CULTURA", en: "// THE CULTURE" },
  "culture.title1": { es: "No Hacemos", en: "We Don't Do" },
  "culture.rest": { es: "Días de Descanso.", en: "Rest Days." },
  "culture.title2": { es: "No Hacemos", en: "We Don't Do" },
  "culture.decaf": { es: "Descafeinado.", en: "Decaf." },
  "culture.desc": { es: "Rondder no es solo ropa — es una declaración. Nacida en las trincheras del gimnasio American Iron, cada pieza lleva el ADN de madrugadas, series pesadas y shots de espresso que se niegan a dejarte rendir.", en: "Rondder isn't just apparel — it's a statement. Born in the trenches of American Iron gym, every piece carries the DNA of early mornings, heavy sets, and espresso shots that refuse to let you quit." },
  "culture.caffeine.title": { es: "CAFEÍNA", en: "CAFFEINE" },
  "culture.caffeine.desc": { es: "No tomamos descafeinado. Cada rep empieza con un café que pega más fuerte que tu PR de peso muerto.", en: "We don't do decaf. Every rep starts with a cup that hits harder than your deadlift PR." },
  "culture.iron.title": { es: "HIERRO", en: "IRON" },
  "culture.iron.desc": { es: "Sin máquinas. Sin atajos. Hierro real, resultados reales. La barra no miente y nosotros tampoco.", en: "No machines. No shortcuts. Real iron, real results. The bar doesn't lie and neither do we." },
  "culture.calamity.title": { es: "CALAMIDAD", en: "CALAMITY" },
  "culture.calamity.desc": { es: "Las zonas de confort son donde los sueños van a morir. Traemos el caos para que puedas construir la calma.", en: "Comfort zones are where dreams go to die. We bring the chaos so you can build the calm." },
  "culture.community.title": { es: "COMUNIDAD", en: "COMMUNITY" },
  "culture.community.desc": { es: "No es una marca. Es un club de levantamiento. Una hermandad impulsada por cafeína que aparece cuando importa.", en: "Not a brand. A lifting club. A caffeine-fueled brotherhood that shows up when it matters." },
  "culture.badge": { es: "★ Rondder Lifting Club ★", en: "★ Rondder Lifting Club ★" },

  // Collab
  "collab.label": { es: "// FORJADO EN", en: "// FORGED AT" },
  "collab.desc": { es: "Rondder nació dentro de las paredes de American Iron — un gimnasio de lujo de 600m² con estándares americanos en El Salvador. Sauna, coworking y un espacio diseñado en blanco y negro al nivel de Ferrari o Equinox. Cada pieza de Rondder lleva el ADN de esta comunidad.", en: "Rondder was born inside the walls of American Iron — a 600m² luxury gym with American standards in El Salvador. Sauna, coworking, and a black-and-white space designed to the level of Ferrari or Equinox. Every piece of Rondder carries the DNA of this community." },
  "collab.sqm": { es: "Metros Cuadrados", en: "Square Meters" },
  "collab.sauna": { es: "Sauna", en: "Sauna" },
  "collab.cowork": { es: "Coworking", en: "Coworking" },
  "collab.since": { es: "Desde", en: "Since" },
  "collab.partnership": { es: "Alianza Oficial", en: "Official Partnership" },

  // CTA
  "cta.label": { es: "Únete al Club", en: "Join the Club" },
  "cta.title1": { es: "El Hierro", en: "The Iron" },
  "cta.title2": { es: "No Espera.", en: "Doesn't Wait." },
  "cta.desc": { es: "Nuevos lanzamientos cada mes. Ediciones limitadas. Cuando se acaban, se acaban. Entra o quédate atrás.", en: "New drops every month. Limited runs. Once they're gone, they're gone. Get in or get left behind." },
  "cta.btn": { es: "Ver Ahora", en: "Shop Now" },
  "cta.follow": { es: "Seguir @Rondder", en: "Follow @Rondder" },
  "cta.shipping": { es: "ENVÍO A TODO EL SALVADOR · ENTREGAS A NIVEL MUNDIAL", en: "FREE SHIPPING ON ORDERS OVER $75 · WORLDWIDE DELIVERY" },

  // Footer
  "footer.desc": { es: "Cafeína & Calamidad. Ropa premium de lifting club forjada en American Iron, El Salvador.", en: "Caffeine & Calamity. Premium lifting club apparel forged at American Iron, El Salvador." },
  "footer.shop": { es: "Tienda", en: "Shop" },
  "footer.all": { es: "Todos los Productos", en: "All Products" },
  "footer.new": { es: "Nuevos", en: "New Arrivals" },
  "footer.best": { es: "Más Vendidos", en: "Best Sellers" },
  "footer.size": { es: "Guía de Tallas", en: "Size Guide" },
  "footer.brand": { es: "Marca", en: "Brand" },
  "footer.story": { es: "Nuestra Historia", en: "Our Story" },
  "footer.lookbook": { es: "Lookbook", en: "Lookbook" },
  "footer.press": { es: "Prensa", en: "Press" },
  "footer.help": { es: "Ayuda", en: "Help" },
  "footer.shipping": { es: "Envío", en: "Shipping" },
  "footer.returns": { es: "Devoluciones", en: "Returns" },
  "footer.contactlink": { es: "Contacto", en: "Contact" },
  "footer.faq": { es: "FAQ", en: "FAQ" },
  "footer.homegym": { es: "Gimnasio base:", en: "Home Gym:" },
  "footer.privacy": { es: "Privacidad", en: "Privacy" },
  "footer.terms": { es: "Términos", en: "Terms" },

  // Contact
  "contact.whatsapp": { es: "WhatsApp", en: "WhatsApp" },
  "contact.message": { es: "Escríbenos", en: "Message Us" },
} as const;

export type TranslationKey = keyof typeof translations;

interface I18nContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType>({
  locale: "es",
  setLocale: () => {},
  t: (key) => key,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("es");

  const t = (key: TranslationKey): string => {
    return translations[key]?.[locale] ?? key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
