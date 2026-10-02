import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import IncidentCard from '../components/IncidentCard';
import { getReports } from '../services/storage';

// ==========================================
// Presentation Layer: Dashboard Screen (Final Sprint)
// Course: IT3R10 • Group 1 (Campus Safety Incident Reporter)
// Assigned Member: Kirklan Caberte
// Demonstrates: Live Local Storage Data Hydration & 4-Category Telemetry
// Palette: Slate Blue (#415A77) & Soft Slate (#778DA9)
// ==========================================
export default function HomeScreen({ onNavigate }) {
  const [reports, setReports] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const data = await getReports();
      setReports(data || []);
    } catch (e) {
      console.error('Failed to load incident reports:', e);
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

  // Live Counts for All 4 Incident Categories
  const totalReports = reports.length;
  const hazardCount = reports.filter((r) => r.category === 'Hazard').length;
  const facilityCount = reports.filter((r) => r.category === 'Facility').length;
  const securityCount = reports.filter((r) => r.category === 'Security').length;
  const medicalCount = reports.filter((r) => r.category === 'Medical').length;

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Welcome Banner (Option 2: Clean & Direct) */}
      <View style={styles.welcomeBanner}>
        <Text style={styles.welcomeTitle}>INCIDENT CATEGORIES</Text>
        <Text style={styles.welcomeSubtitle}>Total Reports Logged: {totalReports}</Text>
      </View>

      {/* 4-Category Metrics Grid (Hazard, Facility, Security, Medical) */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: '#DC2626' }]}>{hazardCount}</Text>
          <Text style={styles.statLabel}>HAZARD</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: '#415A77' }]}>{facilityCount}</Text>
          <Text style={styles.statLabel}>FACILITY</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: '#2F4257' }]}>{securityCount}</Text>
          <Text style={styles.statLabel}>SECURITY</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: '#059669' }]}>{medicalCount}</Text>
          <Text style={styles.statLabel}>MEDICAL</Text>
        </View>
      </View>

      {/* Quick Action Banner */}
      <TouchableOpacity
        style={styles.actionBanner}
        onPress={() => onNavigate && onNavigate('report')}
      >
        <View style={styles.actionTextContainer}>
          <Text style={styles.actionTitle}>File Campus Incident Report</Text>
          <Text style={styles.actionSubtitle}>Attach GPS location & camera photo evidence</Text>
        </View>
        <View style={styles.actionButtonBadge}>
          <Text style={styles.actionBadgeText}>REPORT</Text>
        </View>
      </TouchableOpacity>

      {/* Recent Incident Reports Feed */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>RECENT INCIDENT REPORTS</Text>
        <TouchableOpacity onPress={() => onNavigate && onNavigate('history')}>
          <Text style={styles.seeAllText}>VIEW ALL ({totalReports})</Text>
        </TouchableOpacity>
      </View>

      {reports.slice(0, 3).map((item) => (
        <IncidentCard
          key={item.id}
          title={item.title}
          category={item.category}
          location={item.location}
          date={item.date}
          description={item.description}
          imageUri={item.imageUri}
        />
      ))}
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
    gap: 6,
    marginBottom: 14,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D5DFE9',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#415A77',
  },
  statLabel: {
    fontSize: 8.5,
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
  actionTextContainer: {
    flex: 1,
    marginRight: 10,
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