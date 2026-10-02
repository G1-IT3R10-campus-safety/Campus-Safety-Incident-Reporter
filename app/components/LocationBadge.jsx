import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// ==========================================
// Reusable Component: LocationBadge (LocationDisplay)
// Course: IT3R10 • Group 1 (Campus Safety Incident Reporter)
// Assigned Member: Arwin Ambag
// Requirement: Receives Props (latitude, longitude, status, errorMsg)
// Demonstrates: Graceful fallback when permission is denied or loading
// Palette: Slate Blue (#415A77) & Soft Slate (#778DA9)
// ==========================================
export default function LocationBadge({ latitude, longitude, status, errorMsg }) {
  if (status === 'denied') {
    return (
      <View style={[styles.badge, styles.deniedBadge]}>
        <View style={styles.headerRow}>
          <Text style={styles.deniedTitle}>GPS ACCESS DISABLED</Text>
          <Text style={styles.deniedPill}>Permission Denied</Text>
        </View>
        <Text style={styles.subText}>
          {errorMsg || 'Please enable device location to attach precise campus coordinates.'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.badge}>
      <View style={styles.headerRow}>
        <Text style={styles.badgeTitle}>CAMPUS LOCATION TELEMETRY</Text>
        <View style={styles.activePillContainer}>
          <View style={styles.greenDot} />
          <Text style={styles.statusPill}>GPS Synchronized</Text>
        </View>
      </View>
      <Text style={styles.locationName}>IT & Engineering Complex • Main Perimeter</Text>
      {latitude && longitude ? (
        <Text style={styles.coordsText}>
          Coordinates: {latitude}° N, {longitude}° E
        </Text>
      ) : (
        <Text style={styles.subText}>Acquiring campus satellite coordinates...</Text>
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
    marginBottom: 4,
  },
  badgeTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#415A77',
    letterSpacing: 0.5,
  },
  activePillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  greenDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#10B981',
    marginRight: 4,
  },
  statusPill: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#10B981',
  },
  locationName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 2,
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
    fontSize: 10,
    fontWeight: 'bold',
    color: '#DC2626',
    letterSpacing: 0.5,
  },
  deniedPill: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#DC2626',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
});