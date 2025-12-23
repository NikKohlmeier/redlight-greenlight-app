# Red Light Green Light - Project Context

## Project Overview

Red Light Green Light is a React Native mobile game app built with Expo that gamifies daily commutes by tracking red, yellow, and green traffic lights during drives. Users tap lights as they encounter them, compete for scores, and analyze their driving patterns.

## Tech Stack

- **Framework**: Expo + React Native
- **Language**: TypeScript
- **Navigation**: React Navigation (Bottom Tabs)
- **State Management**: React Context API (`DriveContext`)
- **Storage**: AsyncStorage (via `StorageService`)
- **Gestures**: React Native Gesture Handler
- **Animations**: React Native Reanimated
- **Haptics**: Expo Haptics
- **Clipboard**: Expo Clipboard

## Project Structure

```
├── App.tsx                    # Main entry point with navigation setup
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── LightButton.tsx   # Red/Yellow/Green light buttons
│   │   ├── ScoreBoard.tsx    # Score display with flip animations
│   │   ├── HistoryGrid.tsx    # Scrollable grid of colored light circles
│   │   ├── HistoryItem.tsx   # Individual light circle component
│   │   ├── EndDriveModal.tsx # Drive completion modal with stats
│   │   └── DriveCard.tsx     # Card component for past drives
│   ├── screens/               # Main app screens
│   │   ├── ActiveDriveScreen.tsx  # Live drive tracking (main game screen)
│   │   ├── HistoryScreen.tsx      # List of past drives
│   │   └── StatsScreen.tsx        # Statistics and analytics
│   ├── contexts/              # React Context providers
│   │   └── DriveContext.tsx  # Global drive state management
│   ├── services/              # External services
│   │   └── storage.ts         # AsyncStorage wrapper for persistence
│   ├── utils/                 # Utility functions
│   │   └── sharing.ts         # Share text generation & formatting
│   ├── types/                 # TypeScript type definitions
│   │   └── index.ts           # Drive, Light, Stats, DriveContextType
│   └── constants/             # App constants
│       └── colors.ts          # Color palette & dark/light themes
└── assets/                    # App assets (icons, images)
```

## Key Concepts

### Game Rules
- **Red Light**: +1 to red score
- **Yellow Light**: +2 to green score (bonus for making it!)
- **Green Light**: +1 to green score
- **Winner**: Green score > Red score = You win!

### Data Models

#### Light
```typescript
{
  id: string;
  color: 'red' | 'yellow' | 'green';
  timestamp: number;
}
```

#### Drive
```typescript
{
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
```

#### DriveStats
Comprehensive statistics including:
- Total drives, lights, win rate
- Best/worst scores and drives
- Longest drive, most lights drive
- Streaks (current, best win, best loss)
- Averages (duration, lights per drive)

## State Management

### DriveContext
The app uses a single React Context (`DriveContext`) for global state management:

**State:**
- `currentDrive`: Currently active drive (null if none)
- `pastDrives`: Array of completed drives
- `stats`: Calculated statistics from past drives

**Actions:**
- `startDrive()`: Creates a new active drive
- `addLight(color)`: Adds a light to current drive (auto-starts if no drive)
- `deleteLight(lightId)`: Removes a light and recalculates scores
- `reorderLights(lights)`: Reorders lights array and recalculates scores
- `endDrive(name?)`: Completes current drive, saves to history
- `loadDrives()`: Loads drives from AsyncStorage on app start
- `deleteDrive(driveId)`: Removes a drive from history

### Storage Service
- `StorageService.saveCurrentDrive(drive)`: Persists active drive
- `StorageService.loadCurrentDrive()`: Loads active drive on app start
- `StorageService.saveDrives(drives)`: Saves all past drives
- `StorageService.loadDrives()`: Loads all past drives

## Styling Patterns

### Color System
- Uses `Colors.dark` and `Colors.light` from `src/constants/colors.ts`
- Automatically switches based on system color scheme
- Colors include: `background`, `text`, `textSecondary`, `card`, `border`, `tabIconSelected`, `tabIconDefault`

### StyleSheet Usage
- All components use React Native `StyleSheet.create()`
- Styles are defined at the bottom of component files
- Dynamic colors applied via inline styles: `style={[styles.container, { backgroundColor: colors.card }]}`

## Component Patterns

### HistoryGrid
- Scrollable view displaying light history
- Uses `ScrollView` with `contentContainerStyle` for grid layout
- Auto-scrolls to bottom when new lights added
- Height: 300px (recently changed from maxHeight to fixed height)
- Background color: `colors.card` (#2d2d2d in dark mode)

### ScoreBoard
- Displays red vs green scores with flip animations
- Uses digit containers with visual effects (screws, flip lines)
- Styled like a retro scoreboard

### LightButton
- Three buttons for red, yellow, green lights
- Circular buttons with haptic feedback
- Size configurable (default 90px)

## Navigation

### Tab Navigator
Three main tabs:
1. **Drive** (🚦): ActiveDriveScreen - main game screen
2. **History** (📚): HistoryScreen - past drives list
3. **Stats** (📊): StatsScreen - statistics and analytics

Navigation configured in `App.tsx` with bottom tabs, no headers.

## Important Notes

### Auto-start Behavior
- Drive automatically starts when first light is tapped (if no active drive exists)
- No explicit "Start Drive" button needed

### Score Recalculation
- When lights are deleted or reordered, scores are recalculated from scratch
- Yellow lights count as +2 to green score
- This ensures data consistency

### Persistence
- Active drive is saved immediately after each change
- Past drives saved when drive ends
- All data persists across app restarts via AsyncStorage

### Haptic Feedback
- Light added: Light impact
- Drive started: Medium impact
- Light deleted: Success notification
- Drive ended: Success notification
- Drive deleted: Warning notification

## Development Notes

### Recent Changes
- `HistoryGrid.tsx`: Changed from `maxHeight: 300` to `height: 300` for fixed height

### Common Patterns
- Components use `useColorScheme()` hook for theme detection
- All screens wrapped in `SafeAreaView` for proper spacing
- Empty states shown when no data available
- Long press gestures for delete actions

### Future Considerations
- Drag and drop reordering (reorderLights function exists but not implemented in UI)
- Pause/resume functionality
- Achievements system
- Cloud sync capabilities

