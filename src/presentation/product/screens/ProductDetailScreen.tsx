import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { getProductById } from "../../../data/product/productRepository";
import { Product } from "@domain/product/Product";
import { addPurchaseReminder } from "@domain/product/productUseCase";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      setLoading(true);
      setError(null);

      try {
        const data = await getProductById(Number(id));
        setProduct(data);
      } catch (err) {
        setError("Failed to load product details.");
      }

      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  const handleAddReminder = async () => {
    try {
      const { eventId } = await addPurchaseReminder(
        product?.title ?? "",
        product?.description ?? ""
        // Date is optional; if omitted, defaults to current date + 7 days
      );
      Alert.alert("Success", `Reminder created! Event ID: ${eventId}`);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message || "Failed to create reminder");
      } else {
        Alert.alert("Error", "Failed to create reminder");
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6200ea" />
        <Text>Loading product details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!product) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.brand}>Brand: {product.brand}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.stock}>
        {product.stock > 0 ? "In Stock" : "Out of Stock"}
      </Text>
      <Text style={styles.description}>{product.description}</Text>
      <TouchableOpacity
        style={styles.reminderButton}
        onPress={handleAddReminder}
      >
        <Text style={styles.reminderButtonText}>Add Reminder</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  image: {
    width: "90%",
    height: 250,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  brand: {
    fontSize: 16,
    color: "#888",
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6200ea",
    marginBottom: 8,
  },
  stock: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
  },

  reminderButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#6200ea",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  reminderButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
