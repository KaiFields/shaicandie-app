import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { StatusBar } from 'expo-status-bar';

import { COLORS } from './src/theme/colors';
import { HomeScreen, CommunityScreen, ResourcesScreen, ProfileScreen } from './src/screens';
import { AuthProvider } from './src/context/AuthContext';
import { BossEnergyProvider } from './src/context/BossEnergyContext';
import { AppNavigator } from './src/navigation/AppNavigator';

if (process.env.JEST_WORKER_ID == null) {
  enableScreens();
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
        <AuthProvider>
          <BossEnergyProvider>
            <AppNavigator />
          </BossEnergyProvider>
        </AuthProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export { HomeScreen, CommunityScreen, ResourcesScreen, ProfileScreen };
