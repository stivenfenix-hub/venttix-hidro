import React from 'react';
import { REVIEWS } from '../data/productData';
import { Star, ShieldCheck, MapPin, ThumbsUp, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-neutral-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-2 font-black text-yellow-400 text-sm">5.0 de 5 estrellas</span>
          </div>
          
          <span className="text-xs font-black uppercase tracking-widest text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
            TESTIMONIOS REALES EN COLOMBIA
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-3">
            LO QUE DICEN NUESTROS CLIENTES EN BOGOTÁ, CALI Y MEDELLÍN
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2">
            Más de 1.400 colombianos ya disfrutan la comodidad de lavar sus vehículos y hogares sin enredos de cables.
          </p>
        </div>

        {/* 3 Required Colombian Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-7 shadow-xl flex flex-col justify-between relative hover:border-yellow-500/40 transition-all"
            >
              <Quote className="absolute top-4 right-4 w-10 h-10 text-neutral-800/60 pointer-events-none" />

              <div>
                {/* User Header */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400/40"
                  />
                  <div>
                    <h3 className="font-bold text-white text-base leading-tight flex items-center gap-1.5">
                      <span>{review.name}</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" title="Comprador Verificado" />
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-neutral-400 mt-0.5">
                      <span className="flex items-center gap-1 text-yellow-400 font-medium">
                        <MapPin className="w-3 h-3" /> {review.city}
                      </span>
                      <span>•</span>
                      <span>{review.date}</span>
                    </div>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-neutral-200 text-sm leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Bottom Verified Badge */}
              <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center justify-between text-[11px] text-neutral-400">
                <span className="flex items-center gap-1 text-emerald-400 font-bold">
                  <ThumbsUp className="w-3.5 h-3.5" /> Compra Verificada
                </span>
                <span className="text-neutral-400">Pago Contra Entrega</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
