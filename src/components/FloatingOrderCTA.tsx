import React from 'react';
import { ShoppingBag, Truck, ArrowRight } from 'lucide-react';

interface FloatingOrderCTAProps {
  onOrderClick: () => void;
}

export const FloatingOrderCTA: React.FC<FloatingOrderCTAProps> = ({ onOrderClick }) => {
  return (
    <div className="fixed bottom-3 left-3 right-3 sm:bottom-5 sm:left-1/2 sm:-translate-x-1/2 sm:w-auto z-40 max-w-lg mx-auto transition-all animate-fade-in">
      <div className="bg-neutral-900/95 backdrop-blur-md border-2 border-emerald-500 p-2 sm:p-2.5 rounded-2xl shadow-2xl shadow-emerald-500/30 flex items-center gap-2">
        
        {/* Clickable Floating Button in Vibrant Green */}
        <button
          onClick={onOrderClick}
          className="w-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:to-green-400 text-neutral-950 font-black py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl text-xs sm:text-base flex items-center justify-between sm:justify-center gap-2 sm:gap-3 shadow-lg shadow-emerald-500/25 transition-all active:scale-[0.98] cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-950 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-neutral-950"></span>
            </span>
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-950 shrink-0 group-hover:scale-110 transition-transform" />
            <span className="uppercase tracking-wide font-black text-xs sm:text-base text-neutral-950">
              ¡ORDENA AQUÍ Y PAGA AL RECIBIR!
            </span>
          </div>

          <div className="bg-neutral-950/15 p-1 rounded-lg shrink-0">
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-950 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </button>
      </div>
    </div>
  );
};
