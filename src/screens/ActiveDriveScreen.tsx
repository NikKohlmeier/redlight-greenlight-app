import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  SafeAreaView,
} from 'react-native';
import { useDrive } from '../contexts/DriveContext';
import { LightButton } from '../components/LightButton';
import { ScoreBoard } from '../components/ScoreBoard';
import { HistoryGrid } from '../components/HistoryGrid';
import { EndDriveModal } from '../components/EndDriveModal';
import { Colors } from '../constants/colors';
import { wp, hp, fontSize } from '../utils/responsive';

export const ActiveDriveScreen: React.FC = () => {
  const { currentDrive, addLight, deleteLight, endDrive } = useDrive();
  const [showEndModal, setShowEndModal] = useState(false);
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const handleEndDrive = () => {
    if (currentDrive && currentDrive.lights.length > 0) {
      setShowEndModal(true);
    }
  };

  const handleSaveAndEnd = async (name?: string) => {
    await endDrive(name);
    setShowEndModal(false);
  };

  const hasStarted = currentDrive && currentDrive.lights.length > 0;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {!hasStarted && (
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>🚦 Red Light Green Light</Text>
        </View>
      )}

      <ScoreBoard
        redScore={currentDrive?.redScore || 0}
        greenScore={currentDrive?.greenScore || 0}
      />

      <HistoryGrid
        lights={currentDrive?.lights || []}
        onDeleteLight={deleteLight}
      />

      <View style={styles.buttonContainer}>
        <LightButton color="red" onPress={() => addLight('red')} />
        <LightButton color="yellow" onPress={() => addLight('yellow')} />
        <LightButton color="green" onPress={() => addLight('green')} />
      </View>

      {currentDrive && currentDrive.lights.length > 0 && (
        <TouchableOpacity
          style={styles.endButton}
          onPress={handleEndDrive}
          activeOpacity={0.8}
        >
          <Text style={styles.endButtonText}>🏁 End Drive</Text>
        </TouchableOpacity>
      )}

      {currentDrive && showEndModal && (
        <EndDriveModal
          visible={showEndModal}
          drive={currentDrive}
          onClose={() => setShowEndModal(false)}
          onSave={handleSaveAndEnd}
        />
      )}
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
  },
  title: {
    fontSize: fontSize(28),
    fontWeight: 'bold',
  },
  lightCount: {
    fontSize: fontSize(16),
    marginTop: hp(5),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: wp(20),
    marginVertical: hp(20),
  },
  endButton: {
    backgroundColor: '#000',
    marginHorizontal: wp(40),
    marginVertical: hp(20),
    padding: hp(18),
    borderRadius: wp(15),
    alignItems: 'center',
    borderWidth: wp(3),
    borderColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: wp(4) },
    shadowOpacity: 0.5,
    shadowRadius: wp(8),
    elevation: 8,
  },
  endButtonText: {
    color: '#FFD700',
    fontSize: fontSize(22),
    fontWeight: 'bold',
  },
});
