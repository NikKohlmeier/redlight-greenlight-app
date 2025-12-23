import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '../constants/colors';
import { wp, hp, fontSize } from '../utils/responsive';

interface ScoreBoardProps {
  redScore: number;
  greenScore: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  redScore,
  greenScore,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const FlipDigit: React.FC<{ value: number; color: 'red' | 'green' }> = ({ value, color }) => {
    const bgColor = color === 'red' ? '#2a1a1a' : '#1a2a1a';
    const textColor = color === 'red' ? '#ff6b6b' : '#6bcf7f';

    return (
      <View style={[styles.digitContainer, { backgroundColor: bgColor }]}>
        <View style={styles.digitInner}>
          <Text style={[styles.digitText, { color: textColor }]}>
            {value.toString().padStart(2, '0')}
          </Text>
        </View>
        <View style={[styles.flipLine, { backgroundColor: isDark ? '#000' : '#333' }]} />
        <View style={styles.screws}>
          <View style={styles.screw} />
          <View style={styles.screw} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {/* Red Section */}
        <View style={styles.section}>
          <Text style={[styles.label, { color: '#ff6b6b' }]}>RED</Text>
          <FlipDigit value={redScore} color="red" />
        </View>

        {/* VS Divider */}
        <View style={styles.vsContainer}>
          <Text style={styles.vsText}>VS</Text>
        </View>

        {/* Green Section */}
        <View style={styles.section}>
          <Text style={[styles.label, { color: '#6bcf7f' }]}>GREEN</Text>
          <FlipDigit value={greenScore} color="green" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(20),
    marginVertical: hp(15),
  },
  board: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#1a1a1a',
    borderRadius: wp(20),
    padding: wp(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: wp(4) },
    shadowOpacity: 0.3,
    shadowRadius: wp(8),
    elevation: 8,
  },
  section: {
    alignItems: 'center',
    flex: 1,
  },
  label: {
    fontSize: fontSize(16),
    fontWeight: 'bold',
    letterSpacing: wp(2),
    marginBottom: hp(10),
  },
  digitContainer: {
    width: wp(80),
    height: hp(100),
    borderRadius: wp(10),
    overflow: 'hidden',
    borderWidth: wp(3),
    borderColor: '#000',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: wp(2) },
    shadowOpacity: 0.5,
    shadowRadius: wp(4),
    elevation: 5,
  },
  digitInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  digitText: {
    fontSize: fontSize(56),
    fontWeight: 'bold',
    fontFamily: 'Courier New',
  },
  flipLine: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: wp(2),
  },
  screws: {
    position: 'absolute',
    top: hp(5),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(8),
  },
  screw: {
    width: wp(8),
    height: hp(8),
    borderRadius: wp(4),
    backgroundColor: '#333',
    borderWidth: wp(1),
    borderColor: '#555',
  },
  vsContainer: {
    paddingHorizontal: wp(10),
  },
  vsText: {
    fontSize: fontSize(20),
    fontWeight: 'bold',
    color: '#666',
    letterSpacing: wp(1),
  },
});
