import { Review, PackageOffer } from '../types';
import personCarImg from '../assets/images/person_washing_car_action_1784754423862.jpg';
import personMotoImg from '../assets/images/person_washing_moto_action_1784754438888.jpg';
import kitFullImg from '../assets/images/kit_48v_components_1784754251831.jpg';
import nozzleCloseupImg from '../assets/images/nozzle_6in1_closeup_1784754219422.jpg';
import kitCaseImg from '../assets/images/kit_case_car_wash_1784754280323.jpg';

export const PRODUCT_IMAGES = [
  {
    id: 'person-car',
    url: personCarImg,
    title: 'Lavado de Carro en Acción con Presión 48V',
    subtitle: 'Remueve lodo, barro y suciedad en segundos sin necesidad de cables ni enchufes'
  },
  {
    id: 'person-moto',
    url: personMotoImg,
    title: 'Limpieza Eficiente de Motos y Fachadas',
    subtitle: 'Aplica champú en nieve y enjuaga con potencia directo desde un balde de agua'
  },
  {
    id: 'kit-full',
    url: kitFullImg,
    title: 'Kit Completo 48V Pro con Baterías',
    subtitle: 'Incluye 2 baterías recargables 48V, boquilla selector 6 en 1, filtro y cargador'
  },
  {
    id: 'nozzle-closeup',
    url: nozzleCloseupImg,
    title: 'Boquilla Selector Multiuso 6 en 1 Metálica',
    subtitle: 'Ajuste giratorio rápido para 0°, 15°, 25°, 40°, espuma y ducha'
  },
  {
    id: 'kit-case',
    url: kitCaseImg,
    title: 'Maletín Rígido de Transporte',
    subtitle: 'Lleva tu kit completo ordenado en el baúl para lavar donde quieras'
  }
];

export const KEY_BENEFITS = [
  {
    id: 'car-wash',
    title: 'Lava tu carro o moto como un profesional',
    description: 'Ahorra tiempo y dinero en autolavados con una presión hasta 50 veces superior a la de una manguera común, eliminando el barro pegado sin esfuerzo.',
    highlight: 'Hasta 50X más presión'
  },
  {
    id: 'nozzle',
    title: 'Versatilidad total con boquilla 6 en 1',
    description: 'Pasa de un chorro de impacto profundo para desincrustar suciedad difícil a un abanico de cobertura amplia para enjuagar fachadas, ventanas y patios en segundos.',
    highlight: '6 modos en 1 giro'
  },
  {
    id: 'batteries',
    title: 'Autonomía sin interrupciones',
    description: 'El kit incluye 2 baterías recargables de 48v, garantizando que termines de lavar hasta el último rincón sin preocuparte por cables estorbando o buscar enchufes.',
    highlight: '2 Baterías 48V Incluidas'
  },
  {
    id: 'compact',
    title: 'Diseño compacto para la ciudad',
    description: 'Potencia industrial en un formato ligero y fácil de guardar, ideal para quienes buscan eficiencia en apartamentos, garajes o casas urbanas con espacio limitado.',
    highlight: '100% Inalámbrica y Ligera'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Juan Camilo R.',
    city: 'Bogotá',
    rating: 5,
    date: 'Hace 2 días',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    comment: 'La verdad estaba un poco incrédulo porque es inalámbrica, pero esa maquinita tiene una fuerza ni la berraca. Lavé la camioneta que estaba llena de barro del fin de semana y quedó impecable. Lo mejor es que con las dos baterías me alcanzó de sobra y me sobró carga. ¡Muy recomendada!'
  },
  {
    id: 'rev-2',
    name: 'Marta Lucía G.',
    city: 'Cali',
    rating: 5,
    date: 'Hace 4 días',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    comment: 'Me encantó para lavar el patio y la fachada de la casa que estaban bien descuidados. Es súper liviana y la boquilla que trae es muy práctica para no estar cambiando de piezas a cada rato. El pedido me llegó súper rápido aquí a Cali, todo bien empacado. ¡Excelente servicio!'
  },
  {
    id: 'rev-3',
    name: 'Andrés Felipe M.',
    city: 'Medellín',
    rating: 5,
    date: 'Ayer',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    comment: 'Pura calidad. La uso para la moto y me ahorra un montón de plata en lavaderos. El chorro en línea recta saca la grasa del motor de una. La recogí en la oficina de Inter Rapidísimo sin líos. Cumple con todo lo que prometen, la potencia es muy buena para el tamaño que tiene.'
  }
];

export const PACKAGE_OFFERS: PackageOffer[] = [
  {
    id: 'kit-1',
    title: '1x Kit Hidrolavadora 48V Pro (Negra)',
    subtitle: 'Incluye 2 baterías de 48V + Boquilla 6 en 1 + Envío Gratis',
    price: 99000,
    regularPrice: 220000,
    discountPercentage: 55,
    isPopular: true,
    savings: 121000
  },
  {
    id: 'kit-2',
    title: '2x Kits Hidrolavadoras 48V (Super Combo Familiar)',
    subtitle: 'Lleva 2 Kits completos con 4 baterías en total + Boquillas',
    price: 179000,
    regularPrice: 440000,
    discountPercentage: 59,
    isPopular: false,
    savings: 261000
  }
];

export const SPRAY_MODES = [
  {
    angle: '0°',
    name: 'Línea Recta Concentrada',
    purpose: 'Impacto profundo para desincrustar barro seco, grasa de motor y manchas difíciles en concreto.',
    iconName: 'Zap',
    color: 'bg-red-600 text-white'
  },
  {
    angle: '15°',
    name: 'Chorro de Alta Presión',
    purpose: 'Remoción rápida de suciedad persistente en rines, chasís de carros y calzadas.',
    iconName: 'Flame',
    color: 'bg-orange-500 text-white'
  },
  {
    angle: '25°',
    name: 'Chorro Abanico Medio',
    purpose: 'Limpieza general de superficies, carrocería de vehículos y muebles de exterior.',
    iconName: 'Waves',
    color: 'bg-emerald-600 text-white'
  },
  {
    angle: '40°',
    name: 'Abanico Amplio Suave',
    purpose: 'Enjuague rápido de fachadas, ventanas, pisos y riego de plantas.',
    iconName: 'Wind',
    color: 'bg-blue-600 text-white'
  },
  {
    angle: 'Espuma',
    name: 'Depósito de Jabón / Nieve',
    purpose: 'Aplica shampoo con efecto nieve densa para aflojar la mugre del vehículo antes del aclarado.',
    iconName: 'Sparkles',
    color: 'bg-purple-600 text-white'
  },
  {
    angle: 'Ducha',
    name: 'Riego / Aclarado Suave',
    purpose: 'Ideal para mascotas, baldes y enjuague final sin presión brusca.',
    iconName: 'Droplets',
    color: 'bg-cyan-600 text-white'
  }
];

export const INCLUDED_ITEMS = [
  { name: 'Pistola Hidrolavadora 48V (Color Negro Matte)', icon: 'ShieldCheck', qty: '1 Unidad' },
  { name: 'Baterías Recargables de Litio Alto Rendimiento (48V)', icon: 'BatteryCharging', qty: '2 Unidades' },
  { name: 'Boquilla Selector Multiuso 6 en 1', icon: 'Settings2', qty: '1 Unidad' },
  { name: 'Frasco de Espuma / Dispensador de Detergente', icon: 'Sparkles', qty: '1 Unidad' },
  { name: 'Manguera Reforzada de 5 metros', icon: 'Pipette', qty: '1 Unidad' },
  { name: 'Filtro de Agua Anti-Impurezas para Baldes', icon: 'Filter', qty: '1 Unidad' },
  { name: 'Cargador Rápido de Pared Inteligente', icon: 'Plug', qty: '1 Unidad' },
  { name: 'Estuche / Maletín de Transporte de Uso Rudo', icon: 'Briefcase', qty: '1 Unidad' }
];

export const FAQ_ITEMS = [
  {
    question: '¿De dónde debo tomar el agua si no tengo manguera fija?',
    answer: '¡Esa es su mayor ventaja! Puedes sumergir el filtro en cualquier balde, caneca, alberca o contenedor de agua. La hidrolavadora auto-aspira el agua con total potencia sin necesidad de grifos o grifos a presión.'
  },
  {
    question: '¿Cuánto dura la carga de las baterías?',
    answer: 'Cada batería de 48V rinde aproximadamente entre 30 y 45 minutos de uso continuo. Al incluir 2 BATERÍAS RECARGABLES, cuentas con hasta 90 minutos de autonomía combinada, más que suficiente para lavar 2 carros o 3 motos completas.'
  },
  {
    question: '¿Cómo funciona el Pago Contra Entrega en Colombia?',
    answer: 'Es 100% seguro y garantizado. Llenas tu formulario con tus datos de envío en esta página. Nosotros despachamos desde nuestra bodega central en Bogotá y cuando el repartidor llegue a tu casa u oficina en Bogotá, Medellín, Bello, Itagüí, Sabaneta o Cali, le entregas el dinero en efectivo.'
  },
  {
    question: '¿Cuánto tarda en llegar mi pedido desde Bogotá?',
    answer: 'El tiempo de entrega es de exactamente 2 días hábiles a tu dirección en Bogotá, Medellín, Bello, Itagüí, Sabaneta y Cali con pago contra entrega.'
  },
  {
    question: '¿Tienen garantía los productos?',
    answer: 'Sí, contamos con garantía de 6 meses por defectos de fábrica con atención directa desde Bogotá y soporte posventa permanente.'
  }
];
