import React, { useState } from 'react';
import { SPRAY_MODES } from '../data/productData';
import { Zap, Sparkles, Waves, Flame, Wind, Droplets, ArrowRight, ShieldCheck } from 'lucide-react';

export const InteractiveSimulator: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState(SPRAY_MODES[0]);

  return (
    <section className="py-16 bg-neutral-950 text-white border-y border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/20">
            SIMULADOR INTERACTIVO 6 EN 1
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-3">
            PRUEBA LA VERSATILIDAD DEL CHORRO REGLABLE
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2">
            No necesitas cambiar cabezales ni guardar piezas sueltas. Un solo giro en la boquilla selector cambia el tipo de salida de agua al instante.
          </p>
        </div>

        {/* Interactive Mode Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {SPRAY_MODES.map((mode) => (
            <button
              key={mode.angle}
              onClick={() => setSelectedMode(mode)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                selectedMode.angle === mode.angle
                  ? 'bg-neutral-900 border-yellow-400 ring-2 ring-yellow-400/30'
                  : 'bg-neutral-900/50 border-neutral-800 hover:border-neutral-700 opacity-80'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-black px-2 py-0.5 rounded ${mode.color}`}>
                  {mode.angle}
                </span>
              </div>
              <p className="text-xs font-bold text-white leading-tight line-clamp-2">
                {mode.name}
              </p>
            </button>
          ))}
        </div>

        {/* Live Visual Simulation Panel */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Canvas Simulation */}
            <div className="lg:col-span-7 bg-neutral-950 rounded-xl p-6 border border-neutral-800 relative overflow-hidden min-h-[260px] flex flex-col justify-between">
              
              {/* Nozzle Stream Animation simulation */}
              <div className="relative z-10">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-yellow-400 animate-ping" />
                    <span className="text-xs font-mono text-neutral-300 uppercase">
                      Modo Activo: {selectedMode.angle} • {selectedMode.name}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/20">
                    48V Potencia Inalámbrica
                  </span>
                </div>

                {/* Animated Stream Visual representation */}
                <div className="my-6 p-4 bg-neutral-900/80 rounded-lg border border-neutral-800 flex items-center justify-start gap-4">
                  <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center text-yellow-400 font-black text-xs shrink-0">
                    GUN 48V
                  </div>

                  {/* Water Stream simulation bar */}
                  <div className="flex-1 relative h-8 bg-neutral-950 rounded-full overflow-hidden border border-neutral-800 flex items-center">
                    <div
                      className={`h-full transition-all duration-500 rounded-full flex items-center justify-end pr-2 text-[10px] font-black ${
                        selectedMode.angle === '0°'
                          ? 'w-[95%] bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-white'
                          : selectedMode.angle === '15°'
                          ? 'w-[85%] bg-gradient-to-r from-orange-500 to-yellow-400 text-neutral-950'
                          : selectedMode.angle === '25°'
                          ? 'w-[75%] bg-gradient-to-r from-emerald-500 to-teal-400 text-neutral-950'
                          : selectedMode.angle === 'Espuma'
                          ? 'w-[90%] bg-gradient-to-r from-purple-500 via-indigo-400 to-blue-300 text-white'
                          : 'w-[65%] bg-gradient-to-r from-blue-500 to-cyan-400 text-white'
                      }`}
                    >
                      <span>{selectedMode.angle}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-neutral-200 leading-relaxed font-medium">
                  {selectedMode.purpose}
                </p>
              </div>

              {/* Pressure Bar indicator */}
              <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                <span>Indicador de Impacto Térmico y Físico</span>
                <span className="text-yellow-400 font-bold">50 BAR Max. (48V Li-ion)</span>
              </div>
            </div>

            {/* Comparison Side Box: Hose vs 48V Washer */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span>Manguera Tradicional vs. Hidrolavadora 48V</span>
              </h3>

              <div className="space-y-3 text-xs">
                {/* Traditional Hose row */}
                <div className="p-3 bg-neutral-950/60 border border-red-900/30 rounded-xl">
                  <div className="flex justify-between font-bold text-red-400 mb-1">
                    <span>❌ Manguera de Jardín Común</span>
                    <span>1 a 3 BAR</span>
                  </div>
                  <p className="text-neutral-400">
                    Baja presión, gasta excesiva agua, requiere grifo cercano, no quita barro ni grasa pegada.
                  </p>
                </div>

                {/* 48V Wireless Washer row */}
                <div className="p-3 bg-neutral-950 border border-emerald-500/40 rounded-xl relative">
                  <span className="absolute -top-2 right-2 bg-emerald-500 text-neutral-950 font-black text-[9px] px-2 py-0.5 rounded uppercase">
                    ¡LA GANADORA!
                  </span>
                  <div className="flex justify-between font-bold text-emerald-400 mb-1">
                    <span>✅ Hidrolavadora 48V Inalámbrica</span>
                    <span>Hasta 50 BAR (50X MÁS)</span>
                  </div>
                  <p className="text-neutral-300">
                    Impacto profundo, ahorra 70% de agua, libre de cables y toma agua directamente de cualquier balde.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
