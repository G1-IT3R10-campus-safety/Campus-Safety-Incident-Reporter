import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// ==========================================
// Reusable Component: IncidentCard
// Assigned Member: Kirklan Caberte
// Requirement: Receives at least 2 Props (title, category, location, date, status)
// Palette: Slate Blue (#415A77) & Soft Slate (#778DA9)
// ==========================================
export default function IncidentCard({ title, category, location, date, status }) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
      </View>
      <Text style={styles.location}>Location: {location}</Text>
      <View style={styles.footerRow}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.statusText}>{status || 'Under Review'}</Text>
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
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
    flex: 1,
  },
  categoryBadge: {
    backgroundColor: '#EFF3F6',
    borderWidth: 1,
    borderColor: '#BAC7D5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
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
    color: '#64748B',
    marginTop: 2,
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
  date: {
    fontSize: 11,
    color: '#94A3B8',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#415A77',
  },
});