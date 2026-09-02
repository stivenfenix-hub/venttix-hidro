import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BenefitsGrid } from './components/BenefitsGrid';
import { InteractiveSimulator } from './components/InteractiveSimulator';
import { IncludedKit } from './components/IncludedKit';
import { ShippingSection } from './components/ShippingSection';
import { Testimonials } from './components/Testimonials';
import { OrderForm } from './components/OrderForm';
import { OrderFormModal } from './components/OrderFormModal';
import { FaqAccordion } from './components/FaqAccordion';
import { Footer } from './components/Footer';
import { FloatingOrderCTA } from './components/FloatingOrderCTA';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { WebhookManagerModal } from './components/WebhookManagerModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { SavedOrder } from './types';
import { FileSpreadsheet, EyeOff, ShieldCheck, LogOut } from 'lucide-react';

export default function App() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isWebhookModalOpen, setIsWebhookModalOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<SavedOrder | null>(null);

  // Check auth status
  const checkIsAuthenticated = (): boolean => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('venttix_admin_auth') === 'true';
  };

  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return checkIsAuthenticated();
  });

  // Check secret URL param 'fenixadmincol' on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const searchParams = new URLSearchParams(window.location.search);
    const hasSecretUrl = searchParams.has('fenixadmincol') || window.location.hash.includes('fenixadmincol');

    if (hasSecretUrl) {
      if (checkIsAuthenticated()) {
        setIsAdminMode(true);
      } else {
        setIsAdminLoginOpen(true);
      }
    }
  }, []);

  // Keyboard shortcut Ctrl+Shift+A to request admin access
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        if (checkIsAuthenticated()) {
          setIsAdminMode(prev => !prev);
        } else {
          setIsAdminLoginOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAdminAccessRequest = () => {
    if (checkIsAuthenticated()) {
      setIsAdminMode(true);
      setIsWebhookModalOpen(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminLoginOpen(false);
    setIsAdminMode(true);
    setIsWebhookModalOpen(true);
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('venttix_admin_auth');
    localStorage.removeItem('venttix_admin_mode');
    setIsAdminMode(false);
    setIsWebhookModalOpen(false);
  };

  const handleOpenOrderModal = () => {
    setIsOrderModalOpen(true);
  };

  const handleOrderSuccess = (orderData: SavedOrder) => {
    setCompletedOrder(orderData);
    setIsOrderModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-neutral-100 antialiased selection:bg-yellow-400 selection:text-neutral-950 relative">
      
      {/* Top Admin Bar - Visible ONLY when Admin Mode is authenticated */}
      {isAdminMode && (
        <div className="bg-neutral-900 border-b border-emerald-500/30 py-2 px-4 text-xs flex items-center justify-between max-w-7xl mx-auto text-white animate-fade-in shadow-lg">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/40 text-[10px]">
              <ShieldCheck className="w-3 h-3" /> Admin (fenixcol)
            </span>
            <span className="text-neutral-300 hidden md:inline text-xs">
              Sincronización de pedidos activa con Google Sheets / Webhooks
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsWebhookModalOpen(true)}
              className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black px-3 py-1 rounded-full text-xs transition cursor-pointer shadow-md"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Ver Pedidos & Google Sheets</span>
            </button>

            <button
              onClick={() => setIsAdminMode(false)}
              title="Ocultar barra de administración (Solo vista cliente)"
              className="flex items-center gap-1 text-neutral-400 hover:text-white hover:bg-neutral-800 px-2 py-1 rounded-full text-[11px] transition cursor-pointer"
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ocultar Bar</span>
            </button>

            <button
              onClick={handleAdminLogout}
              title="Cerrar sesión de administrador"
              className="flex items-center gap-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 px-2.5 py-1 rounded-full text-[11px] font-bold border border-red-500/30 transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Salir</span>
            </button>
          </div>
        </div>
      )}

      {/* Sticky Navigation & Countdown Header */}
      <Navbar onOrderClick={handleOpenOrderModal} />

      {/* Main Hero Section with Copywriting Title */}
      <Hero onOrderClick={handleOpenOrderModal} />

      {/* 4 Required Emotional Benefits Grid */}
      <BenefitsGrid onOrderClick={handleOpenOrderModal} />

      {/* Interactive 6-in-1 Nozzle Simulator */}
      <InteractiveSimulator />

      {/* What's Included Kit Box */}
      <IncludedKit onOrderClick={handleOpenOrderModal} />

      {/* Required Shipping Section from Bogota */}
      <ShippingSection />

      {/* Required Colombian Social Proof (3 Real Testimonials) */}
      <Testimonials />

      {/* Required Cash on Delivery Form Section */}
      <OrderForm onSuccess={handleOrderSuccess} onOpenModal={handleOpenOrderModal} />

      {/* FAQ Accordion */}
      <FaqAccordion />

      {/* Footer */}
      <Footer onAdminClick={handleAdminAccessRequest} />

      {/* Floating CTA Button */}
      <FloatingOrderCTA onOrderClick={handleOpenOrderModal} />

      {/* Pop-Up Order Form Modal */}
      <OrderFormModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        onSuccess={handleOrderSuccess}
      />

      {/* Order Success Receipt Modal */}
      <OrderConfirmationModal
        orderData={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />

      {/* Google Sheets / Webhook & Orders Log Modal */}
      <WebhookManagerModal
        isOpen={isWebhookModalOpen}
        onClose={() => setIsWebhookModalOpen(false)}
      />

      {/* Admin Login Authentication Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

    </div>
  );
}
