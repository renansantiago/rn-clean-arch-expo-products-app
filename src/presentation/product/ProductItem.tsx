import { Product } from "@domain/product/Product";
import { Link } from "expo-router";
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";

interface ProductItemProps {
  product: Product;
}

export const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link href={`/product/${product.id}`} asChild>
      <TouchableOpacity style={styles.productCard}>
        <Image source={{ uri: product.thumbnail }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <Text style={styles.rating}>Rating: {product.rating.toFixed(1)}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },

  info: {
    marginLeft: 12,
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
  },

  price: {
    fontSize: 14,
    color: "#6200ea",
    marginTop: 4,
  },

  rating: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
});
