import React from 'react';
import { render, act } from '@testing-library/react-native';

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    NavigationContainer: ({ children }) => <>{children}</>,
  };
});

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => {
    const Navigator = ({ children }) => <>{children}</>;
    const Screen = ({ component: Component, ...rest }) => <Component {...rest} />;
    return { Navigator, Screen };
  },
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => {
    const Navigator = ({ children }) => <>{children}</>;
    const Screen = ({ component: Component, navigation, ...rest }) => (
      <Component
        {...rest}
        navigation={
          navigation ?? {
            navigate: jest.fn(),
            goBack: jest.fn(),
            replace: jest.fn(),
          }
        }
      />
    );
    return { Navigator, Screen };
  },
}));

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => <>{children}</>,
  SafeAreaView: ({ children }) => <>{children}</>,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(() => Promise.resolve(null)),
  setItemAsync: jest.fn(() => Promise.resolve()),
  deleteItemAsync: jest.fn(() => Promise.resolve()),
  AFTER_FIRST_UNLOCK: 'AFTER_FIRST_UNLOCK',
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-native-webview', () => ({
  WebView: () => null,
}));

jest.mock('expo-web-browser', () => ({
  openBrowserAsync: jest.fn(() => Promise.resolve()),
}));

jest.mock('expo-constants', () => ({
  expoConfig: {
    extra: {
      authApiUrl: 'https://example.com',
      mentorApiUrl: 'https://example.com',
      videoHostUrl: 'https://example.com',
      commerceUrl: 'https://example.com',
      sentryDsn: 'https://example.com',
    },
  },
}));

global.fetch = jest.fn((url) => {
  if (typeof url === 'string' && url.includes('/sessions')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ id: 'session-1', reply: 'Test reply', createdAt: new Date().toISOString() }),
    });
  }
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ data: [] }),
  });
});

beforeAll(() => {
  jest.spyOn(Date, 'now').mockImplementation(() => new Date('2024-01-15T12:00:00Z').getTime());
});

afterAll(() => {
  Date.now.mockRestore();
});

import App, { HomeScreen, CommunityScreen, ResourcesScreen, ProfileScreen } from '../App';
import { AuthProvider } from '../src/context/AuthContext';
import { BossEnergyProvider } from '../src/context/BossEnergyContext';

async function renderWithProviders(ui) {
  const utils = render(
    <AuthProvider>
      <BossEnergyProvider>{ui}</BossEnergyProvider>
    </AuthProvider>,
  );
  await act(async () => {
    await Promise.resolve();
  });
  return utils;
}

describe('Soft But Savage screens', () => {
  it('Home screen showcases Boss Energy Index details', async () => {
    const { getByText } = await renderWithProviders(<HomeScreen />);
    expect(getByText(/Boss Energy Index/i)).toBeTruthy();
    expect(getByText(/Track how your body, money, boundaries/i)).toBeTruthy();
  });

  it('Community screen describes video sanctuaries', async () => {
    const { getByText } = await renderWithProviders(<CommunityScreen />);
    expect(getByText(/Video Therapy Sanctuaries/i)).toBeTruthy();
    expect(getByText(/HIPAA-ready rooms/i)).toBeTruthy();
  });

  it('Resources screen promotes boutique commerce', async () => {
    const { getByText } = await renderWithProviders(<ResourcesScreen />);
    expect(getByText(/Soft But Savage Boutique/i)).toBeTruthy();
    expect(getByText(/secure checkout/i)).toBeTruthy();
  });

  it('Profile screen displays therapy protection hub', async () => {
    const { getByText } = await renderWithProviders(<ProfileScreen />);
    expect(getByText(/Therapy Protection/i)).toBeTruthy();
    expect(getByText(/Secure notes/i)).toBeTruthy();
  });
});

describe('App navigation shell', () => {
  it('shows the authentication gate when no session exists', async () => {
    const { findByText } = render(<App />);
    await act(async () => {
      await Promise.resolve();
    });
    expect(await findByText(/Welcome back/i)).toBeTruthy();
  });
});
