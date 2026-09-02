import React, { useState, useEffect, useMemo } from 'react';
import { 
  getWebhookUrl, 
  saveWebhookUrl, 
  getSavedOrders, 
  sendOrderToWebhook, 
  clearSavedOrders, 
  exportOrdersCSV, 
  GOOGLE_APPS_SCRIPT_TEMPLATE 
} from '../lib/webhookService';
import { SavedOrder } from '../types';
import { 
  X, 
  Table, 
  Link2, 
  Send, 
  Download, 
  Trash2, 
  Check, 
  Copy, 
  Code, 
  Sparkles, 
  FileSpreadsheet,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Search,
  ChevronDown,
  ChevronUp,
  Clock,
  DollarSign,
  Filter,
  Layers
} from 'lucide-react';

interface WebhookManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GroupedDayOrders {
  dateKey: string; // YYYY-MM-DD
  dateFormatted: string; // "Jueves, 23 de Julio de 2026"
  shortDate: string; // "23/07/2026"
  isToday: boolean;
  orders: SavedOrder[];
  dayTotal: number;
}

// Helper to parse date strings into day groups safely
const parseOrderDate = (createdAtStr?: string) => {
  let dateObj = new Date();
  if (createdAtStr) {
    // Try standard JS Date parse
    const parsed = new Date(createdAtStr);
    if (!isNaN(parsed.getTime())) {
      dateObj = parsed;
    } else {
      // Try parsing DD/MM/YYYY or D/M/YYYY formats from es-CO toLocaleString
      const parts = createdAtStr.split(',')[0].split('/');
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
          dateObj = new Date(year, month, day);
        }
      }
    }
  }

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const dateKey = `${year}-${month}-${day}`;

  const todayStr = new Date();
  const isToday = 
    todayStr.getFullYear() === dateObj.getFullYear() &&
    todayStr.getMonth() === dateObj.getMonth() &&
    todayStr.getDate() === dateObj.getDate();

  // Capitalize first letter of formatted day
  const formattedRaw = dateObj.toLocaleDateString('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const dateFormatted = formattedRaw.charAt(0).toUpperCase() + formattedRaw.slice(1);
  const shortDate = dateObj.toLocaleDateString('es-CO');

  let timeFormatted = '';
  if (createdAtStr && createdAtStr.includes(',')) {
    timeFormatted = createdAtStr.split(',')[1]?.trim() || '';
  } else {
    timeFormatted = dateObj.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
  }

  return { dateKey, dateFormatted, shortDate, isToday, timeFormatted, dateObj };
};

export const WebhookManagerModal: React.FC<WebhookManagerModalProps> = ({ isOpen, onClose }) => {
  const [webhookUrl, setWebhookUrlInput] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'webhook' | 'script'>('orders');
  const [orders, setOrders] = useState<SavedOrder[]>([]);
  const [testStatus, setTestStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [copiedScript, setCopiedScript] = useState(false);
  const [savedSuccessMsg, setSavedSuccessMsg] = useState(false);

  // Filtering & Grouping States
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [collapsedDays, setCollapsedDays] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (isOpen) {
      setWebhookUrlInput(getWebhookUrl());
      setOrders(getSavedOrders());
    }
  }, [isOpen]);

  // Group orders by day & calculate statistics
  const groupedOrders = useMemo<GroupedDayOrders[]>(() => {
    const groupsMap: Record<string, GroupedDayOrders> = {};

    orders.forEach((order) => {
      const { dateKey, dateFormatted, shortDate, isToday } = parseOrderDate(order.createdAt);

      if (!groupsMap[dateKey]) {
        groupsMap[dateKey] = {
          dateKey,
          dateFormatted,
          shortDate,
          isToday,
          orders: [],
          dayTotal: 0
        };
      }

      groupsMap[dateKey].orders.push(order);
      groupsMap[dateKey].dayTotal += order.totalAmount || 0;
    });

    // Sort dates descending (newest day first)
    return Object.values(groupsMap).sort((a, b) => b.dateKey.localeCompare(a.dateKey));
  }, [orders]);

  // Filtered orders based on selected date & search term
  const filteredGroupedOrders = useMemo(() => {
    let list = groupedOrders;

    if (selectedDateFilter !== 'all') {
      list = list.filter(g => g.dateKey === selectedDateFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list
        .map(group => ({
          ...group,
          orders: group.orders.filter(
            o =>
              o.orderId.toLowerCase().includes(q) ||
              o.fullName.toLowerCase().includes(q) ||
              o.phone.includes(q) ||
              o.city.toLowerCase().includes(q) ||
              o.address.toLowerCase().includes(q)
          )
        }))
        .filter(group => group.orders.length > 0);
    }

    return list;
  }, [groupedOrders, selectedDateFilter, searchQuery]);

  // Overall statistics
  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  }, [orders]);

  if (!isOpen) return null;

  const handleSaveWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    saveWebhookUrl(webhookUrl);
    setSavedSuccessMsg(true);
    setTimeout(() => setSavedSuccessMsg(false), 2500);
  };

  const handleTestWebhook = async () => {
    if (!webhookUrl) return;
    setTestStatus('sending');

    const mockOrder: SavedOrder = {
      orderId: 'TEST-' + Math.floor(1000 + Math.random() * 9000),
      createdAt: new Date().toLocaleString('es-CO'),
      fullName: 'Juan Perez (Prueba Webhook)',
      phone: '3001234567',
      department: 'Bogotá D.C.',
      city: 'Bogotá',
      address: 'Calle 100 # 15 - 20',
      neighborhood: 'Chico Norte',
      deliveryMethod: 'coordinadora',
      quantity: 1,
      paymentMethod: 'contraentrega',
      totalAmount: 99000,
      notes: 'Prueba de envío automático a Google Sheets'
    };

    const success = await sendOrderToWebhook(mockOrder, webhookUrl);
    if (success) {
      setTestStatus('success');
      setOrders(getSavedOrders());
    } else {
      setTestStatus('error');
    }

    setTimeout(() => setTestStatus('idle'), 4000);
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_TEMPLATE);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const handleClearOrders = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar el historial local de pedidos?')) {
      clearSavedOrders();
      setOrders([]);
    }
  };

  const toggleDayCollapse = (dateKey: string) => {
    setCollapsedDays(prev => ({
      ...prev,
      [dateKey]: !prev[dateKey]
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-neutral-900 border-2 border-emerald-500/50 rounded-3xl max-w-5xl w-full p-4 sm:p-7 shadow-2xl relative text-white my-6 max-h-[92vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1.5 rounded-full hover:bg-neutral-800 transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-neutral-800 shrink-0">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-2xl font-black text-white flex items-center gap-2">
              Gestión de Pedidos & Google Sheets
            </h2>
            <p className="text-xs text-neutral-400">
              Organizado por Días y Fechas • Sincronización automática a Google Sheets en tiempo real.
            </p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap gap-2 my-4 border-b border-neutral-800 pb-3 shrink-0">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-emerald-500 text-neutral-950 font-black shadow-md'
                : 'bg-neutral-800/80 text-neutral-300 hover:bg-neutral-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Pedidos por Día ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('webhook')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              activeTab === 'webhook'
                ? 'bg-emerald-500 text-neutral-950 font-black shadow-md'
                : 'bg-neutral-800/80 text-neutral-300 hover:bg-neutral-800'
            }`}
          >
            <Link2 className="w-4 h-4" />
            <span>Configurar Webhook URL</span>
            {webhookUrl && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>}
          </button>

          <button
            onClick={() => setActiveTab('script')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              activeTab === 'script'
                ? 'bg-emerald-500 text-neutral-950 font-black shadow-md'
                : 'bg-neutral-800/80 text-neutral-300 hover:bg-neutral-800'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Script Google Sheets</span>
          </button>
        </div>

        {/* TAB 1: ORDERS LIST GROUPED BY DAY & DATE */}
        {activeTab === 'orders' && (
          <div className="space-y-4 overflow-y-auto pr-1 flex-1">
            
            {/* Top Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-neutral-950 p-3 rounded-2xl border border-neutral-800">
                <span className="text-[11px] font-bold text-neutral-400 block">Total Pedidos</span>
                <span className="text-lg sm:text-xl font-black text-yellow-400">{orders.length}</span>
              </div>

              <div className="bg-neutral-950 p-3 rounded-2xl border border-neutral-800">
                <span className="text-[11px] font-bold text-neutral-400 block">Ventas Totales</span>
                <span className="text-lg sm:text-xl font-black text-emerald-400">
                  ${totalRevenue.toLocaleString('es-CO')} COP
                </span>
              </div>

              <div className="bg-neutral-950 p-3 rounded-2xl border border-neutral-800 col-span-2 sm:col-span-1">
                <span className="text-[11px] font-bold text-neutral-400 block">Días Registrados</span>
                <span className="text-lg sm:text-xl font-black text-white">{groupedOrders.length} días</span>
              </div>
            </div>

            {/* Filter & Action Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-neutral-950 p-3 rounded-2xl border border-neutral-800">
              
              {/* Date Selector Filter */}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <select
                  value={selectedDateFilter}
                  onChange={(e) => setSelectedDateFilter(e.target.value)}
                  className="bg-neutral-900 border border-neutral-700 text-white rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer"
                >
                  <option value="all">📅 Todos los Días ({orders.length} pedidos)</option>
                  {groupedOrders.map((g) => (
                    <option key={g.dateKey} value={g.dateKey}>
                      {g.isToday ? '⭐ HOY - ' : ''}{g.shortDate} ({g.orders.length} pedidos)
                    </option>
                  ))}
                </select>
              </div>

              {/* Search input */}
              <div className="relative flex-1 max-w-xs min-w-[180px]">
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Buscar cliente, ID, ciudad..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 text-white text-xs rounded-xl pl-8 pr-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setOrders(getSavedOrders())}
                  className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs px-2.5 py-1.5 rounded-xl font-bold flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Actualizar</span>
                </button>

                <button
                  onClick={exportOrdersCSV}
                  disabled={orders.length === 0}
                  className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-neutral-950 text-xs px-3 py-1.5 rounded-xl font-black flex items-center gap-1.5 shadow cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Exportar CSV</span>
                </button>

                {orders.length > 0 && (
                  <button
                    onClick={handleClearOrders}
                    title="Limpiar historial"
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs p-1.5 rounded-xl font-bold flex items-center justify-center cursor-pointer border border-red-500/30"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Empty State */}
            {filteredGroupedOrders.length === 0 ? (
              <div className="text-center py-12 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-3">
                <FileSpreadsheet className="w-12 h-12 text-neutral-600 mx-auto" />
                <p className="text-sm font-bold text-neutral-300">No se encontraron pedidos para esta fecha o búsqueda.</p>
                <p className="text-xs text-neutral-500 max-w-md mx-auto">
                  Si estás en modo prueba, completa el formulario de compra en la página principal para generar un pedido.
                </p>
              </div>
            ) : (
              /* Grouped List by Date */
              <div className="space-y-4">
                {filteredGroupedOrders.map((group) => {
                  const isCollapsed = collapsedDays[group.dateKey] || false;

                  return (
                    <div 
                      key={group.dateKey}
                      className="bg-neutral-950 rounded-2xl border border-neutral-800 overflow-hidden shadow-lg transition"
                    >
                      {/* Day Header Banner */}
                      <div 
                        onClick={() => toggleDayCollapse(group.dateKey)}
                        className="bg-neutral-900/90 p-3.5 sm:p-4 flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 cursor-pointer hover:bg-neutral-800/80 transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`p-2 rounded-xl border ${
                            group.isToday 
                              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' 
                              : 'bg-neutral-800 border-neutral-700 text-yellow-400'
                          }`}>
                            <Calendar className="w-4 h-4" />
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm sm:text-base font-black text-white">
                                {group.dateFormatted}
                              </h3>
                              {group.isToday && (
                                <span className="bg-emerald-500 text-neutral-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                                  HOY
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-neutral-400 font-medium">
                              {group.orders.length} {group.orders.length === 1 ? 'pedido recibido' : 'pedidos recibidos'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <span className="text-[10px] uppercase font-bold text-neutral-500 block">
                              Recaudo del Día
                            </span>
                            <span className="text-sm sm:text-base font-black text-emerald-400">
                              ${group.dayTotal.toLocaleString('es-CO')} COP
                            </span>
                          </div>

                          <button className="text-neutral-400 hover:text-white p-1">
                            {isCollapsed ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      {/* Orders Table for this Day */}
                      {!isCollapsed && (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs text-neutral-300">
                            <thead className="bg-neutral-900/50 text-neutral-400 uppercase font-bold border-b border-neutral-800/60 text-[10px]">
                              <tr>
                                <th className="p-3">Hora</th>
                                <th className="p-3">ID Pedido</th>
                                <th className="p-3">Cliente</th>
                                <th className="p-3">Teléfono</th>
                                <th className="p-3">Ciudad / Depto</th>
                                <th className="p-3">Dirección & Barrio</th>
                                <th className="p-3">Monto</th>
                                <th className="p-3 text-center">Webhook</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-800/60">
                              {group.orders.map((o, idx) => {
                                const { timeFormatted } = parseOrderDate(o.createdAt);

                                return (
                                  <tr key={idx} className="hover:bg-neutral-800/40 transition">
                                    <td className="p-3 font-mono text-neutral-400 whitespace-nowrap flex items-center gap-1.5">
                                      <Clock className="w-3 h-3 text-emerald-400 shrink-0" />
                                      <span>{timeFormatted || 'Reciente'}</span>
                                    </td>
                                    <td className="p-3 font-mono font-bold text-yellow-400 whitespace-nowrap">{o.orderId}</td>
                                    <td className="p-3 font-bold text-white whitespace-nowrap">{o.fullName}</td>
                                    <td className="p-3 text-emerald-400 font-mono whitespace-nowrap">{o.phone}</td>
                                    <td className="p-3 whitespace-nowrap">{o.city}, {o.department}</td>
                                    <td className="p-3 min-w-[180px]">{o.address} ({o.neighborhood})</td>
                                    <td className="p-3 font-black text-yellow-400 whitespace-nowrap">
                                      ${o.totalAmount.toLocaleString('es-CO')} COP
                                    </td>
                                    <td className="p-3 text-center whitespace-nowrap">
                                      {o.webhookSent ? (
                                        <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30 font-bold">
                                          <CheckCircle2 className="w-3 h-3" /> Enviado
                                        </span>
                                      ) : (
                                        <span className="inline-flex items-center gap-1 text-[10px] bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded-full">
                                          Local
                                        </span>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: WEBHOOK SETTINGS */}
        {activeTab === 'webhook' && (
          <div className="space-y-6 overflow-y-auto pr-1 flex-1">
            <form onSubmit={handleSaveWebhook} className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-2 flex items-center gap-1.5">
                  <Link2 className="w-4 h-4 text-emerald-400" />
                  <span>URL de Webhook (Google Apps Script / Zapier / Make.com)</span>
                </label>
                <input
                  type="url"
                  placeholder="Ej: https://script.google.com/macros/s/AKfycbx.../exec"
                  value={webhookUrl}
                  onChange={e => setWebhookUrlInput(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 text-white rounded-xl px-4 py-3 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <p className="text-[11px] text-neutral-400 mt-2">
                  Cada vez que un cliente confirme un pedido en la tienda, enviamos un evento HTTP POST automáticamente con todos sus datos de entrega.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer shadow-lg shadow-emerald-500/20"
                  >
                    <Check className="w-4 h-4" />
                    <span>Guardar Webhook URL</span>
                  </button>

                  {savedSuccessMsg && (
                    <span className="text-xs text-emerald-400 font-bold animate-fade-in flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Guardado correctamente
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleTestWebhook}
                  disabled={!webhookUrl || testStatus === 'sending'}
                  className="bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 cursor-pointer border border-neutral-700"
                >
                  {testStatus === 'sending' ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                      <span>Enviando prueba...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-yellow-400" />
                      <span>Enviar Pedido de Prueba</span>
                    </>
                  )}
                </button>
              </div>

              {testStatus === 'success' && (
                <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>¡Prueba enviada con éxito! Revisa tu hoja de Google Sheets.</span>
                </div>
              )}

              {testStatus === 'error' && (
                <div className="p-3 bg-red-500/20 border border-red-500/40 text-red-300 rounded-xl text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>No se pudo conectar con la URL. Verifica que diste acceso a "Cualquier persona" (Anyone) en Google Apps Script.</span>
                </div>
              )}
            </form>

            <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 space-y-2">
              <h4 className="text-xs font-bold uppercase text-yellow-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Estructura de los Datos Enviados por Día (JSON Payload)
              </h4>
              <pre className="bg-neutral-900 p-3 rounded-xl text-[11px] font-mono text-neutral-300 overflow-x-auto border border-neutral-800">
{`{
  "orderId": "ORD-682194",
  "fecha": "23/7/2026",
  "hora": "09:11:32 a. m.",
  "diaSemana": "Jueves",
  "nombreCompleto": "Carlos Andrés Rodríguez",
  "celular": "3009128844",
  "departamento": "Bogotá D.C.",
  "ciudad": "Bogotá",
  "direccion": "Cra 45 # 12 - 34 Apto 301",
  "barrio": "El Poblado",
  "montoTotal": "$99.000 COP",
  "metodoPago": "Pago Contraentrega (Efectivo)",
  "notas": ""
}`}
              </pre>
            </div>
          </div>
        )}

        {/* TAB 3: GOOGLE APPS SCRIPT TUTORIAL */}
        {activeTab === 'script' && (
          <div className="space-y-4 overflow-y-auto pr-1 flex-1">
            <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                  <Code className="w-4 h-4 text-emerald-400" />
                  Código de Google Apps Script para organizar pedidos por Día y Fecha
                </h3>
                <button
                  onClick={handleCopyScript}
                  className="bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs px-3 py-1.5 rounded-xl font-black flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  {copiedScript ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedScript ? '¡Copiado!' : 'Copiar Código'}</span>
                </button>
              </div>

              <pre className="bg-neutral-900 p-3.5 rounded-xl text-[11px] font-mono text-emerald-300 max-h-64 overflow-y-auto border border-neutral-800 leading-relaxed">
                {GOOGLE_APPS_SCRIPT_TEMPLATE}
              </pre>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                <span className="text-yellow-400 font-bold">Paso 1:</span>
                <p className="text-neutral-300 mt-1">Abre tu Google Sheet, ve a <strong>Extensiones &gt; Apps Script</strong> y pega el código.</p>
              </div>

              <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                <span className="text-yellow-400 font-bold">Paso 2:</span>
                <p className="text-neutral-300 mt-1">Haz clic en <strong>Implementar &gt; Nueva implementación &gt; Aplicación web</strong>.</p>
              </div>

              <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                <span className="text-yellow-400 font-bold">Paso 3:</span>
                <p className="text-neutral-300 mt-1">En acceso selecciona <strong>"Cualquier persona"</strong>, copia la URL y pégala en la pestaña Webhook.</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

