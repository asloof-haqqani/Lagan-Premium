
export interface Booking {
  id: string;
  name: string;
  phone: string;
  from: string;
  to: string;
  date: string;
  bus: string;
  seats: number;
  selectedSeats?: string[];
  paymentStatus: 'Pending' | 'Confirmed' | 'Failed';
  totalCost: number;
  time?: string;
}

export enum TabType {
  CHECK = 'check',
  NEW = 'new'
}

export interface BusPrice {
  name: string;
  price: number;
}
