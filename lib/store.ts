import { COLLECTIONS, PRODUCTS } from "@/lib/data";
import { AppUser, CheckoutItem, Collection, Order, Product, TrackingEvent, UserRole, AdminNotification, FulfillmentStatus } from "@/lib/types";

const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase() ?? "admin@smartnest.com";
const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";
const userPassword = process.env.USER_PASSWORD ?? "user123";
const userEmails = (process.env.USER_EMAILS ?? "user@smartnest.com")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

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

const globalStore = globalThis as unknown as {
  smartNestStore?: {
    products?: Product[];
    collections?: Collection[];
    users?: AppUser[];
    orders?: Order[];
    notifications?: AdminNotification[];
  };
};

const createTrackingEvent = (status: FulfillmentStatus, note: string): TrackingEvent => ({
  id: crypto.randomUUID(),
  status,
  note,
  createdAt: new Date().toISOString(),
});

const getStore = () => {
  const current = globalStore.smartNestStore;

  if (!current) {
    globalStore.smartNestStore = {
      products: PRODUCTS.map((product) => ({ ...product })),
      collections: COLLECTIONS.map((collection) => ({ ...collection })),
      users: [...seedUsers],
      orders: [],
      notifications: [],
    };
  } else {
    current.products ??= PRODUCTS.map((product) => ({ ...product }));
    current.collections ??= COLLECTIONS.map((collection) => ({ ...collection }));
    current.users ??= [...seedUsers];
    current.orders ??= [];
    current.notifications ??= [];
  }

  return globalStore.smartNestStore as {
    products: Product[];
    collections: Collection[];
    users: AppUser[];
    orders: Order[];
    notifications: AdminNotification[];
  };
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

  getOrders: () => [...getStore().orders],
  getOrderById: (id: string) => getStore().orders.find((item) => item.id === id) ?? null,
  createOrder: (payload: Omit<Order, "id" | "createdAt" | "trackingEvents" | "fulfillmentStatus">) => {
    const order: Order = {
      ...payload,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      fulfillmentStatus: "PLACED",
      trackingEvents: [createTrackingEvent("PLACED", "Order placed successfully.")],
    };

    getStore().orders.unshift(order);
    getStore().notifications.unshift({
      id: crypto.randomUUID(),
      orderId: order.id,
      message: `New order placed by ${order.customerName} (${order.paymentMethod})`,
      createdAt: new Date().toISOString(),
      read: false,
    });
    return order;
  },
  updateOrder: (id: string, payload: Partial<Order>) => {
    const orders = getStore().orders;
    const index = orders.findIndex((item) => item.id === id);
    if (index === -1) return null;

    const current = orders[index];
    const nextStatus = payload.fulfillmentStatus;
    const trackingEvents = [...current.trackingEvents];

    if (nextStatus && nextStatus !== current.fulfillmentStatus) {
      trackingEvents.unshift(createTrackingEvent(nextStatus, `Status changed to ${nextStatus}.`));
    }

    orders[index] = { ...current, ...payload, trackingEvents, id: current.id };
    return orders[index];
  },

  getNotifications: () => [...getStore().notifications],
  markNotificationRead: (id: string) => {
    const notifications = getStore().notifications;
    const index = notifications.findIndex((item) => item.id === id);
    if (index === -1) return null;
    notifications[index] = { ...notifications[index], read: true };
    return notifications[index];
  },

  getCheckoutItemsFromCart: (cartItems: { productId: string; quantity: number }[]) => {
    const items: CheckoutItem[] = [];
    for (const entry of cartItems) {
      const product = getStore().products.find((item) => item.id === entry.productId)
        ?? getStore().products.find((item) => entry.productId.startsWith(`${item.id}-`));
      if (!product) continue;
      items.push({
        productId: product.id,
        name: product.name,
        unitPrice: product.price,
        quantity: Math.max(1, entry.quantity),
      });
    }
    return items;
  },
};
