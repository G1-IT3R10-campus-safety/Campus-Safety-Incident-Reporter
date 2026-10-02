import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// ==========================================
// Reusable Component: CategoryPicker (CategorySelector)
// Course: IT3R10 • Group 1 (Campus Safety Incident Reporter)
// Assigned Member: Richmarie Porras
// Requirement: Receives Props (selectedCategory, onSelectCategory)
// Palette: Slate Blue (#415A77) & Soft Slate (#778DA9)
// ==========================================
export default function CategoryPicker({ selectedCategory, onSelectCategory }) {
  const categories = ['Security', 'Hazard', 'Medical', 'Facility'];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>INCIDENT CATEGORY</Text>
      <View style={styles.buttonRow}>
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                isSelected && styles.selectedButton,
              ]}
              onPress={() => onSelectCategory && onSelectCategory(category)}
            >
              <Text
                style={[
                  styles.buttonText,
                  isSelected && styles.selectedText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#415A77',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    backgroundColor: '#EFF3F6',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D5DFE9',
  },
  selectedButton: {
    backgroundColor: '#415A77',
    borderColor: '#415A77',
  },
  buttonText: {
    fontSize: 12,
    color: '#415A77',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  selectedText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});