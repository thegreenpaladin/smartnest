import { COLLECTIONS, PRODUCTS } from "@/lib/data";
import { AppUser, Collection, Product, UserRole } from "@/lib/types";

const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase() ?? "admin@smartnest.com";
const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";
const userPassword = process.env.USER_PASSWORD ?? "user123";
const userEmails = (process.env.USER_EMAILS ?? "user@smartnest.com")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

const globalStore = globalThis as unknown as {
  smartNestStore?: {
    products: Product[];
    collections: Collection[];
    users: AppUser[];
  };
};

const seedUsers: AppUser[] = [
  { id: "admin-1", name: "Store Admin", email: adminEmail, password: adminPassword, role: "ADMIN" },
  ...userEmails.map((email, index) => ({
    id: `user-${index + 1}`,
    name: "SmartNest Customer",
    email,
    password: userPassword,
    role: "USER" as UserRole,
  })),
];

const getStore = () => {
  if (!globalStore.smartNestStore) {
    globalStore.smartNestStore = {
      products: PRODUCTS.map((product) => ({ ...product })),
      collections: COLLECTIONS.map((collection) => ({ ...collection })),
      users: seedUsers,
    };
  }
  return globalStore.smartNestStore;
};

export const store = {
  getProducts: () => [...getStore().products],
  getProductById: (id: string) => getStore().products.find((item) => item.id === id) ?? null,
  getProductBySlug: (slug: string) => getStore().products.find((item) => item.slug === slug) ?? null,
  createProduct: (payload: Omit<Product, "id" | "slug"> & { slug?: string }) => {
    const id = crypto.randomUUID();
    const baseSlug = (payload.slug || payload.name)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    const product: Product = { ...payload, id, slug: `${baseSlug}-${id.slice(0, 6)}` };
    getStore().products.unshift(product);
    return product;
  },
  updateProduct: (id: string, payload: Partial<Product>) => {
    const products = getStore().products;
    const index = products.findIndex((item) => item.id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...payload, id: products[index].id };
    return products[index];
  },
  deleteProduct: (id: string) => {
    const products = getStore().products;
    const index = products.findIndex((item) => item.id === id);
    if (index === -1) return false;
    products.splice(index, 1);
    return true;
  },

  getCollections: () => [...getStore().collections],
  getCollectionBySlug: (slug: string) => getStore().collections.find((item) => item.slug === slug) ?? null,
  createCollection: (payload: Omit<Collection, "id">) => {
    const collection: Collection = { ...payload, id: crypto.randomUUID() };
    getStore().collections.unshift(collection);
    return collection;
  },
  updateCollection: (slug: string, payload: Partial<Collection>) => {
    const collections = getStore().collections;
    const index = collections.findIndex((item) => item.slug === slug);
    if (index === -1) return null;
    collections[index] = { ...collections[index], ...payload, id: collections[index].id };
    return collections[index];
  },
  deleteCollection: (slug: string) => {
    const collections = getStore().collections;
    const index = collections.findIndex((item) => item.slug === slug);
    if (index === -1) return false;
    collections.splice(index, 1);
    return true;
  },

  getUsers: () => [...getStore().users],
  getUserById: (id: string) => getStore().users.find((item) => item.id === id) ?? null,
  getUserByEmail: (email: string) => getStore().users.find((item) => item.email.toLowerCase() === email.toLowerCase()) ?? null,
  createUser: (payload: Omit<AppUser, "id">) => {
    const user: AppUser = { ...payload, id: crypto.randomUUID() };
    getStore().users.unshift(user);
    return user;
  },
  updateUser: (id: string, payload: Partial<AppUser>) => {
    const users = getStore().users;
    const index = users.findIndex((item) => item.id === id);
    if (index === -1) return null;
    users[index] = { ...users[index], ...payload, id: users[index].id };
    return users[index];
  },
  deleteUser: (id: string) => {
    const users = getStore().users;
    const index = users.findIndex((item) => item.id === id);
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
  },
};
