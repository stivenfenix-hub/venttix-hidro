import React from 'react';
import { Truck, MapPin, Building, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';

export const ShippingSection: React.FC = () => {
  return (
    <section className="py-16 bg-neutral-950 text-white border-y border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            ENVÍOS SEGUROS A TODA COLOMBIA
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-3">
            DESPACHOS DESDE BOGOTÁ (ENTREGA EN 2 DÍAS HÁBILES)
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base mt-2">
            Compra con total tranquilidad y respaldo. Despachamos todos nuestros pedidos directamente desde nuestra bodega central en <strong className="text-yellow-400">Bogotá D.C.</strong> con entrega a domicilio en <strong className="text-emerald-400">2 días hábiles</strong>.
          </p>
        </div>

        {/* Shipping Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          
          {/* Option 1: Coordinadora */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 hover:border-yellow-500/40 transition-all shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-yellow-400 text-neutral-950 text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-xl">
              OPCIÓN MÁS POPULAR
            </div>

            <div className="w-14 h-14 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-105 transition-transform">
              <Truck className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <span>Entrega a Domicilio con</span>
              <span className="text-blue-400 font-black">Coordinadora</span>
            </h3>

            <p className="text-neutral-300 text-sm leading-relaxed mb-4">
              Recibe directamente en la puerta de tu casa, finca o local comercial. El transportista te llama antes de entregar para coordinar la recepción.
            </p>

            <ul className="space-y-2 text-xs text-neutral-300 border-t border-neutral-800 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Cobro Pago Contra Entrega en efectivo al recibir</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Rastreo en línea con guía oficial de la empresa</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Tiempo garantizado: Entrega en 2 días hábiles (Bogotá, Medellín, Bello, Itagüí, Sabaneta y Cali)</span>
              </li>
            </ul>
          </div>

          {/* Option 2: Inter Rapidísimo */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 hover:border-yellow-500/40 transition-all shadow-xl relative overflow-hidden group">
            <div className="w-14 h-14 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-105 transition-transform">
              <Building className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <span>Retiro en Oficina</span>
              <span className="text-amber-400 font-black">Inter Rapidísimo</span>
            </h3>

            <p className="text-neutral-300 text-sm leading-relaxed mb-4">
              Si lo prefieres, gestionamos tu envío para que reclames personalmente en la oficina de <strong>Inter Rapidísimo</strong> más cercana a tu ubicación en tu municipio.
            </p>

            <ul className="space-y-2 text-xs text-neutral-300 border-t border-neutral-800 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Ideal si no pasas mucho tiempo en casa durante el día</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pagas en la caja de la oficina al reclamar tu paquete</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Más de 2.000 puntos de atención en Colombia</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Warehouse Dispatch Guarantee Banner */}
        <div className="mt-10 max-w-5xl mx-auto bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-400 shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="font-extrabold text-white text-sm sm:text-base">
                📦 Bodega Central: Bogotá D.C.
              </p>
              <p className="text-xs text-neutral-400">
                Verificamos empaque, carga de baterías y accesorios antes del despacho directo a tu dirección.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-4 py-2 rounded-xl shrink-0">
            <Clock className="w-4 h-4" />
            <span>Entrega Garantizada en 2 Días Hábiles</span>
          </div>
        </div>

      </div>
    </section>
  );
};
