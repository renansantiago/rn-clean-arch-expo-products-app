import React from "react";
import { render } from "@testing-library/react-native";
import ProductItem from "./ProductItem";
import { Product } from "@domain/product/Product";

describe("ProductItem", () => {
  const mockProduct: Product = {
    id: 1,
    title: "Product A",
    price: 200,
    rating: 4,
    category: "cat1",
    thumbnail: "https://example.com/product-a.jpg",
    brand: "Brand A",
    description: "Description of Product A",
    stock: 10,
  };

  it("should render product details correctly", () => {
    const { getByText } = render(<ProductItem product={mockProduct} />);

    expect(getByText("Product A")).toBeTruthy();
    expect(getByText("Rating: 4.0")).toBeTruthy();
  });
});
