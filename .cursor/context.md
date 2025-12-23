# Project Context - Red Light Green Light

> **Quick Reference**: This file provides essential context to reduce token usage in AI conversations.

## Core Concepts

**Game**: Track traffic lights during drives. Red=+1 red, Yellow=+2 green, Green=+1 green. Win if green > red.

**Architecture**: Expo + React Native, TypeScript, Context API for state, AsyncStorage for persistence.

**Key Files**:
- `App.tsx` - Tab navigation setup
- `src/contexts/DriveContext.tsx` - Global state management
- `src/screens/ActiveDriveScreen.tsx` - Main game screen
- `src/components/ScoreBoard.tsx` - Score display
- `src/components/HistoryGrid.tsx` - Light history grid

**Styling**: Use `wp()`, `hp()`, `fontSize()` from `src/utils/responsive.ts`. Base: 393x852. StyleSheet + inline for dynamic colors.

**State**: DriveContext provides `currentDrive`, `pastDrives`, `stats`, and actions (`addLight`, `deleteLight`, `endDrive`, etc.).

**Types**: See `src/types/index.ts` for `Light`, `Drive`, `DriveStats`, `DriveContextType`.

**Colors**: `Colors.light`/`Colors.dark` from `src/constants/colors.ts`. Use `useTheme()` hook.

**Web**: Configured for GitHub Pages. Build with `npm run build:web` (outputs to `docs/`).

