// ==========================================
// Data Layer: Local Storage Service (AsyncStorage)
// Course: IT3R10 • Group 1 (Campus Safety Incident Reporter)
// Assigned Member: Junrey Roxas
// Demonstrates: Data Persistence & Offline Availability (Report Only - No Status)
// Dependencies: @react-native-async-storage/async-storage
// ==========================================
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@campus_incident_reports_v2';

const INITIAL_REPORTS = [
  {
    id: 'report-1',
    title: 'Broken Street Light',
    category: 'Hazard',
    location: 'Campus Gate 1 Pathway (8.4542° N, 124.6319° E)',
    date: 'Oct 1, 2026 • 8:30 AM',
    description: 'Street light fixture is broken and dangling.',
    imageUri: null,
  },
  {
    id: 'report-2',
    title: 'Slippery Corridor Floor',
    category: 'Facility',
    location: '2nd Floor IT Building (8.4545° N, 124.6321° E)',
    date: 'Oct 1, 2026 • 9:15 AM',
    description: 'Water leak from aircon compressor making corridor tiles slippery.',
    imageUri: null,
  },
  {
    id: 'report-3',
    title: 'Flickering Emergency Exit Sign',
    category: 'Security',
    location: '3rd Floor Science Wing (8.4539° N, 124.6315° E)',
    date: 'Sep 30, 2026 • 4:10 PM',
    description: 'Emergency exit bulb flickering continuously.',
    imageUri: null,
  },
];

export async function getReports() {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (jsonValue !== null) {
      const parsed = JSON.parse(jsonValue);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_REPORTS));
    return INITIAL_REPORTS;
  } catch (error) {
    console.error('AsyncStorage getReports error:', error);
    return INITIAL_REPORTS;
  }
}

export async function saveReport(newReport) {
  try {
    const existingReports = await getReports();

    const formattedDate =
      new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
      ' • ' +
      new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const reportToSave = {
      id: Date.now().toString(),
      date: formattedDate,
      title: newReport.title.trim(),
      category: newReport.category,
      description: newReport.description.trim(),
      location: newReport.location || 'Campus Grounds',
      imageUri: newReport.imageUri || null,
      coords: newReport.coords || null,
    };

    const updatedList = [reportToSave, ...existingReports];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));

    return { success: true, data: reportToSave };
  } catch (error) {
    console.error('AsyncStorage saveReport error:', error);
    return { success: false, error: error.message };
  }
}

export async function clearReports() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}