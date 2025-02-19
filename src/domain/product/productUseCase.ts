import { getProducts } from "@data/product/productRepository";
import { Category } from "@domain/category/Category";
import { Product } from "@domain/product/Product";

const applySorting = (data: Product[], option: string) => {
  switch (option) {
    case "price-low-high":
      return [...data].sort((a, b) => a.price - b.price);
    case "price-high-low":
      return [...data].sort((a, b) => b.price - a.price);
    case "rating-high-low":
      return [...data].sort((a, b) => b.rating - a.rating);
    case "rating-low-high":
      return [...data].sort((a, b) => a.rating - b.rating);
    default:
      return data;
  }
};

export const handleFetchProducts = async (
  sortOption: string,
  selectedCategory: Category | null
): Promise<Product[]> => {
  let productData: Product[] = [];
  try {
    const data = await getProducts();
    let filteredData = selectedCategory
      ? data.filter((p) => p.category === selectedCategory.slug)
      : data;

    productData = applySorting(filteredData, sortOption);
  } catch (error) {
    throw error;
  }
  return productData;
};
