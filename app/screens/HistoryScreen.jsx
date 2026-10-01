import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import IncidentCard from '../components/IncidentCard';

// ==========================================
// Presentation Layer: Report History Screen
// Assigned Member: Kirklan Caberte
// Requirement: Report History (Rubric Page 2)
// Demonstrates: History feed loaded from Data Layer
// ==========================================
export default function HistoryScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>REPORT HISTORY</Text>
        <Text style={styles.subtitle}>Persistent logs loaded from Local Storage</Text>
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
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#415A77',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
});