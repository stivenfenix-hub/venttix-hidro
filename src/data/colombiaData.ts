import { DepartmentCity } from '../types';

export interface MainCity {
  city: string;
  department: string;
}

export const ALLOWED_CITIES: MainCity[] = [
  { city: 'Medellín', department: 'Antioquia' },
  { city: 'Bogotá', department: 'Bogotá D.C.' },
  { city: 'Bello', department: 'Antioquia' },
  { city: 'Itagüí', department: 'Antioquia' },
  { city: 'Sabaneta', department: 'Antioquia' },
  { city: 'Cali', department: 'Valle del Cauca' }
];

export const COLOMBIA_DEPARTMENTS: DepartmentCity[] = [
  {
    department: 'Bogotá D.C.',
    cities: ['Bogotá']
  },
  {
    department: 'Antioquia',
    cities: ['Medellín', 'Bello', 'Itagüí', 'Sabaneta']
  },
  {
    department: 'Valle del Cauca',
    cities: ['Cali']
  }
];

export const INTER_RAPIDISIMO_OFFICES = [
  'Entrega a Domicilio en Dirección'
];

