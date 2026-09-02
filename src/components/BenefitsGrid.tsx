import React from 'react';
import { KEY_BENEFITS } from '../data/productData';
import { Car, Settings2, BatteryCharging, Building2, Sparkles, CheckCircle } from 'lucide-react';

interface BenefitsGridProps {
  onOrderClick: () => void;
}

export const BenefitsGrid: React.FC<BenefitsGridProps> = ({ onOrderClick }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'car-wash':
        return <Car className="w-7 h-7 text-yellow-400" />;
      case 'nozzle':
        return <Settings2 className="w-7 h-7 text-emerald-400" />;
      case 'batteries':
        return <BatteryCharging className="w-7 h-7 text-amber-400" />;
      case 'compact':
        return <Building2 className="w-7 h-7 text-cyan-400" />;
      default:
        return <Sparkles className="w-7 h-7 text-yellow-400" />;
    }
  };

  return (
    <section className="py-16 bg-neutral-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
            ¿POR QUÉ ES LA FAVORITA EN CIUDADES DE COLOMBIA?
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white mt-3">
            4 RAZONES QUE REVOLUCIONARÁN LA FORMA EN QUE LIMPIAS TU HOGAR
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2">
            Diseñada especialmente para los retos del día a día en Bogotá, Medellín, Cali, Barranquilla y todo el país.
          </p>
        </div>

        {/* 4 Required Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {KEY_BENEFITS.map((benefit, index) => (
            <div
              key={benefit.id}
              className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 hover:border-yellow-500/50 transition-all duration-300 relative group flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Badge Number & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getIcon(benefit.id)}
                  </div>
                  <span className="text-3xl font-black text-neutral-800 group-hover:text-yellow-400/30 transition-colors">
                    0{index + 1}
                  </span>
                </div>

                {/* Highlight Chip */}
                <div className="inline-block bg-neutral-900 text-yellow-400 text-xs font-bold px-2.5 py-1 rounded-md mb-3 border border-yellow-500/20">
                  {benefit.highlight}
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-300 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>

              {/* Bottom Feature Check */}
              <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center gap-2 text-xs text-neutral-400">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Garantía directa en Colombia y soporte posventa</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mid-page Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-emerald-500/10 border border-yellow-500/30 rounded-2xl p-6 text-center max-w-3xl mx-auto">
          <p className="text-base sm:text-lg font-bold text-white mb-3">
            ¿Listo para dejar tu carro, moto o fachada como recién salido de lavadero?
          </p>
          <button
            onClick={onOrderClick}
            className="bg-yellow-400 hover:bg-yellow-300 text-neutral-950 font-black px-6 py-3 rounded-xl text-sm sm:text-base transition-all transform active:scale-95 shadow-lg shadow-yellow-400/20 inline-flex items-center gap-2 cursor-pointer"
          >
            <span>PEDIR MI HIDROLAVADORA 48V CON PAGO CONTRA ENTREGA</span>
          </button>
        </div>

      </div>
    </section>
  );
};
