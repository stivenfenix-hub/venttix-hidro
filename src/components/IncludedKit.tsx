import React from 'react';
import { INCLUDED_ITEMS, PRODUCT_IMAGES } from '../data/productData';
import { Check, PackageCheck, ShieldCheck, Briefcase, BatteryCharging, Sparkles, Settings2, Pipette, Filter, Plug, ArrowRight } from 'lucide-react';

interface IncludedKitProps {
  onOrderClick: () => void;
}

export const IncludedKit: React.FC<IncludedKitProps> = ({ onOrderClick }) => {
  return (
    <section className="py-16 bg-neutral-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
            ¿QUÉ RECIBIRÁS EN TU CASA?
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-3">
            KIT COMPLETO PRO CON 2 BATERÍAS Y MALETÍN DE TRANSPORTE
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2">
            Todo lo necesario listo para usar al desempacar. No necesitas comprar accesorios adicionales.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Kit Photo (5 cols) */}
          <div className="lg:col-span-5 bg-neutral-950 p-4 rounded-2xl border border-neutral-800 shadow-2xl">
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] border border-neutral-800">
              <img
                src={PRODUCT_IMAGES[4].url}
                alt="Kit Completo Hidrolavadora 48V"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-yellow-400 text-neutral-950 font-black text-xs px-2.5 py-1 rounded shadow">
                EDICIÓN COMPLETA 48V
              </div>
            </div>

            <div className="mt-4 p-3 bg-neutral-900/80 rounded-xl border border-neutral-800 text-xs text-neutral-300 flex items-center gap-3">
              <PackageCheck className="w-8 h-8 text-yellow-400 shrink-0" />
              <div>
                <p className="font-bold text-white">Empaque Reforzado Anti-Impactos</p>
                <p className="text-neutral-400 text-[11px]">Enviado con sellos de seguridad desde nuestra bodega en Bogotá (Entrega en 2 días hábiles).</p>
              </div>
            </div>
          </div>

          {/* Included Items List (7 cols) */}
          <div className="lg:col-span-7 bg-neutral-950 p-6 sm:p-8 rounded-2xl border border-neutral-800 shadow-xl space-y-6">
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
              <Briefcase className="w-5 h-5 text-yellow-400" />
              <span>Contenido Exacto de la Caja (8 Piezas):</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              {INCLUDED_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-yellow-500/30 transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-yellow-400/10 text-yellow-400 flex items-center justify-center font-bold text-xs shrink-0 border border-yellow-400/20">
                    <Check className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div>
                    <span className="text-white font-bold block leading-tight">{item.name}</span>
                    <span className="text-yellow-400 text-[11px] font-mono">{item.qty}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-neutral-400">
                <span className="text-emerald-400 font-bold block">✓ Probada y revisada antes del despacho</span>
                <span>Listo para operar con agua de balde o grifo</span>
              </div>

              <button
                onClick={onOrderClick}
                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-black px-6 py-3 rounded-xl text-sm transition-all transform active:scale-95 shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>PEDIR ESTE KIT COMPLETO</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
