import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Colors } from '../constants/colors';
import { wp, hp, fontSize } from '../utils/responsive';

export const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;

  return (
    <TouchableOpacity
      style={[styles.toggle, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={toggleTheme}
      activeOpacity={0.7}
    >
      <Text style={styles.icon}>{isDark ? '🌙' : '☀️'}</Text>
      <Text style={[styles.label, { color: colors.text }]}>
        {isDark ? 'Dark' : 'Light'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(15),
    paddingVertical: hp(10),
    borderRadius: wp(20),
    borderWidth: wp(2),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: wp(2) },
    shadowOpacity: 0.1,
    shadowRadius: wp(4),
    elevation: 3,
  },
  icon: {
    fontSize: fontSize(20),
    marginRight: wp(8),
  },
  label: {
    fontSize: fontSize(16),
    fontWeight: '600',
  },
});

