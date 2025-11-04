import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { enableScreens } from 'react-native-screens';
import { StatusBar } from 'expo-status-bar';

import { COLORS } from './src/theme/colors';
import { HomeScreen, CommunityScreen, ResourcesScreen, ProfileScreen } from './src/screens';

if (process.env.JEST_WORKER_ID == null) {
  enableScreens();
}

const Tab = createBottomTabNavigator();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.background,
    card: COLORS.card,
    border: COLORS.border,
    text: COLORS.textPrimary,
    primary: COLORS.fuchsia,
  },
};

const TAB_ICON_MAP = {
  Home: { focused: 'flower', default: 'flower-outline' },
  Community: { focused: 'people', default: 'people-outline' },
  Resources: { focused: 'book', default: 'book-outline' },
  Profile: { focused: 'person', default: 'person-outline' },
};

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.card,
          borderTopColor: COLORS.border,
          paddingBottom: 6,
          paddingTop: 6,
          height: 68,
        },
        tabBarActiveTintColor: COLORS.fuchsia,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarIcon: ({ focused, color, size }) => {
          const iconMap = TAB_ICON_MAP[route.name] ?? TAB_ICON_MAP.Home;
          const iconName = focused ? iconMap.focused : iconMap.default;
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: {
          fontWeight: '700',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Resources" component={ResourcesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
        <StatusBar style="dark" />
        <NavigationContainer theme={navigationTheme}>
          <AppTabs />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export { HomeScreen, CommunityScreen, ResourcesScreen, ProfileScreen };
