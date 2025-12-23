import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Drive, DriveContextType, DriveStats, Light, LightColor } from '../types';
import { StorageService } from '../services/storage';
import * as Haptics from 'expo-haptics';

const DriveContext = createContext<DriveContextType | undefined>(undefined);

export const useDrive = () => {
  const context = useContext(DriveContext);
  if (!context) {
    throw new Error('useDrive must be used within a DriveProvider');
  }
  return context;
};

export const DriveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentDrive, setCurrentDrive] = useState<Drive | null>(null);
  const [pastDrives, setPastDrives] = useState<Drive[]>([]);
  const [stats, setStats] = useState<DriveStats>(calculateStats([]));

  useEffect(() => {
    loadDrives();
  }, []);

  useEffect(() => {
    setStats(calculateStats(pastDrives));
  }, [pastDrives]);

  const loadDrives = useCallback(async () => {
    const drives = await StorageService.loadDrives();
    setPastDrives(drives);

    const activeDrive = await StorageService.loadCurrentDrive();
    if (activeDrive) {
      setCurrentDrive(activeDrive);
    }
  }, []);

  const startDrive = useCallback(() => {
    const newDrive: Drive = {
      id: Date.now().toString(),
      startTime: Date.now(),
      lights: [],
      redScore: 0,
      greenScore: 0,
      yellowCount: 0,
      isActive: true,
    };
    setCurrentDrive(newDrive);
    StorageService.saveCurrentDrive(newDrive);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }, []);

  const addLight = useCallback((color: LightColor) => {
    if (!currentDrive) {
      // Auto-start drive on first light
      const newDrive: Drive = {
        id: Date.now().toString(),
        startTime: Date.now(),
        lights: [],
        redScore: 0,
        greenScore: 0,
        yellowCount: 0,
        isActive: true,
      };
      setCurrentDrive(newDrive);
    }

    setCurrentDrive((prev) => {
      if (!prev) return null;

      const newLight: Light = {
        id: Date.now().toString() + Math.random(),
        color,
        timestamp: Date.now(),
      };

      let redScore = prev.redScore;
      let greenScore = prev.greenScore;
      let yellowCount = prev.yellowCount;

      switch (color) {
        case 'red':
          redScore += 1;
          break;
        case 'yellow':
          greenScore += 2;
          yellowCount += 1;
          break;
        case 'green':
          greenScore += 1;
          break;
      }

      const updatedDrive = {
        ...prev,
        lights: [...prev.lights, newLight],
        redScore,
        greenScore,
        yellowCount,
      };

      StorageService.saveCurrentDrive(updatedDrive);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      return updatedDrive;
    });
  }, [currentDrive]);

  const deleteLight = useCallback((lightId: string) => {
    setCurrentDrive((prev) => {
      if (!prev) return null;

      const lightToDelete = prev.lights.find(l => l.id === lightId);
      if (!lightToDelete) return prev;

      const updatedLights = prev.lights.filter(l => l.id !== lightId);

      // Recalculate scores
      let redScore = 0;
      let greenScore = 0;
      let yellowCount = 0;

      updatedLights.forEach(light => {
        switch (light.color) {
          case 'red':
            redScore += 1;
            break;
          case 'yellow':
            greenScore += 2;
            yellowCount += 1;
            break;
          case 'green':
            greenScore += 1;
            break;
        }
      });

      const updatedDrive = {
        ...prev,
        lights: updatedLights,
        redScore,
        greenScore,
        yellowCount,
      };

      StorageService.saveCurrentDrive(updatedDrive);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      return updatedDrive;
    });
  }, []);

  const reorderLights = useCallback((lights: Light[]) => {
    setCurrentDrive((prev) => {
      if (!prev) return null;

      // Recalculate scores based on new order
      let redScore = 0;
      let greenScore = 0;
      let yellowCount = 0;

      lights.forEach(light => {
        switch (light.color) {
          case 'red':
            redScore += 1;
            break;
          case 'yellow':
            greenScore += 2;
            yellowCount += 1;
            break;
          case 'green':
            greenScore += 1;
            break;
        }
      });

      const updatedDrive = {
        ...prev,
        lights,
        redScore,
        greenScore,
        yellowCount,
      };

      StorageService.saveCurrentDrive(updatedDrive);

      return updatedDrive;
    });
  }, []);

  const endDrive = useCallback(async (name?: string) => {
    if (!currentDrive) return;

    const endTime = Date.now();
    const duration = Math.floor((endTime - currentDrive.startTime) / 1000);

    const completedDrive: Drive = {
      ...currentDrive,
      name,
      endTime,
      duration,
      isActive: false,
    };

    const updatedDrives = [completedDrive, ...pastDrives];
    setPastDrives(updatedDrives);
    await StorageService.saveDrives(updatedDrives);
    await StorageService.saveCurrentDrive(null);

    setCurrentDrive(null);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, [currentDrive, pastDrives]);

  const deleteDrive = useCallback(async (driveId: string) => {
    const updatedDrives = pastDrives.filter(d => d.id !== driveId);
    setPastDrives(updatedDrives);
    await StorageService.saveDrives(updatedDrives);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  }, [pastDrives]);

  return (
    <DriveContext.Provider
      value={{
        currentDrive,
        pastDrives,
        stats,
        startDrive,
        addLight,
        deleteLight,
        reorderLights,
        endDrive,
        loadDrives,
        deleteDrive,
      }}
    >
      {children}
    </DriveContext.Provider>
  );
};

function calculateStats(drives: Drive[]): DriveStats {
  if (drives.length === 0) {
    return {
      totalDrives: 0,
      totalReds: 0,
      totalYellows: 0,
      totalGreens: 0,
      totalLights: 0,
      winRate: 0,
      bestGreenScore: 0,
      worstRedScore: 0,
      averageDuration: 0,
      averageLightsPerDrive: 0,
      currentStreak: { type: 'win', count: 0 },
      bestWinStreak: 0,
      bestLossStreak: 0,
    };
  }

  const totalReds = drives.reduce((sum, d) => sum + d.redScore, 0);
  const totalGreens = drives.reduce((sum, d) => sum + d.greenScore, 0);
  const totalYellows = drives.reduce((sum, d) => sum + d.yellowCount, 0);
  const totalLights = drives.reduce((sum, d) => sum + d.lights.length, 0);

  const wins = drives.filter(d => d.greenScore > d.redScore).length;
  const winRate = (wins / drives.length) * 100;

  const bestGreenDrive = drives.reduce((best, current) =>
    current.greenScore > best.greenScore ? current : best
  );

  const worstRedDrive = drives.reduce((worst, current) =>
    current.redScore > worst.redScore ? current : worst
  );

  const longestDrive = drives.reduce((longest, current) =>
    (current.duration || 0) > (longest.duration || 0) ? current : longest
  );

  const mostLightsDrive = drives.reduce((most, current) =>
    current.lights.length > most.lights.length ? current : most
  );

  const totalDuration = drives.reduce((sum, d) => sum + (d.duration || 0), 0);
  const averageDuration = Math.floor(totalDuration / drives.length);
  const averageLightsPerDrive = Math.floor(totalLights / drives.length);

  // Calculate streaks
  let currentStreak = { type: 'win' as const, count: 0 };
  let tempStreak = 0;
  let bestWinStreak = 0;
  let bestLossStreak = 0;
  let currentStreakType: 'win' | 'loss' | null = null;

  drives.forEach((drive, index) => {
    const isWin = drive.greenScore > drive.redScore;

    if (index === 0) {
      currentStreakType = isWin ? 'win' : 'loss';
      tempStreak = 1;
    } else {
      if ((isWin && currentStreakType === 'win') || (!isWin && currentStreakType === 'loss')) {
        tempStreak++;
      } else {
        if (currentStreakType === 'win') {
          bestWinStreak = Math.max(bestWinStreak, tempStreak);
        } else {
          bestLossStreak = Math.max(bestLossStreak, tempStreak);
        }
        currentStreakType = isWin ? 'win' : 'loss';
        tempStreak = 1;
      }
    }
  });

  // Finalize current streak
  if (currentStreakType) {
    currentStreak = { type: currentStreakType, count: tempStreak };
    if (currentStreakType === 'win') {
      bestWinStreak = Math.max(bestWinStreak, tempStreak);
    } else {
      bestLossStreak = Math.max(bestLossStreak, tempStreak);
    }
  }

  return {
    totalDrives: drives.length,
    totalReds,
    totalYellows,
    totalGreens,
    totalLights,
    winRate,
    bestGreenScore: bestGreenDrive.greenScore,
    bestGreenDrive,
    worstRedScore: worstRedDrive.redScore,
    worstRedDrive,
    longestDrive,
    mostLightsDrive,
    averageDuration,
    averageLightsPerDrive,
    currentStreak,
    bestWinStreak,
    bestLossStreak,
  };
}
