export enum PaymentStatus {
  PENDING = 'Pending',
  COMPLETED = 'Completed',
  FAILED = 'Failed',
  REFUNDED = 'Refunded'
}

export enum PaymentCategory {
  SERVICE = 'Service',
  PRODUCT = 'Product',
  SUBSCRIPTION = 'Subscription'
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  category: string;
  status: string;
  description: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}