import { COLLECTIONS, PRODUCTS } from "@/lib/data";

const categoryAliases: Record<string, string[]> = {
  lighting: ["lighting"],
  workspace: ["personal climate"],
  utility: ["portable power", "utility"],
};

export const getCollectionCategories = (slug: string) => {
  const normalized = slug.toLowerCase();
  return categoryAliases[normalized] ?? [normalized];
};

export const getProductsByCategory = (category?: string) => {
  if (!category || category === "all") return PRODUCTS;

  const categoryList = getCollectionCategories(category);
  return PRODUCTS.filter((product) =>
    categoryList.includes(product.category.toLowerCase()),
  );
};

export const searchProducts = (query?: string) => {
  if (!query) return PRODUCTS;
  const normalized = query.toLowerCase();

  return PRODUCTS.filter(
    (product) =>
      product.name.toLowerCase().includes(normalized) ||
      product.category.toLowerCase().includes(normalized) ||
      product.description.toLowerCase().includes(normalized),
  );
};

export const getDashboardStats = () => {
  const estimatedRevenue = PRODUCTS.reduce((total, product) => total + product.price, 0);

  return {
    totalProducts: PRODUCTS.length,
    totalCollections: COLLECTIONS.length,
    averagePrice: Number((estimatedRevenue / PRODUCTS.length).toFixed(2)),
    estimatedRevenue,
  };
};
