import { Stack } from "expo-router";
import { ProductProvider } from "../src/context/ProductContext";

export default function Layout() {
  return (
    <ProductProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Products" }} />
        <Stack.Screen
          name="product/[id]"
          options={{ title: "Product Details" }}
        />
      </Stack>
    </ProductProvider>
  );
}
