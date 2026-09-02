import React, { useState } from 'react';
import { ALLOWED_CITIES } from '../data/colombiaData';
import { PACKAGE_OFFERS } from '../data/productData';
import { OrderFormData, SavedOrder } from '../types';
import { recordAndSyncOrder } from '../lib/webhookService';
import { Truck, ShieldCheck, MapPin, Phone, User, Home, Sparkles, Flame } from 'lucide-react';

interface OrderFormProps {
  onSuccess: (data: SavedOrder) => void;
  onOpenModal?: () => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({ onSuccess, onOpenModal }) => {
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
      newErrors.phone = 'Ingresa tu número celular para coordinar la entrega';
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
  };

  return (
    <section id="formulario-pedido" className="py-12 bg-neutral-900 border-b border-neutral-800 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-neutral-950 rounded-3xl border-2 border-yellow-500/50 p-6 sm:p-10 shadow-2xl space-y-8">
          
          {/* Header Box */}
          <div className="text-center space-y-2 border-b border-neutral-800 pb-6">
            <span className="inline-flex items-center gap-1.5 bg-yellow-400/10 border border-yellow-500/30 text-yellow-400 font-extrabold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider">
              <Flame className="w-4 h-4 fill-yellow-400 animate-pulse" /> PAGO CONTRA ENTREGA
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              HAZ TU PEDIDO EN 1 MINUTO
            </h2>
            <p className="text-neutral-300 text-xs sm:text-sm max-w-xl mx-auto">
              Entrega a domicilio para <strong className="text-yellow-400">Bogotá, Medellín, Bello, Itagüí, Sabaneta y Cali</strong>. Despachamos desde Bogotá y entregamos en <strong>2 días hábiles</strong>. Pagas en efectivo al recibir.
            </p>

            {onOpenModal && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={onOpenModal}
                  className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-neutral-950 font-black px-5 py-2.5 rounded-full text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-yellow-500/20 transition transform hover:scale-105 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 fill-neutral-950" />
                  <span>ABRIR EN VENTANA EMERGENTE (POP-UP)</span>
                </button>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* STEP 1: Offer Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-extrabold text-yellow-400 uppercase tracking-wider mb-1 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-yellow-400 text-neutral-950 flex items-center justify-center text-xs font-black">1</span>
                <span>SELECCIONA TU OFERTA:</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PACKAGE_OFFERS.map(offer => (
                  <button
                    type="button"
                    key={offer.id}
                    onClick={() => setSelectedOffer(offer)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all relative cursor-pointer ${
                      selectedOffer.id === offer.id
                        ? 'bg-neutral-950 border-yellow-400 ring-2 ring-yellow-400/30'
                        : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700 opacity-80'
                    }`}
                  >
                    {offer.isPopular && (
                      <span className="absolute -top-3 right-3 bg-red-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase shadow">
                        MÁS VENDIDO (55% OFF)
                      </span>
                    )}

                    <p className="font-extrabold text-white text-sm sm:text-base leading-snug">
                      {offer.title}
                    </p>
                    <p className="text-xs text-neutral-400 my-1">
                      {offer.subtitle}
                    </p>

                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-2xl font-black text-yellow-400">
                        ${offer.price.toLocaleString('es-CO')}
                      </span>
                      <span className="text-xs text-neutral-500 line-through font-bold">
                        ${offer.regularPrice.toLocaleString('es-CO')}
                      </span>
                      <span className="text-[10px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded font-bold">
                        Ahorras ${offer.savings.toLocaleString('es-CO')}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 2: Shipping & Personal Data */}
            <div className="space-y-4">
              <label className="block text-sm font-extrabold text-yellow-400 uppercase tracking-wider mb-1 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-yellow-400 text-neutral-950 flex items-center justify-center text-xs font-black">2</span>
                <span>DATOS PARA LA ENTREGA Y COBRO:</span>
              </label>

              {/* Name & Phone Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Nombre y Apellidos Completos *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Juan Camilo Rodríguez"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full bg-neutral-950 border text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                      errors.fullName ? 'border-red-500' : 'border-neutral-800'
                    }`}
                  />
                  {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Número Celular (con WhatsApp) *</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="Ej: 300 123 4567 (WhatsApp activo)"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full bg-neutral-950 border text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                      errors.phone ? 'border-red-500' : 'border-neutral-800'
                    }`}
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* City Selection Dropdown List */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-neutral-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Ciudad de Entrega * (Selecciona de la lista)</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.city}
                    onChange={e => handleCitySelect(e.target.value)}
                    className={`w-full bg-neutral-950 border px-4 py-3 rounded-xl text-xs sm:text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition cursor-pointer appearance-none ${
                      errors.city ? 'border-red-500' : 'border-neutral-800'
                    }`}
                  >
                    <option value="" disabled className="bg-neutral-900 text-neutral-400">
                      -- Selecciona tu ciudad de entrega --
                    </option>
                    {ALLOWED_CITIES.map(c => (
                      <option key={c.city} value={c.city} className="bg-neutral-900 text-white font-medium py-2">
                        {c.city} ({c.department})
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-yellow-400">
                    ▼
                  </div>
                </div>
                {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
              </div>

              {/* Delivery Method Badge */}
              <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3 rounded-xl text-xs font-bold">
                <Home className="w-4 h-4 flex-shrink-0" />
                <span>Modalidad: Entrega a Domicilio en tu Dirección (Pagas en efectivo al recibir)</span>
              </div>

              {/* Address & Neighborhood */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1 flex items-center gap-1">
                    <Home className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Dirección de Entrega (Carrera, Calle, Casa, Apto) *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Cra 45 # 12 - 34 Apto 301"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    className={`w-full bg-neutral-950 border text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                      errors.address ? 'border-red-500' : 'border-neutral-800'
                    }`}
                  />
                  {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Barrio / Sector (Opcional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: El Poblado / Teusaquillo (Opcional)"
                    value={formData.neighborhood}
                    onChange={e => setFormData({ ...formData, neighborhood: e.target.value })}
                    className={`w-full bg-neutral-950 border text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                      errors.neighborhood ? 'border-red-500' : 'border-neutral-800'
                    }`}
                  />
                  {errors.neighborhood && <p className="text-red-400 text-xs mt-1">{errors.neighborhood}</p>}
                </div>
              </div>

            </div>

            {/* STEP 3: Payment Summary & Action */}
            <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between text-sm pb-3 border-b border-neutral-800">
                <span className="text-neutral-300 font-bold">Producto Seleccionado:</span>
                <span className="text-white font-black">{selectedOffer.title}</span>
              </div>

              <div className="flex items-center justify-between text-sm pb-3 border-b border-neutral-800">
                <span className="text-neutral-300 font-bold">Ciudad Destino:</span>
                <span className="text-yellow-400 font-bold">{formData.city} ({formData.department})</span>
              </div>

              <div className="flex items-center justify-between text-sm pb-3 border-b border-neutral-800">
                <span className="text-neutral-300 font-bold">Costo de Envío a Domicilio:</span>
                <span className="text-emerald-400 font-bold">GRATIS ($0 COP)</span>
              </div>

              <div className="flex items-center justify-between text-sm pb-3 border-b border-neutral-800">
                <span className="text-neutral-300 font-bold">Método de Pago:</span>
                <span className="text-yellow-400 font-bold bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/20">
                  💵 PAGO CONTRA ENTREGA (EN EFECTIVO)
                </span>
              </div>

              <div className="flex items-center justify-between text-lg sm:text-xl font-black pt-2">
                <span className="text-white">TOTAL A PAGAR AL RECIBIR:</span>
                <span className="text-yellow-400">${selectedOffer.price.toLocaleString('es-CO')} COP</span>
              </div>

              <button
                type="submit"
                id="submit-order-form-button"
                className="w-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 hover:from-emerald-400 hover:to-emerald-500 text-neutral-950 font-black py-4 px-6 rounded-2xl text-lg sm:text-xl shadow-2xl shadow-emerald-500/30 transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 cursor-pointer"
              >
                <Truck className="w-6 h-6" />
                <span>¡CONFIRMAR PEDIDO ($99.000 COP)!</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-neutral-400 text-center pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Garantía Venttix. Despachamos desde Bogotá con entrega a domicilio en 2 días hábiles.</span>
              </div>
            </div>

          </form>

        </div>

      </div>
    </section>
  );
};
