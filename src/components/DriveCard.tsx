import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { Drive } from '../types';
import { Colors, LightEmojis } from '../constants/colors';
import { formatDate, formatTime, formatDuration } from '../utils/sharing';
import { wp, hp, fontSize } from '../utils/responsive';

interface DriveCardProps {
  drive: Drive;
  onPress?: () => void;
}

export const DriveCard: React.FC<DriveCardProps> = ({ drive, onPress }) => {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const isWin = drive.greenScore > drive.redScore;
  const lights = drive.lights || [];
  const redCount = lights.filter(l => l.color === 'red').length;
  const yellowCount = lights.filter(l => l.color === 'yellow').length;
  const greenCount = lights.filter(l => l.color === 'green').length;

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={[styles.name, { color: colors.text }]}>
          {drive.name || 'Unnamed Drive'}
        </Text>
        <Text style={[styles.winBadge, { backgroundColor: isWin ? '#4CAF50' : '#f44336' }]}>
          {isWin ? '🏆 Win' : '🚨 Loss'}
        </Text>
      </View>

      <View style={styles.dateRow}>
        <Text style={[styles.date, { color: colors.textSecondary }]}>
          {formatDate(drive.startTime)} • {formatTime(drive.startTime)}
        </Text>
        {drive.duration && (
          <Text style={[styles.duration, { color: colors.textSecondary }]}>
            ⏱️ {formatDuration(drive.duration)}
          </Text>
        )}
      </View>

      <View style={styles.scoresRow}>
        <View style={styles.scoreItem}>
          <Text style={styles.scoreEmoji}>{LightEmojis.red}</Text>
          <Text style={[styles.scoreValue, { color: colors.text }]}>{redCount}</Text>
        </View>
        <View style={styles.scoreItem}>
          <Text style={styles.scoreEmoji}>{LightEmojis.yellow}</Text>
          <Text style={[styles.scoreValue, { color: colors.text }]}>{yellowCount}</Text>
        </View>
        <View style={styles.scoreItem}>
          <Text style={styles.scoreEmoji}>{LightEmojis.green}</Text>
          <Text style={[styles.scoreValue, { color: colors.text }]}>{greenCount}</Text>
        </View>
      </View>

      <View style={styles.totalRow}>
        <Text style={[styles.totalText, { color: colors.textSecondary }]}>
          Final Score: Red {drive.redScore} - Green {drive.greenScore}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: wp(20),
    marginVertical: hp(8),
    padding: wp(15),
    borderRadius: wp(15),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: wp(2) },
    shadowOpacity: 0.1,
    shadowRadius: wp(4),
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(10),
  },
  name: {
    fontSize: fontSize(18),
    fontWeight: 'bold',
    flex: 1,
  },
  winBadge: {
    paddingHorizontal: wp(10),
    paddingVertical: hp(5),
    borderRadius: wp(12),
    color: '#fff',
    fontSize: fontSize(12),
    fontWeight: 'bold',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(15),
  },
  date: {
    fontSize: fontSize(14),
  },
  duration: {
    fontSize: fontSize(14),
  },
  scoresRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: hp(10),
    paddingVertical: hp(10),
    borderTopWidth: wp(1),
    borderBottomWidth: wp(1),
    borderColor: '#eee',
  },
  scoreItem: {
    alignItems: 'center',
  },
  scoreEmoji: {
    fontSize: fontSize(24),
  },
  scoreValue: {
    fontSize: fontSize(20),
    fontWeight: 'bold',
    marginTop: hp(5),
  },
  totalRow: {
    alignItems: 'center',
    marginTop: hp(5),
  },
  totalText: {
    fontSize: fontSize(14),
  },
});
