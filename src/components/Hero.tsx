import React, { useState } from 'react';
import { PRODUCT_IMAGES } from '../data/productData';
import { Truck, ShieldCheck, Zap, Battery, Sparkles, MapPin, CheckCircle2, ArrowRight, Star, Flame } from 'lucide-react';

interface HeroProps {
  onOrderClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderClick }) => {
  const [selectedImage, setSelectedImage] = useState(PRODUCT_IMAGES[0]);

  return (
    <section className="bg-neutral-950 text-white pt-6 pb-12 border-b border-neutral-800 relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Headline Badge */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4 text-center">
          <span className="bg-yellow-400 text-neutral-950 text-xs md:text-sm font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-md">
            <Flame className="w-4 h-4 fill-neutral-950" /> #1 Más Vendido en Colombia 2026
          </span>
          <span className="bg-neutral-800 text-emerald-400 border border-emerald-500/30 text-xs md:text-sm font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Despachos desde Bogotá (2 días hábiles)
          </span>
        </div>

        {/* REQUIRED TITULAR PRINCIPAL */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight sm:leading-none">
            ¡OLVÍDATE DE LA MANGUERA! <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500">
              LIMPIEZA PROFUNDA Y POTENCIA TOTAL EN TUS MANOS, SIN CABLES
            </span>
          </h1>
          <p className="mt-3 text-neutral-300 text-base md:text-lg max-w-2xl mx-auto">
            Potencia hasta 50 veces mayor que una manguera de jardín. Lava carros, motos, fachadas y patios en minutos sin enredos de cables ni conexiones fijas.
          </p>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Gallery Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Featured Image Display */}
            <div className="relative bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl group aspect-[4/3]">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Badges Over Image */}
              <div className="absolute top-3 left-3 bg-neutral-950/90 backdrop-blur-md text-white border border-yellow-500/30 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>INCLUYE 2 BATERÍAS 48V + BOQUILLA 6 EN 1</span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 bg-neutral-950/85 backdrop-blur-md p-3 rounded-xl border border-neutral-800 text-white">
                <p className="font-bold text-sm text-yellow-400">{selectedImage.title}</p>
                <p className="text-xs text-neutral-300">{selectedImage.subtitle}</p>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {PRODUCT_IMAGES.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img)}
                  className={`relative rounded-xl overflow-hidden border-2 transition-all text-left ${
                    selectedImage.id === img.id
                      ? 'border-yellow-400 ring-2 ring-yellow-400/30'
                      : 'border-neutral-800 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-16 sm:h-20 object-cover"
                  />
                  <div className="p-1 bg-neutral-900 text-[10px] font-medium text-neutral-300 truncate">
                    {img.title}
                  </div>
                </button>
              ))}
            </div>

            {/* Fast Highlights Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-2.5 text-center">
                <Zap className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                <span className="text-xs font-bold text-white block">50X Presión</span>
                <span className="text-[10px] text-neutral-400">vs Manguera común</span>
              </div>

              <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-2.5 text-center">
                <Battery className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                <span className="text-xs font-bold text-white block">2 Baterías 48V</span>
                <span className="text-[10px] text-neutral-400">Doble autonomía</span>
              </div>

              <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-2.5 text-center">
                <Sparkles className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                <span className="text-xs font-bold text-white block">Boquilla 6 en 1</span>
                <span className="text-[10px] text-neutral-400">Chorro regulable</span>
              </div>

              <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-2.5 text-center">
                <MapPin className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                <span className="text-xs font-bold text-white block">Desde Bogotá</span>
                <span className="text-[10px] text-neutral-400">Entrega en 2 días hábiles</span>
              </div>
            </div>
          </div>

          {/* Pricing & Value Offer Column (5 cols) */}
          <div className="lg:col-span-5 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl relative">
            <div className="space-y-5">
              
              {/* Product Badge Header */}
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div>
                  <span className="text-xs font-extrabold uppercase text-yellow-400 tracking-wider">
                    EDICIÓN NEGRA 48V PRO
                  </span>
                  <h2 className="text-xl font-black text-white">Hidrolavadora Inalámbrica</h2>
                </div>
                <div className="flex items-center gap-1 bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 px-2.5 py-1 rounded-lg text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-yellow-400" />
                  <span>5.0 (1.420+ ventas)</span>
                </div>
              </div>

              {/* Price Anchor Box */}
              <div className="bg-gradient-to-br from-neutral-950 to-neutral-900 p-4 rounded-xl border border-yellow-500/30 relative">
                <span className="absolute -top-3 right-3 bg-red-600 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase shadow">
                  Ahorras $121.000 COP (55% OFF)
                </span>

                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-yellow-400 tracking-tight">
                    $99.000
                  </span>
                  <span className="text-neutral-400 line-through text-lg font-bold">
                    $220.000
                  </span>
                  <span className="text-xs font-bold text-neutral-300">COP</span>
                </div>

                <div className="mt-2 flex items-center gap-2 text-xs text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1.5 rounded-lg">
                  <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>¡ENVÍO GRATIS Y PAGO CONTRA ENTREGA HABILITADO!</span>
                </div>
              </div>

              {/* Key Bullet Highlights */}
              <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-200">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>2 Baterías de 48V de Litio:</strong> No te quedes a medias lavando.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Boquilla 6 en 1 Ajustable:</strong> Giro simple para cambiar el tipo de chorro.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Auto-aspirado de agua:</strong> Toma agua de baldes, canecas o quebradas.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Despacho directo desde Bogotá:</strong> Entrega a domicilio en 2 días hábiles (Bogotá, Medellín, Bello, Itagüí, Sabaneta y Cali).
                  </span>
                </li>
              </ul>

              {/* Direct Order Button */}
              <button
                id="hero-order-now-button"
                onClick={onOrderClick}
                className="w-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 hover:from-emerald-400 hover:to-emerald-500 text-neutral-950 font-black py-4 px-6 rounded-xl text-base sm:text-lg shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>¡ORDENA AQUÍ Y PAGA AL RECIBIR!</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Guarantees Badges */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-400 border-t border-neutral-800 pt-3">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Pagas al repartidor en efectivo</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-yellow-400" />
                  <span>Entrega en 2 días hábiles desde Bogotá</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
