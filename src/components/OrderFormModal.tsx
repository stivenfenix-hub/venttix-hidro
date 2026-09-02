import React, { useState, useEffect } from 'react';
import { X, Truck, ShieldCheck, MapPin, Phone, User, CheckCircle2, Clock, Flame, Home } from 'lucide-react';
import { ALLOWED_CITIES } from '../data/colombiaData';
import { PACKAGE_OFFERS } from '../data/productData';
import { OrderFormData, SavedOrder } from '../types';
import { recordAndSyncOrder } from '../lib/webhookService';

interface OrderFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: SavedOrder) => void;
}

export const OrderFormModal: React.FC<OrderFormModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [selectedOffer, setSelectedOffer] = useState(PACKAGE_OFFERS[0]);
  
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: '',
    phone: '',
    department: 'Antioquia',
    city: 'Medellín',
    address: '',
    neighborhood: '',
    deliveryMethod: 'coordinadora',
    officePickupLocation: 'Entrega a Domicilio en Dirección',
    quantity: 1,
    paymentMethod: 'contraentrega',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Countdown timer inside modal for urge
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 59 });

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { minutes: prev.minutes - 1, seconds: 59 };
        return { minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCitySelect = (cityName: string) => {
    const match = ALLOWED_CITIES.find(c => c.city === cityName);
    if (match) {
      setFormData(prev => ({
        ...prev,
        city: match.city,
        department: match.department
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Ingresa tu nombre y apellido completo';
    if (!formData.phone.trim() || formData.phone.length < 7) {
      newErrors.phone = 'Ingresa un número de celular válido';
    }
    if (!formData.city) newErrors.city = 'Selecciona tu ciudad';
    if (!formData.address.trim()) newErrors.address = 'Ingresa tu dirección de entrega';
    // Barrio es opcional, no se valida como obligatorio

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const rawOrder: SavedOrder = {
      ...formData,
      totalAmount: selectedOffer.price,
      orderId,
      createdAt: new Date().toLocaleString('es-CO')
    };

    const syncedOrder = await recordAndSyncOrder(rawOrder);
    onSuccess(syncedOrder);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-3xl bg-neutral-900 border-2 border-yellow-500/50 rounded-3xl shadow-2xl my-auto overflow-hidden flex flex-col max-h-[92vh] text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 p-4 sm:p-5 border-b border-neutral-800 relative flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-yellow-400/10 border border-yellow-500/30 text-yellow-400 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase mb-1">
              <Flame className="w-3.5 h-3.5 fill-yellow-400 animate-pulse" /> PAGO CONTRA ENTREGA
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-white uppercase tracking-tight">
              FORMULARIO DE COMPRA RÁPIDA
            </h2>
            <p className="text-xs text-neutral-400">
              Entrega a domicilio para <span className="text-yellow-400 font-bold">Bogotá, Medellín, Bello, Itagüí, Sabaneta y Cali</span> (2 días hábiles). Pagas en efectivo al recibir.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Urgent Timer */}
            <div className="hidden sm:flex flex-col items-end text-right bg-neutral-950/80 px-3 py-1.5 rounded-xl border border-neutral-800">
              <span className="text-[10px] text-neutral-400 font-bold uppercase flex items-center gap-1">
                <Clock className="w-3 h-3 text-red-500 animate-spin" /> Oferta expira en:
              </span>
              <span className="text-sm font-black text-yellow-400 font-mono">
                {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white rounded-full transition cursor-pointer"
              aria-label="Cerrar formulario"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1">
          
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* STEP 1: Select Package Offer */}
            <div className="space-y-3">
              <label className="text-xs sm:text-sm font-black text-yellow-400 uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-yellow-400 text-neutral-950 font-black text-xs flex items-center justify-center">1</span>
                SELECCIONA TU COMBO EN PROMOCIÓN:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PACKAGE_OFFERS.map((offer) => {
                  const isSelected = selectedOffer.id === offer.id;
                  return (
                    <div
                      key={offer.id}
                      onClick={() => setSelectedOffer(offer)}
                      className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-gradient-to-br from-yellow-500/15 via-neutral-900 to-neutral-900 border-yellow-400 shadow-lg shadow-yellow-500/10'
                          : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700 opacity-80'
                      }`}
                    >
                      {offer.isPopular && (
                        <span className="absolute -top-2.5 right-3 bg-red-600 text-white font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase shadow">
                          MÁS VENDIDO - 55% OFF
                        </span>
                      )}

                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-extrabold text-sm text-white">{offer.title}</h4>
                          <p className="text-xs text-neutral-400 mt-0.5">{offer.subtitle}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isSelected ? 'border-yellow-400 bg-yellow-400' : 'border-neutral-600'
                        }`}>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-neutral-950" />}
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-neutral-800/60 flex items-baseline justify-between">
                        <div>
                          <span className="text-lg font-black text-yellow-400">
                            ${offer.price.toLocaleString('es-CO')}
                          </span>
                          <span className="text-xs text-neutral-500 line-through ml-2 font-bold">
                            ${offer.regularPrice.toLocaleString('es-CO')}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          Envío Gratis
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: Personal Contact Information */}
            <div className="space-y-3">
              <label className="text-xs sm:text-sm font-black text-yellow-400 uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-yellow-400 text-neutral-950 font-black text-xs flex items-center justify-center">2</span>
                DATOS DEL COMPRADOR:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    Nombre y Apellidos Completos *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Ej: Juan Carlos Pérez"
                      className={`w-full bg-neutral-950 border pl-9 pr-3 py-2.5 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-yellow-400 transition ${
                        errors.fullName ? 'border-red-500' : 'border-neutral-800'
                      }`}
                    />
                  </div>
                  {errors.fullName && <p className="text-red-400 text-[11px] mt-1">{errors.fullName}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1 flex items-center justify-between">
                    <span>Número Celular (con WhatsApp) *</span>
                    <span className="text-[10px] text-emerald-400 font-extrabold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">WhatsApp</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Ej: 310 123 4567 (WhatsApp activo)"
                      className={`w-full bg-neutral-950 border pl-9 pr-3 py-2.5 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-yellow-400 transition ${
                        errors.phone ? 'border-red-500' : 'border-neutral-800'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-red-400 text-[11px] mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* STEP 3: Delivery Address (Medellin, Cali, Bogota ONLY) */}
            <div className="space-y-3">
              <label className="text-xs sm:text-sm font-black text-yellow-400 uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-yellow-400 text-neutral-950 font-black text-xs flex items-center justify-center">3</span>
                DIRECCIÓN DE ENTREGA A DOMICILIO:
              </label>

              {/* Explicit Address-Only Delivery Badge */}
              <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-2.5 rounded-xl text-xs font-bold">
                <Home className="w-4 h-4 flex-shrink-0" />
                <span>Solo entrega directa a dirección (Casa, Apto u Oficina)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* City Selection Dropdown List */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    Ciudad de Entrega * (Selecciona de la lista)
                  </label>
                  <div className="relative">
                    <select
                      value={formData.city}
                      onChange={(e) => handleCitySelect(e.target.value)}
                      className={`w-full bg-neutral-950 border px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white focus:outline-none focus:border-yellow-400 transition cursor-pointer appearance-none ${
                        errors.city ? 'border-red-500' : 'border-neutral-800'
                      }`}
                    >
                      <option value="" disabled className="bg-neutral-900 text-neutral-400">
                        -- Selecciona tu ciudad de entrega --
                      </option>
                      {ALLOWED_CITIES.map((c) => (
                        <option key={c.city} value={c.city} className="bg-neutral-900 text-white font-medium py-1.5">
                          {c.city} ({c.department})
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-yellow-400 text-xs">
                      ▼
                    </div>
                  </div>
                  {errors.city && <p className="text-red-400 text-[11px] mt-1">{errors.city}</p>}
                </div>

                {/* Street Address */}
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    Dirección Exacta (Calle, Carrera, Transversal) *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Ej: Calle 45 # 12 - 34 Apto 301"
                      className={`w-full bg-neutral-950 border pl-9 pr-3 py-2.5 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-yellow-400 transition ${
                        errors.address ? 'border-red-500' : 'border-neutral-800'
                      }`}
                    />
                  </div>
                  {errors.address && <p className="text-red-400 text-[11px] mt-1">{errors.address}</p>}
                </div>

                {/* Neighborhood */}
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    Barrio (Opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.neighborhood}
                    onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                    placeholder="Ej: El Poblado / Teusaquillo (Opcional)"
                    className={`w-full bg-neutral-950 border px-3 py-2.5 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-yellow-400 transition ${
                      errors.neighborhood ? 'border-red-500' : 'border-neutral-800'
                    }`}
                  />
                  {errors.neighborhood && <p className="text-red-400 text-[11px] mt-1">{errors.neighborhood}</p>}
                </div>

              </div>
            </div>

            {/* STEP 4: Summary & Confirm Order */}
            <div className="bg-neutral-950 p-4 sm:p-5 rounded-2xl border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between text-xs sm:text-sm pb-2 border-b border-neutral-800">
                <span className="text-neutral-400 font-medium">Producto:</span>
                <span className="text-white font-black">{selectedOffer.title}</span>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm pb-2 border-b border-neutral-800">
                <span className="text-neutral-400 font-medium">Destino:</span>
                <span className="text-yellow-400 font-bold">{formData.city} ({formData.department})</span>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm pb-2 border-b border-neutral-800">
                <span className="text-neutral-400 font-medium">Envío a Domicilio:</span>
                <span className="text-emerald-400 font-bold">GRATIS ($0 COP)</span>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm pb-2 border-b border-neutral-800">
                <span className="text-neutral-400 font-medium">Método de Pago:</span>
                <span className="text-yellow-400 font-bold bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/20 text-xs">
                  💵 CONTRA ENTREGA EN EFECTIVO
                </span>
              </div>

              <div className="flex items-center justify-between text-base sm:text-xl font-black pt-1">
                <span className="text-white">TOTAL A PAGAR:</span>
                <span className="text-yellow-400">${selectedOffer.price.toLocaleString('es-CO')} COP</span>
              </div>

              <button
                type="submit"
                id="modal-confirm-order-btn"
                className="w-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 hover:from-emerald-400 hover:to-emerald-500 text-neutral-950 font-black py-4 px-6 rounded-2xl text-base sm:text-xl shadow-2xl shadow-emerald-500/30 transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Truck className="w-6 h-6" />
                <span>¡CONFIRMAR PEDIDO ($99.000 COP)!</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-neutral-400 text-center pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Garantía Venttix. Despachamos desde Bogotá a tu dirección (Entrega en 2 días hábiles).</span>
              </div>
            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

