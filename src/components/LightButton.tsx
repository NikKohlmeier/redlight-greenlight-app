import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { LightColor } from '../types';
import { LightColors } from '../constants/colors';
import { wp } from '../utils/responsive';

interface LightButtonProps {
  color: LightColor;
  onPress: () => void;
  size?: number;
}

export const LightButton: React.FC<LightButtonProps> = ({
  color,
  onPress,
  size,
}) => {
  const defaultSize = wp(100);
  const buttonSize = size || defaultSize;
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: LightColors[color],
          width: buttonSize,
          height: buttonSize,
          borderRadius: buttonSize / 2,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: wp(4),
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: wp(4) },
    shadowOpacity: 0.3,
    shadowRadius: wp(8),
    elevation: 8,
  },
});
