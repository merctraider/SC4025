import type { Driver } from './types';

export const drivers: Driver[] = [
  { id: 'd1', name: 'Ahmad Rahman', car: 'Toyota Corolla Altis', plate: 'SMB 4821 K', rating: 4.9 },
  { id: 'd2', name: 'Tan Wei Ming', car: 'Honda Shuttle', plate: 'SKP 3307 G', rating: 4.8 },
  { id: 'd3', name: 'Priya Nair', car: 'Toyota Prius', plate: 'SNT 9152 D', rating: 4.95 },
  { id: 'd4', name: 'Lim Jun Hao', car: 'Hyundai Ioniq', plate: 'SLE 6604 B', rating: 4.85 },
];

export const DEFAULT_DRIVER_ID = 'd1';
