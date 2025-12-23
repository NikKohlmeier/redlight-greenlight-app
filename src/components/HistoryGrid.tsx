import React, { useRef, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, useColorScheme, Dimensions } from 'react-native';
import { Light } from '../types';
import { HistoryItem } from './HistoryItem';
import { Colors } from '../constants/colors';
import { wp, hp, fontSize, getScreenWidth } from '../utils/responsive';

interface HistoryGridProps {
  lights: Light[];
  onDeleteLight: (lightId: string) => void;
}

export const HistoryGrid: React.FC<HistoryGridProps> = ({ lights, onDeleteLight }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  useEffect(() => {
    // Auto-scroll to bottom when new light is added
    if (lights.length > 0) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  }, [lights.length]);

  if (lights.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.card }]}>
        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
          Tap a light to start tracking! 🚦
        </Text>
      </View>
    );
  }

  // Calculate item size for 4 columns
  // Account for container margin (wp(20) * 2), padding (wp(10) * 2), and item padding
  const screenWidth = getScreenWidth();
  const containerMargin = wp(20) * 2; // left + right margin
  const containerPadding = wp(10) * 2; // left + right padding
  const itemPadding = wp(5) * 2; // left + right padding per item wrapper
  const totalItemPadding = itemPadding * 4; // 4 items per row
  const availableWidth = screenWidth - containerMargin - containerPadding - totalItemPadding;
  const itemSize = Math.min(availableWidth / 4, wp(80)); // Cap at wp(80) for very large screens

  return (
    <ScrollView
      ref={scrollViewRef}
      style={[styles.scrollView, { backgroundColor: colors.card }]}
      contentContainerStyle={styles.gridContainer}
    >
      {lights.map((light) => (
        <HistoryItem
          key={light.id}
          light={light}
          onDelete={onDeleteLight}
          size={itemSize}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    marginHorizontal: wp(20),
    borderRadius: wp(15),
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: wp(10),
    justifyContent: 'flex-start',
  },
  emptyContainer: {
    flex: 1,
    marginHorizontal: wp(20),
    borderRadius: wp(15),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: wp(2),
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  emptyText: {
    fontSize: fontSize(18),
    textAlign: 'center',
  },
});
