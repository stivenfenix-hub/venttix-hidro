import { SavedOrder } from '../types';

const WEBHOOK_KEY = 'venttix_webhook_url';
const ORDERS_KEY = 'venttix_saved_orders';

export const getWebhookUrl = (): string => {
  return localStorage.getItem(WEBHOOK_KEY) || '';
};

export const saveWebhookUrl = (url: string): void => {
  localStorage.setItem(WEBHOOK_KEY, url.trim());
};

export const getSavedOrders = (): SavedOrder[] => {
  try {
    const data = localStorage.getItem(ORDERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error loading saved orders:', e);
    return [];
  }
};

export const sendOrderToWebhook = async (order: SavedOrder, webhookUrl?: string): Promise<boolean> => {
  const targetUrl = webhookUrl || getWebhookUrl();
  if (!targetUrl) return false;

  try {
    const rawDate = order.createdAt ? new Date(order.createdAt) : new Date();
    const isValidDate = !isNaN(rawDate.getTime());
    const now = isValidDate ? rawDate : new Date();

    const dateStr = now.toLocaleDateString('es-CO', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const timeStr = now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const dayName = now.toLocaleDateString('es-CO', { weekday: 'long' });
    const capitalizedDay = dayName.charAt(0).toUpperCase() + dayName.slice(1);

    const payload = {
      orderId: order.orderId,
      fecha: dateStr,
      hora: timeStr,
      diaSemana: capitalizedDay,
      fechaCompleta: order.createdAt || now.toLocaleString('es-CO'),
      nombreCompleto: order.fullName,
      celular: order.phone,
      departamento: order.department,
      ciudad: order.city,
      direccion: order.address,
      barrio: order.neighborhood,
      montoTotal: `$${order.totalAmount.toLocaleString('es-CO')} COP`,
      metodoPago: 'Pago Contraentrega (Efectivo)',
      notas: order.notes || ''
    };

    // Google Apps Script usually expects text/plain or no-cors to bypass browser CORS preflight
    await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    return true;
  } catch (error) {
    console.error('Error sending order to webhook:', error);
    return false;
  }
};

export const recordAndSyncOrder = async (orderData: SavedOrder): Promise<SavedOrder> => {
  const orders = getSavedOrders();
  let webhookSuccess = false;

  const webhookUrl = getWebhookUrl();
  if (webhookUrl) {
    webhookSuccess = await sendOrderToWebhook(orderData, webhookUrl);
  }

  const finalOrder: SavedOrder = {
    ...orderData,
    webhookSent: webhookSuccess
  };

  const updatedOrders = [finalOrder, ...orders];
  localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));

  return finalOrder;
};

export const clearSavedOrders = (): void => {
  localStorage.removeItem(ORDERS_KEY);
};

export const exportOrdersCSV = (): void => {
  const orders = getSavedOrders();
  if (orders.length === 0) return;

  const headers = ['ID Pedido', 'Fecha', 'Hora', 'Día Semana', 'Nombre Cliente', 'Teléfono', 'Ciudad', 'Departamento', 'Dirección', 'Barrio', 'Monto Total', 'Método Pago', 'Estado Webhook'];
  const rows = orders.map(o => {
    const rawDate = o.createdAt ? new Date(o.createdAt) : new Date();
    const isValidDate = !isNaN(rawDate.getTime());
    const d = isValidDate ? rawDate : new Date();

    const fecha = d.toLocaleDateString('es-CO');
    const hora = d.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
    const dayName = d.toLocaleDateString('es-CO', { weekday: 'long' });
    const diaSemana = dayName.charAt(0).toUpperCase() + dayName.slice(1);

    return [
      o.orderId,
      `"${fecha}"`,
      `"${hora}"`,
      `"${diaSemana}"`,
      `"${o.fullName.replace(/"/g, '""')}"`,
      `"${o.phone}"`,
      `"${o.city}"`,
      `"${o.department}"`,
      `"${o.address.replace(/"/g, '""')}"`,
      `"${o.neighborhood.replace(/"/g, '""')}"`,
      `"$${o.totalAmount.toLocaleString('es-CO')} COP"`,
      `"Pago Contraentrega"`,
      `"${o.webhookSent ? 'Sincronizado' : 'Local'}"`
    ];
  });

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `pedidos_organizados_venttix_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const GOOGLE_APPS_SCRIPT_TEMPLATE = `// INSTRUCCIONES PARA GOOGLE SHEETS (Organizado por Día y Fecha):
// 1. En tu hoja de Google Sheets, ve a: Extensiones -> Apps Script
// 2. Borra todo el código anterior y pega este código:

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Si la hoja está totalmente vacía, crea los encabezados organizados por fecha
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "ID Pedido", "Día", "Fecha", "Hora", "Nombre Completo", "Celular", 
        "Ciudad", "Departamento", "Dirección", "Barrio", 
        "Monto Total", "Método Pago", "Notas"
      ]);
      
      // Estilo elegante para encabezados
      var headerRange = sheet.getRange(1, 1, 1, 13);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#059669"); // Verde esmeralda Venttix
      headerRange.setFontColor("#ffffff");
      sheet.setFrozenRows(1);
    }
    
    // Obtener valores con fallbacks limpios
    var orderId = data.orderId || "";
    var diaSemana = data.diaSemana || "";
    var fecha = data.fecha || new Date().toLocaleDateString();
    var hora = data.hora || new Date().toLocaleTimeString();
    var nombre = data.nombreCompleto || "";
    var celular = data.celular || "";
    var ciudad = data.ciudad || "";
    var depto = data.departamento || "";
    var direccion = data.direccion || "";
    var barrio = data.barrio || "";
    var monto = data.montoTotal || "";
    var pago = data.metodoPago || "Pago Contraentrega";
    var notas = data.notas || "";

    // Agregar la fila con formato ordenado
    sheet.appendRow([
      orderId, diaSemana, fecha, hora, nombre, celular,
      ciudad, depto, direccion, barrio, monto, pago, notas
    ]);

    // Auto-ajustar ancho de columnas si es necesario
    sheet.autoResizeColumns(1, 13);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Pedido registrado exitosamente por fecha" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// 3. Haz clic en "Implementar" -> "Nueva implementación" -> "Aplicación Web"
// 4. En "Quién tiene acceso", selecciona: "Cualquier persona" (Anyone)
// 5. Copia la URL de la Web App resultante y pégala en Venttix!`;
