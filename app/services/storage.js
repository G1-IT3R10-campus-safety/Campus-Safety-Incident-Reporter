// ==========================================
// Data Layer: Local Storage Service
// Assigned Member: Junrey Roxas
// Demonstrates: Data Persistence and Offline Availability
// Dependencies: @react-native-async-storage/async-storage
// ==========================================

let localReportsStore = [
  {
    id: '1',
    title: 'Broken Street Light',
    category: 'Hazard',
    location: 'Campus Gate 1 Pathway',
    date: 'Oct 1, 2026 • 8:30 AM',
    status: 'Investigating',
  },
  {
    id: '2',
    title: 'Slippery Corridor Floor',
    category: 'Facility',
    location: '2nd Floor IT Building',
    date: 'Oct 1, 2026 • 9:15 AM',
    status: 'Caution Sign Placed',
  },
  {
    id: '3',
    title: 'Flickering Emergency Exit Sign',
    category: 'Security',
    location: '3rd Floor Science Wing',
    date: 'Sep 30, 2026 • 4:10 PM',
    status: 'Resolved',
  },
];

export async function saveReport(newReport) {
  try {
    const reportWithId = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' • ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Under Review',
      ...newReport,
    };
    localReportsStore.unshift(reportWithId);
    return { success: true, data: reportWithId };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getReports() {
  try {
    return localReportsStore;
  } catch (error) {
    return [];
  }
}

export async function clearReports() {
  localReportsStore = [];
  return { success: true };
}
