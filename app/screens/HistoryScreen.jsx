import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import IncidentCard from '../components/IncidentCard';
import { getReports } from '../services/storage';

// ==========================================
// Presentation Layer: Report History Screen (Final Sprint)
// Course: IT3R10 • Group 1 (Campus Safety Incident Reporter)
// Assigned Member: Kirklan Caberte
// Requirement: Report History (Rubric Page 2)
// Demonstrates: Dynamic History Log Hydration from Data Layer
// ==========================================
export default function HistoryScreen() {
  const [reports, setReports] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const data = await getReports();
      setReports(data || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.title}>CAMPUS REPORT HISTORY</Text>
        <Text style={styles.subtitle}>Persistent logs loaded directly from local storage.</Text>
      </View>

      {reports.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No Incident Reports Recorded</Text>
          <Text style={styles.emptySubtitle}>Submit a report from the File Report tab to log an incident.</Text>
        </View>
      ) : (
        reports.map((item) => (
          <IncidentCard
            key={item.id}
            title={item.title}
            category={item.category}
            location={item.location}
            date={item.date}
            description={item.description}
            imageUri={item.imageUri}
          />
        ))
      )}
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
  emptyContainer: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D5DFE9',
    alignItems: 'center',
    marginTop: 20,
  },
  emptyTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#415A77',
  },
  emptySubtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 4,
    textAlign: 'center',
  },
});