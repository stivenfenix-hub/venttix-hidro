export interface OrderFormData {
  fullName: string;
  phone: string;
  department: string;
  city: string;
  address: string;
  neighborhood: string;
  deliveryMethod: 'coordinadora' | 'interrapidisimo';
  officePickupLocation?: string;
  quantity: number;
  paymentMethod: 'contraentrega';
  notes?: string;
}

export interface SavedOrder extends OrderFormData {
  orderId: string;
  totalAmount: number;
  createdAt: string;
  webhookSent?: boolean;
}

export interface Review {
  id: string;
  name: string;
  city: string;
  rating: number;
  date: string;
  verified: boolean;
  comment: string;
  avatar: string;
  userImage?: string;
}

export interface DepartmentCity {
  department: string;
  cities: string[];
}

export interface PackageOffer {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  regularPrice: number;
  discountPercentage: number;
  isPopular?: boolean;
  savings: number;
}
