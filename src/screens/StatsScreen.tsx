import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useColorScheme,
  SafeAreaView,
} from 'react-native';
import { useDrive } from '../contexts/DriveContext';
import { Colors, LightEmojis } from '../constants/colors';
import { formatDuration } from '../utils/sharing';
import { wp, hp, fontSize, widthPercentage } from '../utils/responsive';

export const StatsScreen: React.FC = () => {
  const { stats, pastDrives } = useDrive();
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  if (pastDrives.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>📊</Text>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            No stats yet!
          </Text>
          <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
            Complete some drives to see your stats
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const StatCard: React.FC<{ title: string; value: string | number; icon?: string }> = ({
    title,
    value,
    icon,
  }) => (
    <View style={[styles.statCard, { backgroundColor: colors.card }]}>
      {icon && <Text style={styles.statIcon}>{icon}</Text>}
      <Text style={[styles.statValue, { color: colors.text }]}>{value}</Text>
      <Text style={[styles.statTitle, { color: colors.textSecondary }]}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Your Stats</Text>
        </View>

        {/* Overview Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Overview</Text>
          <View style={styles.grid}>
            <StatCard title="Total Drives" value={stats.totalDrives} icon="🚗" />
            <StatCard title="Total Lights" value={stats.totalLights} icon="🚦" />
            <StatCard
              title="Win Rate"
              value={`${stats.winRate.toFixed(0)}%`}
              icon="🏆"
            />
            <StatCard
              title="Avg Duration"
              value={formatDuration(stats.averageDuration)}
              icon="⏱️"
            />
          </View>
        </View>

        {/* Lights Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Light Totals</Text>
          <View style={styles.grid}>
            <StatCard
              title="Red Lights"
              value={stats.totalReds}
              icon={LightEmojis.red}
            />
            <StatCard
              title="Yellow Lights"
              value={stats.totalYellows}
              icon={LightEmojis.yellow}
            />
            <StatCard
              title="Green Lights"
              value={stats.totalGreens}
              icon={LightEmojis.green}
            />
          </View>
        </View>

        {/* Records Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Records</Text>
          <View style={styles.grid}>
            <StatCard
              title="Best Green Score"
              value={stats.bestGreenScore}
              icon="🌟"
            />
            <StatCard
              title="Worst Red Score"
              value={stats.worstRedScore}
              icon="⚠️"
            />
            <StatCard
              title="Most Lights"
              value={stats.mostLightsDrive?.lights.length || 0}
              icon="📈"
            />
            <StatCard
              title="Longest Drive"
              value={formatDuration(stats.longestDrive?.duration || 0)}
              icon="🕐"
            />
          </View>
        </View>

        {/* Streaks Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Streaks</Text>
          <View style={[styles.streakCard, { backgroundColor: colors.card }]}>
            <Text style={styles.streakEmoji}>
              {stats.currentStreak.type === 'win' ? '🔥' : '❄️'}
            </Text>
            <Text style={[styles.streakValue, { color: colors.text }]}>
              {stats.currentStreak.count}
            </Text>
            <Text style={[styles.streakLabel, { color: colors.textSecondary }]}>
              Current {stats.currentStreak.type === 'win' ? 'Win' : 'Loss'} Streak
            </Text>
          </View>
          <View style={styles.grid}>
            <StatCard
              title="Best Win Streak"
              value={stats.bestWinStreak}
              icon="🏆"
            />
            <StatCard
              title="Worst Loss Streak"
              value={stats.bestLossStreak}
              icon="😔"
            />
          </View>
        </View>

        {/* Fun Facts */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Fun Facts</Text>
          <View style={[styles.funFactCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.funFactText, { color: colors.text }]}>
              💡 Yellows saved you <Text style={styles.highlight}>{stats.totalYellows * 2}</Text> green points!
            </Text>
          </View>
          <View style={[styles.funFactCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.funFactText, { color: colors.text }]}>
              📊 You average <Text style={styles.highlight}>{stats.averageLightsPerDrive}</Text> lights per drive
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: hp(30),
  },
  header: {
    alignItems: 'center',
    paddingVertical: hp(20),
  },
  title: {
    fontSize: fontSize(28),
    fontWeight: 'bold',
  },
  section: {
    marginTop: hp(20),
    paddingHorizontal: wp(20),
  },
  sectionTitle: {
    fontSize: fontSize(22),
    fontWeight: 'bold',
    marginBottom: hp(15),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%', // 48% width for 2 columns - works on all screen sizes
    padding: wp(20),
    borderRadius: wp(15),
    alignItems: 'center',
    marginBottom: hp(15),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: wp(2) },
    shadowOpacity: 0.1,
    shadowRadius: wp(4),
    elevation: 3,
  },
  statIcon: {
    fontSize: fontSize(36),
    marginBottom: hp(10),
  },
  statValue: {
    fontSize: fontSize(32),
    fontWeight: 'bold',
    marginBottom: hp(5),
  },
  statTitle: {
    fontSize: fontSize(14),
    textAlign: 'center',
  },
  streakCard: {
    padding: wp(30),
    borderRadius: wp(15),
    alignItems: 'center',
    marginBottom: hp(15),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: wp(2) },
    shadowOpacity: 0.1,
    shadowRadius: wp(4),
    elevation: 3,
  },
  streakEmoji: {
    fontSize: fontSize(50),
    marginBottom: hp(10),
  },
  streakValue: {
    fontSize: fontSize(48),
    fontWeight: 'bold',
    marginBottom: hp(5),
  },
  streakLabel: {
    fontSize: fontSize(18),
  },
  funFactCard: {
    padding: wp(20),
    borderRadius: wp(15),
    marginBottom: hp(15),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: wp(2) },
    shadowOpacity: 0.1,
    shadowRadius: wp(4),
    elevation: 3,
  },
  funFactText: {
    fontSize: fontSize(16),
    textAlign: 'center',
  },
  highlight: {
    fontWeight: 'bold',
    fontSize: fontSize(20),
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
