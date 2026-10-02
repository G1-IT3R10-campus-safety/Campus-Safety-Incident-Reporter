// ==========================================
// Native Device Features & Permissions Layer (Final Sprint)
// Course: IT3R10 • Group 1 (Campus Safety Incident Reporter)
// Assigned Member: Arwin Ambag
// Demonstrates: Native Device Hardware Integration (GPS & Camera)
// Dependencies: expo-location, expo-image-picker
// ==========================================
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

// 1. Request GPS Permission & Fetch Real Live Coordinates
export async function requestLocationPermission() {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      return {
        granted: false,
        status: 'denied',
        error: 'Location permission was denied. Enable GPS in settings for accurate campus reporting.',
        coords: null,
        locationName: 'Location Unavailable (Permission Denied)',
      };
    }

    // Fetch actual satellite / device position
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    const lat = location.coords.latitude.toFixed(4);
    const lng = location.coords.longitude.toFixed(4);

    return {
      granted: true,
      status: 'granted',
      coords: {
        latitude: lat,
        longitude: lng,
      },
      locationName: `Campus Perimeter (${lat}° N, ${lng}° E)`,
    };
  } catch (error) {
    // Graceful fallback for devices or browsers without GPS hardware
    return {
      granted: false,
      status: 'denied',
      error: 'Unable to acquire GPS signal. Check device location services.',
      coords: {
        latitude: '8.4542',
        longitude: '124.6319',
      },
      locationName: 'Campus Zone (8.4542° N, 124.6319° E)',
    };
  }
}

// 2. Request Camera Permission & Capture Real Photo Evidence
export async function takePhotoEvidence() {
  try {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    // If camera permission granted, launch device camera
    if (status === 'granted') {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        return {
          success: true,
          uri: result.assets[0].uri,
        };
      }
      return { success: false, cancelled: true };
    }

    // Fallback for laptop / web preview testing (Launch Image Library)
    const galleryResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!galleryResult.canceled && galleryResult.assets && galleryResult.assets.length > 0) {
      return {
        success: true,
        uri: galleryResult.assets[0].uri,
      };
    }

    return { success: false, cancelled: true };
  } catch (error) {
    // Desktop browser fallback
    try {
      const webFallback = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      if (!webFallback.canceled && webFallback.assets && webFallback.assets.length > 0) {
        return {
          success: true,
          uri: webFallback.assets[0].uri,
        };
      }
    } catch (e) {
      console.error('Photo capture error:', e);
    }
    return { success: false, error: 'Could not access camera or photo library.' };
  }
}