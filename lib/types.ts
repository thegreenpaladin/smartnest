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
