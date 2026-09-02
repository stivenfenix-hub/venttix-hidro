import React from 'react';
import { MapPin, Lock } from 'lucide-react';
import { VenttixLogo } from './VenttixLogo';

interface FooterProps {
  onAdminClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer className="bg-neutral-950 text-neutral-400 text-xs py-12 border-t border-neutral-800 pb-28 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="space-y-3">
            <VenttixLogo size="lg" />
            <p className="text-neutral-400 text-xs">
              Venttix Store - Líderes en equipos de lavado e hidrolavadoras inalámbricas de alta potencia para el sector urbano y automotriz en Colombia.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-2 uppercase text-xs tracking-wider">Centro de Despachos</h4>
            <p className="text-neutral-300 flex items-center gap-1.5 mb-1">
              <MapPin className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
              <span>Bodega Principal: Bogotá D.C.</span>
            </p>
            <p className="text-neutral-400">Envíos con entrega en 2 días hábiles a Bogotá, Medellín, Bello, Itagüí, Sabaneta y Cali.</p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-2 uppercase text-xs tracking-wider">Garantía y Seguridad</h4>
            <ul className="space-y-1 text-neutral-400">
              <li>✓ 100% Pago Contra Entrega en Efectivo</li>
              <li>✓ 6 Meses de Garantía por Defectos</li>
              <li>✓ Soporte posventa permanente e inmediato</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-neutral-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-neutral-500">
          <p>© 2026 Hidrolavadora Inalámbrica 48V Colombia. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>Términos de Servicio</span>
            <span>Política de Envíos</span>
            <span>Aviso de Privacidad</span>
            {onAdminClick && (
              <button
                onClick={onAdminClick}
                title="Acceso Administración (Google Sheets / Webhook)"
                className="text-neutral-700 hover:text-neutral-400 p-1 transition cursor-pointer"
              >
                <Lock className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};

