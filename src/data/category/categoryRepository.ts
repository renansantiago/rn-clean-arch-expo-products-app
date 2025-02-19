import { Category } from "@domain/category/Category";
import { api } from "../apiConfig";

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get("/categories");
  return response.data;
};
