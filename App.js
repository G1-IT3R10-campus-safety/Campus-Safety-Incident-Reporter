import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, StatusBar } from 'react-native';
import { registerRootComponent } from 'expo';

import HomeScreen from './app/screens/HomeScreen';
import ReportScreen from './app/screens/ReportScreen';
import HistoryScreen from './app/screens/HistoryScreen';
import LocationBadge from './app/components/LocationBadge';
import { requestLocationPermission } from './app/services/deviceFeatures';

// ==========================================
// Main Application Gateway (Root Component)
// Project: Campus Safety & Incident Reporter
// Course / Section: IT3R10 • Group 1
// Theme Palette: Slate Steel Blue (#415A77) & Soft Slate (#778DA9)
// ==========================================
export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [gpsData, setGpsData] = useState({
    latitude: null,
    longitude: null,
    status: 'loading',
    errorMsg: null,
  });

  // Fetch Live Satellite Coordinates on Launch
  useEffect(() => {
    async function fetchLiveCoords() {
      const result = await requestLocationPermission();
      if (result.granted && result.coords) {
        setGpsData({
          latitude: result.coords.latitude,
          longitude: result.coords.longitude,
          status: 'granted',
          errorMsg: null,
        });
      } else {
        setGpsData({
          latitude: null,
          longitude: null,
          status: 'denied',
          errorMsg: result.error || 'GPS Permission Denied',
        });
      }
    }
    fetchLiveCoords();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#415A77" />

      {/* Top Header Bar */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>CAMPUS SAFETY</Text>
          <Text style={styles.headerSubtitle}>GROUP 1 • IT3R10</Text>
        </View>
        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Active</Text>
        </View>
      </View>

      {/* Top GPS Location Badge (Passing Live Coordinates to Arwin's Component) */}
      <View style={styles.topBadgeContainer}>
        <LocationBadge
          latitude={gpsData.latitude}
          longitude={gpsData.longitude}
          status={gpsData.status}
          errorMsg={gpsData.errorMsg}
        />
      </View>

      {/* Screen Area */}
      <View style={styles.screenArea}>
        {activeTab === 'dashboard' && <HomeScreen onNavigate={setActiveTab} />}
        {activeTab === 'report' && <ReportScreen onNavigate={setActiveTab} />}
        {activeTab === 'history' && <HistoryScreen />}
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={[styles.navButton, activeTab === 'dashboard' && styles.activeNav]}
          onPress={() => setActiveTab('dashboard')}
        >
          <Text style={[styles.navText, activeTab === 'dashboard' && styles.activeNavText]}>
            Dashboard
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, activeTab === 'report' && styles.activeNav]}
          onPress={() => setActiveTab('report')}
        >
          <Text style={[styles.navText, activeTab === 'report' && styles.activeNavText]}>
            File Report
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, activeTab === 'history' && styles.activeNav]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.navText, activeTab === 'history' && styles.activeNavText]}>
            Report History
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#415A77',
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#E0E1DD',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  headerSubtitle: {
    color: '#BAC7D5',
    fontSize: 11,
    letterSpacing: 0.5,
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2F4257',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#526F8F',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  statusText: {
    color: '#E0E1DD',
    fontSize: 11,
    fontWeight: '600',
  },
  topBadgeContainer: {
    paddingHorizontal: 14,
    paddingTop: 8,
  },
  screenArea: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#D5DFE9',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: 'space-around',
  },
  navButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  activeNav: {
    borderBottomWidth: 2,
    borderBottomColor: '#415A77',
  },
  navText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#778DA9',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  activeNavText: {
    color: '#415A77',
    fontWeight: 'bold',
  },
});

registerRootComponent(App);