import { handleFetchProducts, addPurchaseReminder } from "./productUseCase";
import { getProducts } from "@data/product/productRepository";
import CalendarReminder from "@specs/CalendarReminder";
import { Category } from "@domain/category/Category";
import { Product } from "@domain/product/Product";

jest.mock("@data/product/productRepository");
jest.mock("@specs/CalendarReminder", () => ({
  addPurchaseReminder: jest.fn(),
}));

describe("productUseCase", () => {
  describe("handleFetchProducts", () => {
    it("should fetch and sort products by price low to high", async () => {
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
          category: "cat1",
          thumbnail: "",
          brand: "",
          description: "",
          stock: 0,
        },
      ];
      (getProducts as jest.Mock).mockResolvedValue(mockProducts);

      const result = await handleFetchProducts("price-low-high", null);

      expect(result).toEqual([
        {
          id: 2,
          title: "Product B",
          price: 100,
          rating: 5,
          category: "cat1",
          thumbnail: "",
          brand: "",
          description: "",
          stock: 0,
        },
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
      ]);
    });

    it("should filter products by category and sort by rating high to low", async () => {
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

      const selectedCategory: Category = {
        name: "Category 1",
        slug: "cat1",
        url: "",
      };

      const result = await handleFetchProducts(
        "rating-high-low",
        selectedCategory
      );

      expect(result).toEqual([
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
      ]);
    });

    it("should handle errors during product fetch", async () => {
      (getProducts as jest.Mock).mockRejectedValue(new Error("Fetch error"));

      await expect(handleFetchProducts("price-low-high", null)).rejects.toThrow(
        "Fetch error"
      );
    });
  });

  describe("addPurchaseReminder", () => {
    it("should add a purchase reminder with provided date", async () => {
      const mockEventId = { eventId: "123" };
      (CalendarReminder.addPurchaseReminder as jest.Mock).mockResolvedValue(
        mockEventId
      );

      const result = await addPurchaseReminder(
        "Title",
        "Notes",
        new Date("2023-12-25")
      );

      expect(result).toEqual(mockEventId);
      expect(CalendarReminder.addPurchaseReminder).toHaveBeenCalledWith(
        "Title",
        "Notes",
        Math.floor(new Date("2023-12-25").getTime() / 1000)
      );
    });

    it("should add a purchase reminder with default date", async () => {
      const mockEventId = { eventId: "123" };
      (CalendarReminder.addPurchaseReminder as jest.Mock).mockResolvedValue(
        mockEventId
      );

      const result = await addPurchaseReminder("Title", "Notes");

      const defaultDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      expect(result).toEqual(mockEventId);
      expect(CalendarReminder.addPurchaseReminder).toHaveBeenCalledWith(
        "Title",
        "Notes",
        Math.floor(defaultDate.getTime() / 1000)
      );
    });
  });
});
