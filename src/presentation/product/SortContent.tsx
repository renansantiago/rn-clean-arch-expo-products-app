import { Pressable, Text, StyleSheet } from "react-native";
import { Category } from "@domain/category/Category";
import { Filter, Sort } from "@domain/product/Filter";

interface SortContentProps {
  type: Filter;
  categories: Category[];
  sortOptions: Sort[];
  setSelectedCategory: (category: Category | null) => void;
  setSortOption: (option: string) => void;
  closeModal: () => void;
}

export const SortContent = ({
  type,
  categories,
  sortOptions,
  setSelectedCategory,
  setSortOption,
  closeModal,
}: SortContentProps) => {
  return (
    <>
      {type === "category"
        ? categories.map((category) => (
            <Pressable
              key={category?.slug}
              style={styles.modalOption}
              onPress={() => {
                setSelectedCategory(category);
                closeModal();
              }}
            >
              <Text style={styles.modalOptionText}>{category.name}</Text>
            </Pressable>
          ))
        : sortOptions.map((option) => (
            <Pressable
              key={option.value}
              style={styles.modalOption}
              onPress={() => {
                setSortOption(option.value);
                closeModal();
              }}
            >
              <Text style={styles.modalOptionText}>{option.label}</Text>
            </Pressable>
          ))}
    </>
  );
};

export default SortContent;

const styles = StyleSheet.create({
  modalOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  modalOptionText: {
    fontSize: 16,
    textAlign: "center",
  },
});
