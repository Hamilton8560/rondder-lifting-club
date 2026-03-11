"use client";

import { useState, useEffect } from "react";
import { Product } from "@/lib/products";
import { Save, Plus, Trash2, Eye, EyeOff, GripVertical, ArrowLeft, DollarSign, Star } from "lucide-react";

export default function AdminPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(products),
      });
      setMessage("✅ Guardado exitosamente");
      setTimeout(() => setMessage(""), 3000);
    } catch {
      setMessage("❌ Error al guardar");
    }
    setSaving(false);
  };

  const addProduct = () => {
    const newProduct: Product = {
      id: `product-${Date.now()}`,
      name: { es: "Nuevo Producto", en: "New Product" },
      price: "$0",
      showPrice: false,
      image: "/images/shirt-caffeine-calamity-nobg.png",
      tag: null,
      description: { es: "Descripción del producto", en: "Product description" },
      featured: false,
      visible: true,
      order: products.length,
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (index: number, updates: Partial<Product>) => {
    const updated = [...products];
    updated[index] = { ...updated[index], ...updates };
    setProducts(updated);
  };

  const removeProduct = (index: number) => {
    if (confirm("¿Eliminar este producto?")) {
      setProducts(products.filter((_, i) => i !== index));
    }
  };

  const moveProduct = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= products.length) return;
    const updated = [...products];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    updated.forEach((p, i) => (p.order = i));
    setProducts(updated);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-neutral-400 font-body">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-neutral-950/95 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="text-neutral-500 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </a>
            <div>
              <h1 className="font-heading text-lg font-bold tracking-[0.15em] uppercase">
                <span className="text-orange-500">RONDDER</span> Admin
              </h1>
              <p className="text-xs text-neutral-600 font-body">Panel de Administración de Productos</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {message && (
              <span className="text-sm font-body text-emerald-400">{message}</span>
            )}
            <button
              onClick={save}
              disabled={saving}
              className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-black font-heading font-bold text-sm tracking-wider uppercase px-6 py-2.5 transition-all duration-300 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {saving ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </div>
      </div>

      {/* Product list */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-sm tracking-[0.2em] uppercase text-neutral-400">
            Productos ({products.length})
          </h2>
          <button
            onClick={addProduct}
            className="border border-white/10 hover:border-orange-500/30 text-neutral-400 hover:text-orange-500 font-heading text-sm tracking-wider uppercase px-4 py-2 transition-all duration-300 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Agregar Producto
          </button>
        </div>

        <div className="space-y-4">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`border ${product.visible ? "border-white/[0.06]" : "border-red-500/20 opacity-60"} bg-white/[0.01] p-6 transition-all duration-300`}
            >
              <div className="flex items-start gap-4">
                {/* Reorder */}
                <div className="flex flex-col gap-1 pt-2">
                  <button onClick={() => moveProduct(index, -1)} className="text-neutral-600 hover:text-white transition-colors text-xs">▲</button>
                  <GripVertical className="w-4 h-4 text-neutral-700" />
                  <button onClick={() => moveProduct(index, 1)} className="text-neutral-600 hover:text-white transition-colors text-xs">▼</button>
                </div>

                {/* Image preview */}
                <div className="w-20 h-20 bg-neutral-900 border border-white/5 flex-shrink-0 overflow-hidden">
                  <img src={product.image} alt="" className="w-full h-full object-contain" />
                </div>

                {/* Fields */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name ES */}
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-neutral-600 font-body block mb-1">
                      Nombre (ES)
                    </label>
                    <input
                      type="text"
                      value={product.name.es}
                      onChange={(e) => updateProduct(index, { name: { ...product.name, es: e.target.value } })}
                      className="w-full bg-white/[0.03] border border-white/[0.08] px-3 py-2 text-sm text-white font-body focus:outline-none focus:border-orange-500/40 transition-colors"
                    />
                  </div>
                  {/* Name EN */}
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-neutral-600 font-body block mb-1">
                      Name (EN)
                    </label>
                    <input
                      type="text"
                      value={product.name.en}
                      onChange={(e) => updateProduct(index, { name: { ...product.name, en: e.target.value } })}
                      className="w-full bg-white/[0.03] border border-white/[0.08] px-3 py-2 text-sm text-white font-body focus:outline-none focus:border-orange-500/40 transition-colors"
                    />
                  </div>
                  {/* Desc ES */}
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-neutral-600 font-body block mb-1">
                      Descripción (ES)
                    </label>
                    <input
                      type="text"
                      value={product.description.es}
                      onChange={(e) => updateProduct(index, { description: { ...product.description, es: e.target.value } })}
                      className="w-full bg-white/[0.03] border border-white/[0.08] px-3 py-2 text-sm text-white font-body focus:outline-none focus:border-orange-500/40 transition-colors"
                    />
                  </div>
                  {/* Desc EN */}
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-neutral-600 font-body block mb-1">
                      Description (EN)
                    </label>
                    <input
                      type="text"
                      value={product.description.en}
                      onChange={(e) => updateProduct(index, { description: { ...product.description, en: e.target.value } })}
                      className="w-full bg-white/[0.03] border border-white/[0.08] px-3 py-2 text-sm text-white font-body focus:outline-none focus:border-orange-500/40 transition-colors"
                    />
                  </div>
                  {/* Price */}
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-neutral-600 font-body block mb-1">
                      Precio
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={product.price}
                        onChange={(e) => updateProduct(index, { price: e.target.value })}
                        className="flex-1 bg-white/[0.03] border border-white/[0.08] px-3 py-2 text-sm text-white font-body focus:outline-none focus:border-orange-500/40 transition-colors"
                      />
                      <button
                        onClick={() => updateProduct(index, { showPrice: !product.showPrice })}
                        className={`px-3 py-2 border text-xs font-heading tracking-wider uppercase flex items-center gap-1 transition-all ${
                          product.showPrice
                            ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/5"
                            : "border-white/10 text-neutral-600"
                        }`}
                      >
                        <DollarSign className="w-3 h-3" />
                        {product.showPrice ? "Visible" : "Oculto"}
                      </button>
                    </div>
                  </div>
                  {/* Image path */}
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-neutral-600 font-body block mb-1">
                      Imagen (ruta)
                    </label>
                    <input
                      type="text"
                      value={product.image}
                      onChange={(e) => updateProduct(index, { image: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/[0.08] px-3 py-2 text-sm text-white font-body focus:outline-none focus:border-orange-500/40 transition-colors"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <button
                    onClick={() => updateProduct(index, { visible: !product.visible })}
                    className={`p-2 border transition-all ${
                      product.visible
                        ? "border-emerald-500/20 text-emerald-400"
                        : "border-red-500/20 text-red-400"
                    }`}
                    title={product.visible ? "Visible" : "Oculto"}
                  >
                    {product.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => updateProduct(index, { featured: !product.featured })}
                    className={`p-2 border transition-all ${
                      product.featured
                        ? "border-orange-500/20 text-orange-400"
                        : "border-white/10 text-neutral-700"
                    }`}
                    title={product.featured ? "Destacado" : "Normal"}
                  >
                    <Star className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeProduct(index)}
                    className="p-2 border border-red-500/10 text-red-500/50 hover:text-red-400 hover:border-red-500/30 transition-all"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20 text-neutral-600 font-body">
            No hay productos. Haz clic en &quot;Agregar Producto&quot; para comenzar.
          </div>
        )}
      </div>
    </div>
  );
}
