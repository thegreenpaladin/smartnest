import { PRODUCTS } from "@/lib/data";
import { Product } from "@/lib/types";

export interface ProductInput {
  name: string;
  category: string;
  price: number;
  description: string;
  image?: string;
}

const globalForStore = globalThis as unknown as {
  smartNestProducts?: Product[];
};

const initialProducts: Product[] = PRODUCTS.map((product) => ({
  ...product,
  specs: product.specs ?? {},
}));

const store = {
  get products() {
    if (!globalForStore.smartNestProducts) {
      globalForStore.smartNestProducts = [...initialProducts];
    }

    return globalForStore.smartNestProducts;
  },
};

export const getProducts = () => [...store.products];

export const getProductById = (id: string) =>
  store.products.find((product) => product.id === id) ?? null;

export const createProduct = (input: ProductInput) => {
  const id = crypto.randomUUID();
  const slug = input.name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  const newProduct: Product = {
    id,
    name: input.name,
    price: Number(input.price),
    images: [input.image || "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=800"],
    category: input.category,
    slug: `${slug}-${id.slice(0, 6)}`,
    sizes: ["Standard"],
    description: input.description,
    specs: {
      Material: "N/A",
      Warranty: "1 Year",
    },
  };

  store.products.unshift(newProduct);
  return newProduct;
};

export const updateProduct = (id: string, input: ProductInput) => {
  const productIndex = store.products.findIndex((product) => product.id === id);

  if (productIndex === -1) return null;

  const current = store.products[productIndex];

  const updated: Product = {
    ...current,
    name: input.name,
    category: input.category,
    price: Number(input.price),
    description: input.description,
    images: [input.image || current.images[0]],
  };

  store.products[productIndex] = updated;
  return updated;
};
