import React, { createContext, useContext, useState, useEffect } from "react";
import { getCategories } from "../data/category/categoryRepository";
import { Category } from "@domain/category/Category";

interface ProductContextProps {
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category | null) => void;
  categories: Category[];
}

const ProductContext = createContext<ProductContextProps | undefined>(
  undefined
);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const data = await getCategories();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  return (
    <ProductContext.Provider
      value={{ selectedCategory, setSelectedCategory, categories }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error("useProductContext must be used within a ProductProvider");
  return context;
};
