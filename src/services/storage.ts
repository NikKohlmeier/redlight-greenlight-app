import AsyncStorage from '@react-native-async-storage/async-storage';
import { Drive } from '../types';

const DRIVES_KEY = '@redlight_drives';
const CURRENT_DRIVE_KEY = '@redlight_current_drive';

export const StorageService = {
  async saveDrives(drives: Drive[]): Promise<void> {
    try {
      await AsyncStorage.setItem(DRIVES_KEY, JSON.stringify(drives));
    } catch (error) {
      console.error('Error saving drives:', error);
      throw error;
    }
  },

  async loadDrives(): Promise<Drive[]> {
    try {
      const drivesJson = await AsyncStorage.getItem(DRIVES_KEY);
      return drivesJson ? JSON.parse(drivesJson) : [];
    } catch (error) {
      console.error('Error loading drives:', error);
      return [];
    }
  },

  async saveCurrentDrive(drive: Drive | null): Promise<void> {
    try {
      if (drive) {
        await AsyncStorage.setItem(CURRENT_DRIVE_KEY, JSON.stringify(drive));
      } else {
        await AsyncStorage.removeItem(CURRENT_DRIVE_KEY);
      }
    } catch (error) {
      console.error('Error saving current drive:', error);
      throw error;
    }
  },

  async loadCurrentDrive(): Promise<Drive | null> {
    try {
      const driveJson = await AsyncStorage.getItem(CURRENT_DRIVE_KEY);
      return driveJson ? JSON.parse(driveJson) : null;
    } catch (error) {
      console.error('Error loading current drive:', error);
      return null;
    }
  },

  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([DRIVES_KEY, CURRENT_DRIVE_KEY]);
    } catch (error) {
      console.error('Error clearing data:', error);
      throw error;
    }
  },
};
