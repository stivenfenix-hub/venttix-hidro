import React, { useState, useEffect } from 'react';
import { Truck, ShieldCheck, Clock, MapPin, Phone, MessageCircle } from 'lucide-react';
import { VenttixLogo } from './VenttixLogo';

interface NavbarProps {
  onOrderClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOrderClick }) => {
  // Countdown timer for urgency
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 47, seconds: 15 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => String(num).padStart(2, '0');

  return (
    <header className="sticky top-0 z-40 w-full shadow-md">
      {/* Top Colombian Offer Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-neutral-900 py-1.5 px-3 text-xs md:text-sm font-bold flex flex-wrap items-center justify-between border-b border-amber-300">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="hidden sm:inline">PAGO CONTRA ENTREGA • ENTREGA EN 2 DÍAS HÁBILES</span>
          <span className="sm:hidden">PAGO CONTRA ENTREGA • 2 DÍAS HÁBILES</span>
        </div>

        <div className="flex items-center gap-3 mx-auto sm:mx-0 mt-1 sm:mt-0">
          <div className="flex items-center gap-1 bg-neutral-900/10 px-2 py-0.5 rounded text-neutral-950 font-mono text-xs">
            <Clock className="w-3.5 h-3.5 text-neutral-900" />
            <span>
              Oferta vence en: {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
            </span>
          </div>
          <span className="hidden md:inline text-neutral-900 font-extrabold bg-red-600 text-white px-2 py-0.5 rounded text-xs animate-pulse">
            55% OFF HOY
          </span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="bg-neutral-900 text-white border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Official Venttix Store Logo */}
          <VenttixLogo size="lg" />

          {/* Quick Badges & CTA */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-4 text-xs text-neutral-300 pr-3 border-r border-neutral-800">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-yellow-400" />
                <span>Envío 2 Días Hábiles desde Bogotá</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Garantía 6 Meses Venttix</span>
              </div>
            </div>

            <button
              id="nav-order-button"
              onClick={onOrderClick}
              className="bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-extrabold px-4 py-2 rounded-lg text-sm transition-all transform active:scale-95 shadow-lg shadow-emerald-500/20 flex items-center gap-2"
            >
              <Truck className="w-4 h-4" />
              <span>Pedir Contra Entrega</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

