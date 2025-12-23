import React, { useRef, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, useColorScheme } from 'react-native';
import { Light } from '../types';
import { HistoryItem } from './HistoryItem';
import { Colors } from '../constants/colors';
import { wp, hp, fontSize } from '../utils/responsive';

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
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    marginHorizontal: wp(20),
    marginVertical: hp(10),
    borderRadius: wp(15),
    height: hp(300),
    position: 'static',
    transform: [{ rotate: '360deg' }],
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: wp(10),
  },
  emptyContainer: {
    height: hp(200),
    marginHorizontal: wp(20),
    marginVertical: hp(10),
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
