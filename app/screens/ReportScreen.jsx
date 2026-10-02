


import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CategoryPicker from '../components/CategoryPicker';
import { validateReport } from '../utils/validation';
import { saveReport } from '../services/storage';

// ==========================================
// Presentation Layer: Incident Report Form Screen (Final Sprint)
// Course: IT3R10 • Group 1 (Campus Safety Incident Reporter)
// Assigned Member: Richmarie Porras
// Demonstrates: Presentation Layer -> Business Layer -> Data Layer Architecture
// Palette: Slate Blue (#415A77) & Soft Slate (#778DA9)
// ==========================================
export default function ReportScreen({ onNavigate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Hazard');
  const [imageUri, setImageUri] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Photo Capture & Evidence Attachment Handler
  const handleCapturePhoto = async () => {
    try {
      // Request camera permission
      const cameraPerm = await ImagePicker.requestCameraPermissionsAsync();

      if (cameraPerm.status === 'granted') {
        const result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.7,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
          setImageUri(result.assets[0].uri);
          return;
        }
      }

      // Fallback: Launch gallery/file picker (for laptop web preview or if camera is skipped)
      const galleryResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      if (!galleryResult.canceled && galleryResult.assets && galleryResult.assets.length > 0) {
        setImageUri(galleryResult.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Camera Notice', 'Unable to access device camera. Please select an image.');
    }
  };

  // 2. Form Submission Handler (Architecture: Presentation -> Business -> Data)
  const handleSubmit = async () => {
    // Step A: Business Layer Validation (Junrey's validation)
    const validation = validateReport({ title, category, description });
    if (!validation.isValid) {
      Alert.alert('Validation Error', validation.error);
      return;
    }

    try {
      setIsSubmitting(true);

      // Step B: Data Layer Storage (Junrey's AsyncStorage)
      const newReportData = {
        title,
        category,
        description,
        location: 'Campus Grounds • IT Complex (8.4542° N, 124.6319° E)',
        imageUri: imageUri,
      };

      const result = await saveReport(newReportData);

      if (result.success) {
        Alert.alert(
          'Report Submitted',
          'Your incident report has been securely saved to campus storage.',
          [
            {
              text: 'View in History',
              onPress: () => {
                // Reset form fields
                setTitle('');
                setDescription('');
                setImageUri(null);
                setCategory('Hazard');
                if (onNavigate) onNavigate('history');
              },
            },
          ]
        );
      } else {
        Alert.alert('Storage Error', 'Could not save incident report. Please try again.');
      }
    } catch (error) {
      Alert.alert('Submission Error', error.message || 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.screenTitle}>FILE INCIDENT REPORT</Text>
      <Text style={styles.screenSubtitle}>Submit campus safety details for rapid responder dispatch.</Text>

      {/* Incident Title Input */}
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

      {/* CategoryPicker (CategorySelector Reusable Component) */}
      <CategoryPicker
        selectedCategory={category}
        onSelectCategory={setCategory}
      />

      {/* Incident Description Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>INCIDENT DESCRIPTION</Text>
        <TextInput
          style={[styles.textInput, styles.textArea]}
          placeholder="Describe the incident details, hazard severity, or exact spot..."
          placeholderTextColor="#94A3B8"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />
      </View>

      {/* Evidence Photo Attachment & Photo Preview Container */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>PHOTO EVIDENCE</Text>
        {imageUri ? (
          <View style={styles.previewContainer}>
            <Image source={{ uri: imageUri }} style={styles.previewImage} resizeMode="cover" />
            <TouchableOpacity
              style={styles.removePhotoButton}
              onPress={() => setImageUri(null)}
            >
              <Text style={styles.removePhotoText}>Remove Photo Evidence</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.photoBox} onPress={handleCapturePhoto}>
            <Text style={styles.photoBoxTitle}>Capture / Attach Photo Evidence</Text>
            <Text style={styles.photoBoxSubtitle}>Tap to take a picture with camera or upload image</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Submit Button (ReportButton) */}
      <TouchableOpacity
        style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        <Text style={styles.submitText}>
          {isSubmitting ? 'Submitting Report...' : 'Submit Incident Report'}
        </Text>
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
  previewContainer: {
    borderWidth: 1,
    borderColor: '#BAC7D5',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    padding: 8,
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: 180,
    borderRadius: 6,
  },
  removePhotoButton: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#FEF2F2',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  removePhotoText: {
    color: '#DC2626',
    fontSize: 11,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#415A77',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 30,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
