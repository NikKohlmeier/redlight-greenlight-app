import React from 'react';
import { TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Light } from '../types';
import { LightColors } from '../constants/colors';
import { wp } from '../utils/responsive';

interface HistoryItemProps {
  light: Light;
  onDelete: (lightId: string) => void;
  size?: number;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({
  light,
  onDelete,
  size,
}) => {
  const defaultSize = wp(60);
  const itemSize = size || defaultSize;
  const handleLongPress = () => {
    Alert.alert(
      'Delete Light',
      'Are you sure you want to delete this light?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => onDelete(light.id),
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      style={[
        styles.item,
        {
          backgroundColor: LightColors[light.color],
          width: itemSize,
          height: itemSize,
          borderRadius: itemSize / 2,
        },
      ]}
      onLongPress={handleLongPress}
      delayLongPress={500}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    margin: wp(5),
    borderWidth: wp(2),
    borderColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: wp(2) },
    shadowOpacity: 0.2,
    shadowRadius: wp(3),
    elevation: 3,
  },
});
