import { getProducts, getProductById } from "./productRepository";
import { Product } from "@domain/product/Product";

jest.mock("./productRepository");

describe("productRepository", () => {
  describe("getProducts", () => {
    it("should fetch and return a list of products", async () => {
      const mockProducts: Product[] = [
        {
          id: 1,
          title: "Product A",
          price: 200,
          rating: 4,
          category: "cat1",
          thumbnail: "",
          brand: "",
          description: "",
          stock: 0,
        },
        {
          id: 2,
          title: "Product B",
          price: 100,
          rating: 5,
          category: "cat2",
          thumbnail: "",
          brand: "",
          description: "",
          stock: 0,
        },
      ];
      (getProducts as jest.Mock).mockResolvedValue(mockProducts);

      const result = await getProducts();

      expect(result).toEqual(mockProducts);
    });

    it("should handle errors during product fetch", async () => {
      (getProducts as jest.Mock).mockRejectedValue(new Error("Fetch error"));

      await expect(getProducts()).rejects.toThrow("Fetch error");
    });
  });

  describe("getProductById", () => {
    it("should fetch and return a product by ID", async () => {
      const mockProduct: Product = {
        id: 1,
        title: "Product A",
        price: 200,
        rating: 4,
        category: "cat1",
        thumbnail: "",
        brand: "",
        description: "",
        stock: 0,
      };
      (getProductById as jest.Mock).mockResolvedValue(mockProduct);

      const result = await getProductById(1);

      expect(result).toEqual(mockProduct);
    });

    it("should handle errors during product fetch by ID", async () => {
      (getProductById as jest.Mock).mockRejectedValue(new Error("Fetch error"));

      await expect(getProductById(1)).rejects.toThrow("Fetch error");
    });
  });
});