import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// ==========================================
// Reusable Component: IncidentCard
// Course: IT3R10 • Group 1 (Campus Safety Incident Reporter)
// Assigned Member: Kirklan Caberte
// Requirement: Receives Props (title, category, location, date, description, imageUri)
// Strictly: Reporter Mode (No Status)
// Palette: Slate Blue (#415A77) & Soft Slate (#778DA9)
// ==========================================
export default function IncidentCard({ title, category, location, date, description, imageUri }) {
  return (
    <View style={styles.card}>
      {/* Header Row: Title and Category Badge */}
      <View style={styles.headerRow}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
      </View>

      {/* Location Information */}
      <Text style={styles.location}>Location: {location}</Text>

      {/* Incident Description */}
      {description ? (
        <Text style={styles.description} numberOfLines={2}>{description}</Text>
      ) : null}

      {/* Photo Evidence Thumbnail (if image was captured by camera) */}
      {imageUri ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.cardImage} resizeMode="cover" />
          <Text style={styles.photoAttachedLabel}>Photo Evidence Attached</Text>
        </View>
      ) : null}

      {/* Footer Timestamp */}
      <View style={styles.footerRow}>
        <Text style={styles.dateLabel}>FILED ON</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#D5DFE9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
    flex: 1,
    marginRight: 8,
  },
  categoryBadge: {
    backgroundColor: '#EFF3F6',
    borderWidth: 1,
    borderColor: '#BAC7D5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#415A77',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  location: {
    fontSize: 12,
    color: '#475569',
    marginTop: 2,
    fontWeight: '500',
  },
  description: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 6,
    lineHeight: 16,
  },
  imageContainer: {
    marginTop: 8,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F1F5F9',
  },
  cardImage: {
    width: '100%',
    height: 140,
    borderRadius: 8,
  },
  photoAttachedLabel: {
    fontSize: 9,
    color: '#415A77',
    fontWeight: '700',
    paddingVertical: 3,
    paddingHorizontal: 6,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  dateLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
  date: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
});