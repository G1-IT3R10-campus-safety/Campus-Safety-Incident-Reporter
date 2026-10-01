import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// ==========================================
// Reusable Component: LocationBadge
// Assigned Member: Arwin Ambag
// Requirement: Receives Props (latitude, longitude, status, errorMsg)
// Demonstrates: Graceful fallback when permission is denied or loading
// Palette: Slate Blue (#415A77) & Soft Slate (#778DA9)
// ==========================================
export default function LocationBadge({ latitude, longitude, status, errorMsg }) {
  if (status === 'denied') {
    return (
      <View style={[styles.badge, styles.deniedBadge]}>
        <Text style={styles.deniedTitle}>GPS Permission Denied</Text>
        <Text style={styles.subText}>{errorMsg || 'Please enable location services in device settings.'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.badge}>
      <View style={styles.headerRow}>
        <Text style={styles.badgeTitle}>CURRENT ZONE</Text>
        <Text style={styles.statusPill}>GPS Synchronized</Text>
      </View>
      <Text style={styles.locationName}>IT Building • Campus Gate 1</Text>
      {latitude && longitude ? (
        <Text style={styles.coordsText}>
          {latitude}° N, {longitude}° E
        </Text>
      ) : (
        <Text style={styles.subText}>Detecting campus coordinates...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#EFF3F6',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BAC7D5',
  },
  deniedBadge: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badgeTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#415A77',
    letterSpacing: 0.5,
  },
  statusPill: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#10B981',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  locationName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 4,
  },
  coordsText: {
    fontSize: 11,
    color: '#778DA9',
    marginTop: 2,
    fontFamily: 'monospace',
  },
  subText: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  deniedTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#DC2626',
  },
});