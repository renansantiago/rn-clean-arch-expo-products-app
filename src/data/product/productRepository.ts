import { Product } from "@domain/product/Product";
import { api } from "../apiConfig";
import { ProductsResponse } from "@data/product/ProductsResponse";
import { Sort } from "@domain/product/Filter";

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<ProductsResponse>("/");
  return response.data.products;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get<Product>(`/${id}`);
  return response.data;
};

export const getSortOptions = (): Sort[] => {
  const options = [
    { label: "None", value: "none" },
    { label: "Price: Low to High", value: "price-low-high" },
    { label: "Price: High to Low", value: "price-high-low" },
    { label: "Rating: High to Low", value: "rating-high-low" },
    { label: "Rating: Low to High", value: "rating-low-high" },
  ];
  return options;
};
