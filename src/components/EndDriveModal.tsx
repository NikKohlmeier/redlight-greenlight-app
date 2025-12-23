import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  useColorScheme,
  Alert,
} from 'react-native';
import { Drive } from '../types';
import { Colors, LightEmojis } from '../constants/colors';
import { generateShareText, copyToClipboard, formatDuration } from '../utils/sharing';
import { wp, hp, fontSize, widthPercentage } from '../utils/responsive';

interface EndDriveModalProps {
  visible: boolean;
  drive: Drive;
  onClose: () => void;
  onSave: (name?: string) => void;
}

export const EndDriveModal: React.FC<EndDriveModalProps> = ({
  visible,
  drive,
  onClose,
  onSave,
}) => {
  const [driveName, setDriveName] = useState('');
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const winner = drive.greenScore > drive.redScore
    ? { text: 'Green Wins!', emoji: '🎉', points: drive.greenScore - drive.redScore }
    : drive.greenScore === drive.redScore
    ? { text: "It's a Tie!", emoji: '🤝', points: 0 }
    : { text: 'Red Wins!', emoji: '🚨', points: drive.redScore - drive.greenScore };

  const handleShare = async () => {
    const shareText = generateShareText({ ...drive, name: driveName || undefined });
    const success = await copyToClipboard(shareText);
    if (success) {
      Alert.alert('Copied!', 'Drive results copied to clipboard');
    } else {
      Alert.alert('Error', 'Failed to copy to clipboard');
    }
  };

  const handleSave = () => {
    onSave(driveName || undefined);
    setDriveName('');
  };

  const redCount = drive.lights.filter(l => l.color === 'red').length;
  const yellowCount = drive.lights.filter(l => l.color === 'yellow').length;
  const greenCount = drive.lights.filter(l => l.color === 'green').length;
  const duration = drive.duration || 0;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
          <Text style={styles.emoji}>{winner.emoji}</Text>
          <Text style={[styles.title, { color: colors.text }]}>{winner.text}</Text>

          {winner.points > 0 && (
            <Text style={[styles.points, { color: colors.text }]}>
              +{winner.points} points
            </Text>
          )}

          <View style={styles.statsContainer}>
            <View style={styles.statRow}>
              <Text style={styles.statEmoji}>{LightEmojis.red}</Text>
              <Text style={[styles.statText, { color: colors.text }]}>{redCount}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statEmoji}>{LightEmojis.yellow}</Text>
              <Text style={[styles.statText, { color: colors.text }]}>{yellowCount}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statEmoji}>{LightEmojis.green}</Text>
              <Text style={[styles.statText, { color: colors.text }]}>{greenCount}</Text>
            </View>
          </View>

          <Text style={[styles.duration, { color: colors.textSecondary }]}>
            Duration: {formatDuration(duration)}
          </Text>

          <TextInput
            style={[styles.input, {
              backgroundColor: colors.background,
              color: colors.text,
              borderColor: colors.border,
            }]}
            placeholder="Name this drive (optional)"
            placeholderTextColor={colors.textSecondary}
            value={driveName}
            onChangeText={setDriveName}
          />

          <TouchableOpacity
            style={[styles.button, styles.shareButton]}
            onPress={handleShare}
          >
            <Text style={styles.buttonText}>📋 Share Results</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>✅ Save Drive</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onClose}
          >
            <Text style={[styles.buttonText, { color: colors.text }]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: widthPercentage(85),
    padding: wp(30),
    borderRadius: wp(20),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: wp(4) },
    shadowOpacity: 0.3,
    shadowRadius: wp(8),
    elevation: 8,
  },
  emoji: {
    fontSize: fontSize(60),
    marginBottom: hp(10),
  },
  title: {
    fontSize: fontSize(28),
    fontWeight: 'bold',
    marginBottom: hp(10),
  },
  points: {
    fontSize: fontSize(20),
    marginBottom: hp(20),
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: hp(15),
  },
  statRow: {
    alignItems: 'center',
  },
  statEmoji: {
    fontSize: fontSize(32),
  },
  statText: {
    fontSize: fontSize(24),
    fontWeight: 'bold',
    marginTop: hp(5),
  },
  duration: {
    fontSize: fontSize(16),
    marginBottom: hp(20),
  },
  input: {
    width: '100%',
    padding: wp(15),
    borderRadius: wp(10),
    borderWidth: wp(1),
    marginBottom: hp(15),
    fontSize: fontSize(16),
  },
  button: {
    width: '100%',
    padding: hp(15),
    borderRadius: wp(10),
    alignItems: 'center',
    marginBottom: hp(10),
  },
  shareButton: {
    backgroundColor: '#4CAF50',
  },
  saveButton: {
    backgroundColor: '#2196F3',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: wp(1),
    borderColor: '#ddd',
  },
  buttonText: {
    color: '#fff',
    fontSize: fontSize(18),
    fontWeight: 'bold',
  },
});
