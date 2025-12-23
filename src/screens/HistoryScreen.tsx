import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useDrive } from '../contexts/DriveContext';
import { useTheme } from '../contexts/ThemeContext';
import { DriveCard } from '../components/DriveCard';
import { Colors } from '../constants/colors';
import { Drive } from '../types';
import { wp, hp, fontSize } from '../utils/responsive';

export const HistoryScreen: React.FC = () => {
  const { pastDrives, deleteDrive } = useDrive();
  const { isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;

  const handleDrivePress = (drive: Drive) => {
    Alert.alert(
      drive.name || 'Drive Details',
      `Date: ${new Date(drive.startTime).toLocaleString()}\n\n` +
      `Duration: ${Math.floor((drive.duration || 0) / 60)}m ${(drive.duration || 0) % 60}s\n` +
      `Total Lights: ${drive.lights.length}\n\n` +
      `Red: ${drive.lights.filter(l => l.color === 'red').length}\n` +
      `Yellow: ${drive.lights.filter(l => l.color === 'yellow').length}\n` +
      `Green: ${drive.lights.filter(l => l.color === 'green').length}\n\n` +
      `Final Score:\n` +
      `Red: ${drive.redScore} | Green: ${drive.greenScore}`,
      [
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Delete Drive',
              'Are you sure you want to delete this drive?',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: () => deleteDrive(drive.id),
                },
              ]
            );
          },
        },
        { text: 'Close', style: 'cancel' },
      ]
    );
  };

  if (pastDrives.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>📚</Text>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            No drives yet!
          </Text>
          <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
            Complete a drive to see it here
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Drive History</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {pastDrives.length} {pastDrives.length === 1 ? 'drive' : 'drives'} completed
        </Text>
      </View>

      <FlatList
        data={pastDrives}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DriveCard drive={item} onPress={() => handleDrivePress(item)} />
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: hp(20),
    paddingHorizontal: wp(20),
  },
  title: {
    fontSize: fontSize(28),
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: fontSize(16),
    marginTop: hp(5),
  },
  listContent: {
    paddingBottom: hp(20),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(40),
  },
  emptyEmoji: {
    fontSize: fontSize(80),
    marginBottom: hp(20),
  },
  emptyText: {
    fontSize: fontSize(24),
    fontWeight: 'bold',
    marginBottom: hp(10),
  },
  emptySubtext: {
    fontSize: fontSize(16),
    textAlign: 'center',
  },
});
