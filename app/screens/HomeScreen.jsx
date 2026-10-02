import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import IncidentCard from '../components/IncidentCard';

// ==========================================
// Presentation Layer: Dashboard Screen
// Assigned Member: Kirklan Caberte
// Demonstrates: Presentation Layer, Props passing, and Event Callbacks
// Course: IT3R10 • Group 1
// Palette: Slate Blue (#415A77) & Soft Slate (#778DA9)
// ==========================================
export default function HomeScreen({ onNavigate }) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.welcomeBanner}>
        <Text style={styles.welcomeTitle}>CAMPUS OVERVIEW</Text>
        <Text style={styles.welcomeSubtitle}>Real-time safety telemetry & incident monitoring</Text>
      </View>

      {/* Quick Metrics */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>TOTAL REPORTS</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: '#DC2626' }]}>3</Text>
          <Text style={styles.statLabel}>ACTIVE HAZARDS</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: '#10B981' }]}>9</Text>
          <Text style={styles.statLabel}>RESOLVED</Text>
        </View>
      </View>

      {/* Action Banner */}
      <TouchableOpacity
        style={styles.actionBanner}
        onPress={() => onNavigate && onNavigate('report')}
      >
        <View>
          <Text style={styles.actionTitle}>Report an Incident Now</Text>
          <Text style={styles.actionSubtitle}>Notify campus safety & dispatch assistance</Text>
        </View>
        <View style={styles.actionButtonBadge}>
          <Text style={styles.actionBadgeText}>FILE REPORT</Text>
        </View>
      </TouchableOpacity>

      {/* Recent Incidents Feed */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>RECENT INCIDENTS</Text>
        <TouchableOpacity onPress={() => onNavigate && onNavigate('history')}>
          <Text style={styles.seeAllText}>VIEW ALL</Text>
        </TouchableOpacity>
      </View>

      <IncidentCard
        title="Broken Street Light"
        category="Hazard"
        location="Campus Gate 1 Pathway"
        date="Oct 1, 2026 • 8:30 AM"
        status="Investigating"
      />

      <IncidentCard
        title="Slippery Corridor Floor"
        category="Facility"
        location="2nd Floor IT Building"
        date="Oct 1, 2026 • 9:15 AM"
        status="Caution Sign Placed"
      />

      <IncidentCard
        title="Flickering Emergency Exit Sign"
        category="Security"
        location="3rd Floor Science Wing"
        date="Sep 30, 2026 • 4:10 PM"
        status="Resolved"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
  },
  welcomeBanner: {
    marginBottom: 12,
  },
  welcomeTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#415A77',
    letterSpacing: 0.5,
  },
  welcomeSubtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D5DFE9',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#415A77',
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#778DA9',
    marginTop: 2,
    letterSpacing: 0.5,
  },
  actionBanner: {
    backgroundColor: '#415A77',
    borderRadius: 10,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  actionTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  actionSubtitle: {
    color: '#D5DFE9',
    fontSize: 10,
    marginTop: 2,
  },
  actionButtonBadge: {
    backgroundColor: '#2F4257',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#526F8F',
  },
  actionBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#415A77',
    letterSpacing: 0.5,
  },
  seeAllText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#778DA9',
  },
});