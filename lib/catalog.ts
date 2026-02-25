import { COLLECTIONS } from "@/lib/data";
import { getProducts } from "@/lib/admin-store";

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
  const products = getProducts();
  if (!category || category === "all") return products;

  const categoryList = getCollectionCategories(category);
  return products.filter((product) =>
    categoryList.includes(product.category.toLowerCase()),
  );
};

export const searchProducts = (query?: string) => {
  const products = getProducts();
  if (!query) return products;
  const normalized = query.toLowerCase();

  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(normalized) ||
      product.category.toLowerCase().includes(normalized) ||
      product.description.toLowerCase().includes(normalized),
  );
};

export const getDashboardStats = () => {
  const products = getProducts();
  const estimatedRevenue = products.reduce((total, product) => total + product.price, 0);

  return {
    totalProducts: products.length,
    totalCollections: COLLECTIONS.length,
    averagePrice: Number((estimatedRevenue / Math.max(products.length, 1)).toFixed(2)),
    estimatedRevenue,
  };
};
