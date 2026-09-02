import React from 'react';
import { OrderFormData } from '../types';
import { CheckCircle2, Copy, Check, X } from 'lucide-react';

interface OrderConfirmationModalProps {
  orderData: (OrderFormData & { totalAmount: number; orderId: string }) | null;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  orderData,
  onClose
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!orderData) return null;

  const handleCopyOrder = () => {
    navigator.clipboard.writeText(orderData.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-neutral-900 border-2 border-yellow-400/50 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-white my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-full hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="text-center mb-6">
          <span className="text-xs font-black uppercase text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-full border border-yellow-400/20">
            ¡PEDIDO REGISTRADO EXITOSAMENTE!
          </span>
          <h2 className="text-2xl font-black text-white mt-2">
            ¡Gracias por tu compra, {orderData.fullName.split(' ')[0]}!
          </h2>
          <p className="text-xs text-neutral-300 mt-1">
            Tu solicitud ya entró a cola de despacho en nuestra bodega de <strong>Bogotá D.C.</strong> Entrega estimada en <strong>2 días hábiles</strong>.
          </p>
        </div>

        {/* Order Receipt Box */}
        <div className="bg-neutral-950 rounded-2xl p-4 border border-neutral-800 space-y-3 text-xs mb-6">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="text-neutral-400">Código de Rastreo Interno:</span>
            <div className="flex items-center gap-1.5 font-mono text-yellow-400 font-bold">
              <span>{orderData.orderId}</span>
              <button
                onClick={handleCopyOrder}
                className="text-neutral-400 hover:text-white p-1"
                title="Copiar código"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex justify-between border-b border-neutral-800 pb-2">
            <span className="text-neutral-400">Destino:</span>
            <span className="font-bold text-white text-right">
              {orderData.address}, {orderData.city}, {orderData.department}
            </span>
          </div>

          <div className="flex justify-between border-b border-neutral-800 pb-2">
            <span className="text-neutral-400">Transportadora:</span>
            <span className="font-bold text-emerald-400">
              Entrega a Domicilio
            </span>
          </div>

          <div className="flex justify-between items-center pt-1 font-black text-sm">
            <span className="text-neutral-200">Total a Pagar en Efectivo:</span>
            <span className="text-yellow-400 text-lg">
              ${orderData.totalAmount.toLocaleString('es-CO')} COP
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="space-y-3">
          <button
            onClick={onClose}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-neutral-950 font-black py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20 transition-all text-center cursor-pointer uppercase tracking-wider"
          >
            <CheckCircle2 className="w-5 h-5 text-neutral-950" />
            <span>ENTENDIDO, LISTO PARA RECIBIR</span>
          </button>
        </div>

      </div>
    </div>
  );
};
