export type LightColor = 'red' | 'yellow' | 'green';

export interface Light {
  id: string;
  color: LightColor;
  timestamp: number;
}

export interface Drive {
  id: string;
  name?: string;
  startTime: number;
  endTime?: number;
  duration?: number; // in seconds
  lights: Light[];
  redScore: number;
  greenScore: number;
  yellowCount: number;
  isActive: boolean;
}

export interface DriveStats {
  totalDrives: number;
  totalReds: number;
  totalYellows: number;
  totalGreens: number;
  totalLights: number;
  winRate: number; // percentage where green > red
  bestGreenScore: number;
  bestGreenDrive?: Drive;
  worstRedScore: number;
  worstRedDrive?: Drive;
  longestDrive?: Drive;
  mostLightsDrive?: Drive;
  averageDuration: number;
  averageLightsPerDrive: number;
  currentStreak: {
    type: 'win' | 'loss';
    count: number;
  };
  bestWinStreak: number;
  bestLossStreak: number;
}

export interface DriveContextType {
  currentDrive: Drive | null;
  pastDrives: Drive[];
  stats: DriveStats;
  startDrive: () => void;
  addLight: (color: LightColor) => void;
  deleteLight: (lightId: string) => void;
  reorderLights: (lights: Light[]) => void;
  endDrive: (name?: string) => Promise<void>;
  loadDrives: () => Promise<void>;
  deleteDrive: (driveId: string) => Promise<void>;
}
