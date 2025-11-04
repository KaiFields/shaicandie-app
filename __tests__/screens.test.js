import React from 'react';
import { render } from '@testing-library/react-native';

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
    const Screen = ({ component: Component, ...rest }) => (
      <Component {...rest} />
    );
    return { Navigator, Screen };
  },
}));

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => <>{children}</>,
  SafeAreaView: ({ children }) => <>{children}</>,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

import App, { HomeScreen, CommunityScreen, ResourcesScreen, ProfileScreen } from '../App';

describe('Soft But Savage screens', () => {
  it('Home screen showcases Boss Energy Index details', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText(/Boss Energy Index/i)).toBeTruthy();
    expect(getByText(/Track how your body, money, boundaries/i)).toBeTruthy();
  });

  it('Community screen describes video sanctuaries', () => {
    const { getByText } = render(<CommunityScreen />);
    expect(getByText(/Video Therapy Sanctuaries/i)).toBeTruthy();
    expect(getByText(/HIPAA-ready rooms/i)).toBeTruthy();
  });

  it('Resources screen promotes boutique commerce', () => {
    const { getByText } = render(<ResourcesScreen />);
    expect(getByText(/Soft But Savage Boutique/i)).toBeTruthy();
    expect(getByText(/secure checkout/i)).toBeTruthy();
  });

  it('Profile screen displays therapy protection hub', () => {
    const { getByText } = render(<ProfileScreen />);
    expect(getByText(/Therapy Protection/i)).toBeTruthy();
    expect(getByText(/Secure notes/i)).toBeTruthy();
  });
});

describe('App navigation shell', () => {
  it('renders the home experience inside the navigation container', async () => {
    const { findByTestId } = render(<App />);
    expect(await findByTestId('home-screen')).toBeTruthy();
  });
});
