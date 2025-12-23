# 🚦 Red Light Green Light

A fun mobile game to track red vs green lights during your drives! Perfect for making road trips more engaging.

## 📱 About

Red Light Green Light is a React Native app that gamifies your daily commutes and drives. Track red, yellow, and green lights in real-time, compete for the best score, and analyze your driving patterns with comprehensive stats.

### Game Rules
- 🔴 **Red Light**: +1 to red score
- 🟡 **Yellow Light**: +2 to green score (bonus for making it!)
- 🟢 **Green Light**: +1 to green score
- 🏆 **Winner**: Green score > Red score = You win!

## ✨ Features

### Core Gameplay
- **Live Tracking**: Tap lights as you encounter them during your drive
- **Real-time Scoring**: See your red vs green score update instantly
- **Visual History**: Colorful grid showing your light sequence
- **Long Press to Delete**: Made a mistake? Long press any light to delete it
- **Checkered Flag**: End your drive with a satisfying finish

### Drive Management
- **Auto-start**: Drive begins automatically when you tap your first light
- **Name Your Drives**: Give each drive a memorable name
- **Wordle-style Sharing**: Copy your results to clipboard in a fun, shareable format
- **Drive History**: View all your past drives with detailed stats
- **Persistent Storage**: All drives saved locally using AsyncStorage

### Stats & Analytics
- **Overview Stats**: Total drives, win rate, average duration
- **Light Totals**: Cumulative red, yellow, and green lights
- **Records**: Best green score, worst red score, longest drive
- **Streaks**: Current win/loss streak and best streaks
- **Fun Facts**: Interesting insights about your driving patterns

### User Experience
- 🎨 **Dark Mode Support**: Automatic theme switching
- 📳 **Haptic Feedback**: Satisfying tactile responses
- 🌈 **Beautiful UI**: Clean, modern design with smooth animations
- 📊 **Three Tabs**: Easy navigation between Drive, History, and Stats

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Studio (for Android development)

### Installation

1. Clone the repository:
```bash
cd RedLight-GreenLight
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your device:
- **iOS**: Press `i` or run `npm run ios`
- **Android**: Press `a` or run `npm run android`
- **Web**: Press `w` or run `npm run web`

## 📁 Project Structure

```
├── App.tsx                          # Main app entry with navigation
├── src/
│   ├── components/                  # Reusable UI components
│   │   ├── LightButton.tsx         # Red/Yellow/Green light buttons
│   │   ├── ScoreBoard.tsx          # Score display component
│   │   ├── HistoryGrid.tsx         # Grid of colored light circles
│   │   ├── HistoryItem.tsx         # Individual light in history
│   │   ├── EndDriveModal.tsx       # Drive completion modal
│   │   └── DriveCard.tsx           # Past drive card component
│   ├── screens/                     # Main app screens
│   │   ├── ActiveDriveScreen.tsx   # Live drive tracking screen
│   │   ├── HistoryScreen.tsx       # Past drives list
│   │   └── StatsScreen.tsx         # Statistics and analytics
│   ├── contexts/                    # React Context providers
│   │   └── DriveContext.tsx        # Global drive state management
│   ├── services/                    # External services
│   │   └── storage.ts              # AsyncStorage wrapper
│   ├── utils/                       # Utility functions
│   │   └── sharing.ts              # Share text generation & formatting
│   ├── types/                       # TypeScript type definitions
│   │   └── index.ts                # Drive, Light, Stats types
│   └── constants/                   # App constants
│       └── colors.ts               # Color palette & themes
└── assets/                          # App assets (icons, images)
```

## 🛠 Technology Stack

- **Framework**: Expo + React Native
- **Language**: TypeScript
- **Navigation**: React Navigation (Bottom Tabs)
- **State Management**: React Context API
- **Storage**: AsyncStorage
- **Gestures**: React Native Gesture Handler
- **Animations**: React Native Reanimated
- **Clipboard**: Expo Clipboard
- **Haptics**: Expo Haptics
- **UI**: React Native components with custom styling

## 🎮 How to Play

1. **Start a Drive**: Open the app and tap any light button to begin
2. **Track Lights**: Tap red, yellow, or green as you encounter lights on your route
3. **Fix Mistakes**: Long press any light in the history grid to delete it
4. **End Drive**: Tap the checkered flag button when you're done
5. **Name & Share**: Give your drive a name and share your results!
6. **View History**: Check out all your past drives in the History tab
7. **Analyze Stats**: See your progress and records in the Stats tab

## 📲 Sharing Format

When you complete a drive, you can copy your results to share:

```
🚦 Red Light Green Light
Dance Class Run - 1/31/25
🔴 3 | 🟢 7 | 🟡 2
Green Wins! +8 points
🟢🔴🟡🟢🟢🔴🟢🟢🔴🟢🟡🟢
```

## 🚧 Roadmap / Future Features

### Planned Features
- [ ] Drag and drop to reorder lights in history
- [ ] Sound effects toggle
- [ ] Drive pause/resume functionality
- [ ] Achievements system
- [ ] Weekly summary notifications
- [ ] Export drives as CSV
- [ ] Route mapping (location tracking)
- [ ] Multi-user support / profiles

### Stretch Goals
- [ ] AI-powered traffic light detection via camera
- [ ] Cloud sync with Supabase
- [ ] Social features / leaderboards
- [ ] Apple Watch companion app
- [ ] CarPlay integration

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome! Feel free to open issues or submit pull requests.

## 📄 License

ISC

## 👨‍👧 Credits

Created as a fun project inspired by counting traffic lights on the way to dance class.

---

**Enjoy the game and happy driving! 🚗💨**
