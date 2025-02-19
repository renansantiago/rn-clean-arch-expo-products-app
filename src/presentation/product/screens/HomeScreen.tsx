import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Modal,
} from "react-native";
import { useProductContext } from "../../../context/ProductContext";
import { Product } from "@domain/product/Product";
import { handleFetchProducts } from "@domain/product/productUseCase";
import { Filter, Sort } from "@domain/product/Filter";
import ProductItem from "../ProductItem";
import { getSortOptions } from "@data/product/productRepository";
import FilterModal from "@components/FilterModal";
import { SortContent } from "../SortContent";

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedCategory, setSelectedCategory, categories } =
    useProductContext();
  const [sortOption, setSortOption] = useState<string>("none");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<Filter>("category");
  const sortOptions: Sort[] = getSortOptions();

  async function fetchProducts() {
    setLoading(true);
    setError(null);
    try {
      const filteredData = await handleFetchProducts(
        sortOption,
        selectedCategory
      );

      setProducts(filteredData);
    } catch (error) {
      setError("Failed to load products.");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortOption]);

  const resetFilters = () => {
    setSelectedCategory(null);
    setSortOption("none");
  };

  const openModal = (type: Filter) => {
    setModalType(type);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6200ea" />
        <Text>Loading products...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => openModal("category")}
        >
          <Text style={styles.filterButtonText}>
            Category: {selectedCategory?.name || "All"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => openModal("sort")}
        >
          <Text style={styles.filterButtonText}>
            Sort:{" "}
            {sortOption === "none" ? "Default" : sortOption.replace("-", " ")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.tryAgainButton}
            onPress={fetchProducts}
          >
            <Text style={styles.resetButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {products.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No products found.</Text>
            </View>
          ) : (
            <FlatList
              data={products}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              contentContainerStyle={styles.productList}
              renderItem={({ item }) => <ProductItem product={item} />}
            />
          )}
        </>
      )}

      <FilterModal
        visible={modalVisible}
        onClose={closeModal}
        title={modalType === "category" ? "Select Category" : "Sort By"}
        children={
          <SortContent
            type={modalType}
            categories={categories}
            sortOptions={sortOptions}
            setSelectedCategory={setSelectedCategory}
            setSortOption={setSortOption}
            closeModal={closeModal}
          />
        }
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
    marginHorizontal: 12,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginHorizontal: 5,
    backgroundColor: "#6200ea",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
  },
  filterButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  resetButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#FF3B30",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  resetButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
  },
  productList: {
    paddingBottom: 20,
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
  tryAgainButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "blue",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    marginTop: 20,
  },
});
