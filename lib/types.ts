export type UserRole = "ADMIN" | "USER";

export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  slug: string;
  sizes: string[];
  description: string;
  specs: Record<string, string | undefined>;
}

export interface Collection {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export type PaymentMethod = "COD" | "SAFEPAY";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED";

export interface CheckoutItem {
  productId: string;
  name: string;
  unitPrice: number;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  address: string;
  city: string;
  postalCode: string;
  items: CheckoutItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentReference?: string;
  createdAt: string;
}
