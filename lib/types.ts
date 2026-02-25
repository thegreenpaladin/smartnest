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
