import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import CategoryPicker from '../components/CategoryPicker';

// ==========================================
// Presentation Layer: Incident Report Form Screen
// Assigned Member: Richmarie Porras
// Demonstrates: Form Inputs, useState, and Component Communication
// Palette: Slate Blue (#415A77) & Soft Slate (#778DA9)
// ==========================================
export default function ReportScreen({ onNavigate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Security');

  const handleSubmit = () => {
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Please enter an incident title.');
      return;
    }
    Alert.alert('Report Ready', `Title: ${title}\nCategory: ${category}\nReady for Sprint 2 storage integration.`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.screenTitle}>FILE INCIDENT REPORT</Text>
      <Text style={styles.screenSubtitle}>Submit details for campus safety response.</Text>

      {/* Title Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>INCIDENT TITLE</Text>
        <TextInput
          style={styles.textInput}
          placeholder="e.g. Broken Water Pipe near Canteen"
          placeholderTextColor="#94A3B8"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      {/* CategoryPicker Reusable Component */}
      <CategoryPicker
        selectedCategory={category}
        onSelectCategory={setCategory}
      />

      {/* Description Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>DESCRIPTION</Text>
        <TextInput
          style={[styles.textInput, styles.textArea]}
          placeholder="Describe the incident details or hazard clearly..."
          placeholderTextColor="#94A3B8"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />
      </View>

      {/* Evidence Photo Container */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>EVIDENCE ATTACHMENT</Text>
        <TouchableOpacity style={styles.photoBox}>
          <Text style={styles.photoBoxTitle}>Attach / Capture Photo Evidence</Text>
          <Text style={styles.photoBoxSubtitle}>Camera module ready for Sprint 2</Text>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit Incident Report</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
  },
  screenTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#415A77',
    letterSpacing: 0.5,
  },
  screenSubtitle: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 14,
    marginTop: 2,
  },
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#415A77',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D5DFE9',
    borderRadius: 8,
    padding: 10,
    fontSize: 13,
    backgroundColor: '#FFFFFF',
    color: '#1E293B',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  photoBox: {
    borderWidth: 1,
    borderColor: '#BAC7D5',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#EFF3F6',
  },
  photoBoxTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#415A77',
  },
  photoBoxSubtitle: {
    fontSize: 10,
    color: '#778DA9',
    marginTop: 2,
  },
  submitButton: {
    backgroundColor: '#415A77',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 30,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});

