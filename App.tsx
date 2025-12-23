import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DriveProvider } from './src/contexts/DriveContext';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { ActiveDriveScreen } from './src/screens/ActiveDriveScreen';
import { HistoryScreen } from './src/screens/HistoryScreen';
import { StatsScreen } from './src/screens/StatsScreen';
import { Colors } from './src/constants/colors';

const Tab = createBottomTabNavigator();

function AppContent() {
  const { isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DriveProvider>
        <NavigationContainer>
          <StatusBar style={isDark ? 'light' : 'dark'} />
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarStyle: {
                backgroundColor: colors.card,
                borderTopColor: colors.border,
              },
              tabBarActiveTintColor: colors.tabIconSelected,
              tabBarInactiveTintColor: colors.tabIconDefault,
            }}
          >
            <Tab.Screen
              name="Drive"
              component={ActiveDriveScreen}
              options={{
                tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🚦</Text>,
              }}
            />
            <Tab.Screen
              name="History"
              component={HistoryScreen}
              options={{
                tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>📚</Text>,
              }}
            />
            <Tab.Screen
              name="Stats"
              component={StatsScreen}
              options={{
                tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>📊</Text>,
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </DriveProvider>
    </GestureHandlerRootView>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
