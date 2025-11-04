// Soft But Savage: The ShaiCandie Rebirth Lounge
// Mobile App (Expo / React Native)
// -------------------------------------------------
// UPDATED DEBUG BUILD (Sandbox-Safe v3)
// -------------------------------------------------
// ISSUE YOU SAW:
//   "Failed to bundle using Rollup v2.79.2 ..."
// The restricted browser sandbox is still trying to resolve modules that are
// meant for native/mobile runtime. When bundling fails in this kind of
// sandbox, the stack trace will often point at anything that even *mentions*
// native packages, fonts, or external resolution behavior.
//
// ROOT CAUSE (why you kept seeing the error):
// - The sandbox preview environment is extremely strict. It cannot load
//   native-style modules like React Navigation, react-native-screens, or
//   vector icon font packs.
// - Even having references to those imports active in the running code causes
//   the preview to try to pull them in. That triggers the Rollup failure.
// - We've already removed those active imports. In this version, we ALSO make
//   sure the live runtime path uses only pure React Native primitives (View,
//   Text, etc.) so the sandbox has nothing native to choke on.
//
// WHAT THIS VERSION DOES:
// ✅ Keeps ALL UI and brand language.
// ✅ Keeps all 4 core screens (Home, Community, Resources, Profile).
// ✅ Keeps your test references and previous tests from earlier versions.
// ✅ Provides a sandbox-safe <App /> that does NOT import any native modules.
// ✅ Provides, in comments, the "REAL NAVIGATION APP" you will use on an
//    actual Android phone once you run `expo install`.
// ✅ Removes references that could make the sandbox try to resolve native or
//    external packages in the middle of bundling.
//
// HOW TO SHIP TO A REAL ANDROID PHONE:
// 1. npx create-expo-app soft-but-savage
// 2. cd soft-but-savage
// 3. npx expo install @react-navigation/native @react-navigation/bottom-tabs
// 4. npx expo install react-native-safe-area-context react-native-screens
// 5. npx expo install @expo/vector-icons
// 6. Paste this file into App.js
// 7. UNCOMMENT the entire "REAL NAVIGATION APP" block (look for it below)
//    and DELETE the sandbox <App /> implementation.
// 8. npx expo start --android
// 9. Open the app in Expo Go on your Android phone.
//
// NOTE:
// - The sandbox version uses an emoji tab bar instead of icon fonts, because
//   icon fonts require native font loading.
// - The production version uses real bottom tabs and icons.
// - We did not change or delete any of the previous test cases. We also
//   continue to include the new tests we added.
// -------------------------------------------------
// BRAND GUIDELINES (baked in):
//   Fuchsia: #FF00A8  → main power / Soft But Savage signature
//   Royal Purple: #5F00FF  → protection / authority
//   Electric Turquoise: #00F5FF  → clarity / calm nervous system
//   Charcoal background: #0F0F10  → safety / intimacy / grown woman energy
//   Soft text: #FFFFFF
//
// TAGLINE shown in-app:
//   "For every woman rising from the ashes with her edges, soul,
//    and standards intact."
//
// SCREENS INCLUDED:
//   - Home        → daily reminder, Coffee Hour circle, Shadow Work
//   - Community   → feed, Boss Energy Index, Co-Working Room
//   - Resources   → workbook PDFs, prayers/affirmations audio, offer templates
//   - Profile     → mood log, membership status, boundaries list
//
// TEST EXPORTS:
//   We export each screen (HomeScreen, CommunityScreen, ResourcesScreen,
//   ProfileScreen) so tests can render them independently.
//
// "NEVER change existing test cases unless they're clearly wrong" — all
// previous tests stay exactly as-is. We also keep the extra tests we added for
// sandbox behavior.
// -------------------------------------------------

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
// IMPORTANT: In sandbox mode we do NOT import React Navigation, react-native-
// screens, or @expo/vector-icons. Those require native modules and will cause
// the bundler to fail in browser previews.

// ---------- BRAND THEME ----------
const COLORS = {
  bg: '#0F0F10',
  card: '#1A1A1F',
  border: '#2A2A33',
  textPrimary: '#FFFFFF',
  textSecondary: '#CFCFE3',
  fuchsia: '#FF00A8',
  purple: '#5F00FF',
  aqua: '#00F5FF',
};

// ---------- REUSABLE SECTION CARD ----------
function SavageCard({ title, accentColor, children, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.8 : 1}
      onPress={onPress}
      style={[styles.card, { borderColor: accentColor || COLORS.fuchsia }]}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={title}
    >
      <Text
        style={[styles.cardTitle, { color: accentColor || COLORS.fuchsia }]}
        accessibilityRole="header"
      >
        {title}
      </Text>
      <View style={styles.cardBody}>{children}</View>
    </TouchableOpacity>
  );
}

// ---------- HOME SCREEN ----------
export function HomeScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
      <StatusBar barStyle="light-content" />

      <Text style={styles.appHeader}>Soft But Savage</Text>
      <Text style={styles.tagline}>The ShaiCandie Rebirth Lounge</Text>
      <Text style={styles.subtitle}>
        For every woman rising from the ashes with her edges, soul, and standards intact.
      </Text>

      <SavageCard title="Today’s Reminder" accentColor={COLORS.aqua}>
        <Text style={styles.cardText}>
          You are a diamond in the rough. You were forged in pressure. The result is Divine Beauty.
        </Text>
      </SavageCard>

      <SavageCard
        title="Tap In: Coffee Hour Chat"
        accentColor={COLORS.fuchsia}
        onPress={() => {
          console.log('Open Coffee Hour / livestream page');
        }}
      >
        <Text style={styles.cardText}>
          LIVE sister circle • vent / cry / laugh • zero judgment.
        </Text>
        <Text style={styles.cardCTA}>Join the circle →</Text>
      </SavageCard>

      <SavageCard
        title="Shadow Work Starter"
        accentColor={COLORS.purple}
        onPress={() => {
          console.log('Navigate to Shadow Work module');
        }}
      >
        <Text style={styles.cardText}>
          Journal prompts to get honest about where it still hurts, and why you keep giving grace to
          people who won’t give it back.
        </Text>
        <Text style={styles.cardCTA}>Begin your healing →</Text>
      </SavageCard>
    </ScrollView>
  );
}

// ---------- COMMUNITY SCREEN ----------
export function CommunityScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
      <Text style={styles.sectionHeader}>Community Lounge</Text>
      <Text style={styles.sectionHint}>
        Private. Safe. No performative "be strong" culture. Just real.
      </Text>

      <SavageCard
        title="Soft But Savage Feed"
        accentColor={COLORS.fuchsia}
        onPress={() => {
          console.log('Open community feed');
        }}
      >
        <Text style={styles.cardText}>
          Daily check-ins, wins, "I’m not okay" posts, and hype only.
        </Text>
        <Text style={styles.postPreview}>
          Kai: "Even if life is loud, your nervous system still deserves quiet."
        </Text>
        <Text style={styles.cardCTA}>Open the feed →</Text>
      </SavageCard>

      <SavageCard
        title="Boss Energy Index"
        accentColor={COLORS.aqua}
        onPress={() => {
          console.log('Open Boss Energy Index');
        }}
      >
        <Text style={styles.cardText}>
          Self-check mood tracker. How’s your body? Money? Boundaries? Spirit?
        </Text>
        <Text style={styles.cardCTA}>Check-in now →</Text>
      </SavageCard>

      <SavageCard
        title="Co-Working Room"
        accentColor={COLORS.purple}
        onPress={() => {
          console.log('Open virtual co-working / focus room');
        }}
      >
        <Text style={styles.cardText}>
          Camera-optional virtual table. We show up, mute, and get stuff DONE for 50 minutes.
        </Text>
        <Text style={styles.cardCTA}>Enter a room →</Text>
      </SavageCard>
    </ScrollView>
  );
}

// ---------- RESOURCES SCREEN ----------
export function ResourcesScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
      <Text style={styles.sectionHeader}>Tools & Healing Library</Text>
      <Text style={styles.sectionHint}>Downloadables, journal pages, voice notes, slides.</Text>

      <SavageCard
        title="Shadow Work: Part 1 PDF"
        accentColor={COLORS.fuchsia}
        onPress={() => {
          console.log('Download / open Shadow Work PDF');
        }}
      >
        <Text style={styles.cardText}>
          Deep trauma healing. Boundaries. Releasing shame. Your nervous system is allowed to rest.
        </Text>
        <Text style={styles.cardCTA}>View workbook →</Text>
      </SavageCard>

      <SavageCard
        title="Voice Prayers & Affirmations"
        accentColor={COLORS.aqua}
        onPress={() => {
          console.log('Play audio prayers / affirmations');
        }}
      >
        <Text style={styles.cardText}>
          Soft, steady, loving guidance for when you’re shaking but still choosing to stay.
        </Text>
        <Text style={styles.cardCTA}>Play now →</Text>
      </SavageCard>

      <SavageCard
        title="Offer Alchemy Templates"
        accentColor={COLORS.purple}
        onPress={() => {
          console.log('Open business templates section');
        }}
      >
        <Text style={styles.cardText}>
          Turn your story and skills into an actual paid offer, without selling your soul or faking a
          persona.
        </Text>
        <Text style={styles.cardCTA}>Start building →</Text>
      </SavageCard>
    </ScrollView>
  );
}

// ---------- PROFILE SCREEN ----------
export function ProfileScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
      <Text style={styles.sectionHeader}>My Space</Text>
      <Text style={styles.sectionHint}>This is your sanctuary, sis. Let it reflect you.</Text>

      <SavageCard title="Your Check-Ins" accentColor={COLORS.fuchsia}>
        <Text style={styles.cardText}>
          Last mood log: "Exhausted but proud I didn’t go back."
        </Text>
        <Text style={styles.cardCTA}>View history →</Text>
      </SavageCard>

      <SavageCard title="Membership" accentColor={COLORS.aqua}>
        <Text style={styles.cardText}>
          Status: Active (Soft But Savage Premium)
        </Text>
        <Text style={styles.cardCTA}>Manage billing →</Text>
      </SavageCard>

      <SavageCard title="Boundaries List" accentColor={COLORS.purple}>
        <Text style={styles.cardText}>
          1. I am not explaining myself twice. 2. "Family" that drains me is not family. 3. My rest is
          non-negotiable.
        </Text>
        <Text style={styles.cardCTA}>Edit boundaries →</Text>
      </SavageCard>
    </ScrollView>
  );
}

// -------------------------------------------------
// REAL NAVIGATION APP (for ACTUAL DEVICE BUILD ONLY)
// -------------------------------------------------
// When you're ready to run this on your real Android phone:
// 1. Uncomment EVERYTHING in this block.
// 2. Delete the sandbox <App /> implementation below this block.
// 3. Make sure you've run the `expo install` commands listed at the top so you
//    get versions compatible with your Expo SDK.
//
// import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionicons from '@expo/vector-icons/Ionicons';
//
// const SavageTheme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     background: COLORS.bg,
//     card: COLORS.card,
//     text: COLORS.textPrimary,
//     border: COLORS.border,
//     primary: COLORS.fuchsia,
//   },
// };
//
// const Tab = createBottomTabNavigator();
//
// export default function App() {
//   return (
//     <NavigationContainer theme={SavageTheme}>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           headerStyle: {
//             backgroundColor: COLORS.card,
//           },
//           headerTitleStyle: {
//             color: COLORS.textPrimary,
//             fontWeight: '700',
//             fontSize: 16,
//           },
//           headerShadowVisible: false,
//           tabBarStyle: {
//             backgroundColor: COLORS.card,
//             borderTopColor: COLORS.border,
//             paddingBottom: 6,
//             paddingTop: 6,
//             height: 64,
//           },
//           tabBarActiveTintColor: COLORS.fuchsia,
//           tabBarInactiveTintColor: COLORS.textSecondary,
//           tabBarIcon: ({ color, size, focused }) => {
//             let iconName = 'home';
//             if (route.name === 'Home') {
//               iconName = focused ? 'home' : 'home-outline';
//             } else if (route.name === 'Community') {
//               iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
//             } else if (route.name === 'Resources') {
//               iconName = focused ? 'book' : 'book-outline';
//             } else if (route.name === 'Profile') {
//               iconName = focused ? 'person' : 'person-outline';
//             }
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//         })}
//       >
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Community" component={CommunityScreen} />
//         <Tab.Screen name="Resources" component={ResourcesScreen} />
//         <Tab.Screen name="Profile" component={ProfileScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }
//
// -------------------------------------------------
// SANDBOX FALLBACK APP (NO NATIVE IMPORTS)
// -------------------------------------------------
// This is what actually runs by default in sandbox / browser preview.
// We mimic a tab bar using local state + emoji icons instead of any external
// icon library. That way, the sandbox doesn't attempt to load native font
// modules.
//
export default function App() {
  const [activeTab, setActiveTab] = useState('Home');

  const tabs = [
    { key: 'Home', icon: '🏠' },
    { key: 'Community', icon: '💬' },
    { key: 'Resources', icon: '📘' },
    { key: 'Profile', icon: '👤' },
  ];

  const CurrentScreen =
    activeTab === 'Home'
      ? HomeScreen
      : activeTab === 'Community'
      ? CommunityScreen
      : activeTab === 'Resources'
      ? ResourcesScreen
      : ProfileScreen;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <View style={{ flex: 1 }}>
        <CurrentScreen />
      </View>

      {/* Faux tab bar (emoji icons instead of vector icons) */}
      <View style={styles.fauxTabBar}>
        {tabs.map((tab) => {
          const focused = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.fauxTabButton}
              onPress={() => setActiveTab(tab.key)}
              accessibilityRole="button"
              accessibilityLabel={tab.key}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: focused ? COLORS.fuchsia : COLORS.textSecondary,
                  fontWeight: focused ? '700' : '600',
                }}
              >
                {tab.icon}
              </Text>
              <Text
                style={[
                  styles.fauxTabLabel,
                  { color: focused ? COLORS.fuchsia : COLORS.textSecondary },
                ]}
              >
                {tab.key}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// ---------- STYLES ----------
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  screenContent: {
    padding: 20,
    paddingBottom: 100,
  },
  appHeader: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.fuchsia,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.aqua,
    textAlign: 'center',
    marginTop: 4,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.fuchsia,
    marginBottom: 4,
  },
  sectionHint: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 20,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  cardBody: {
    gap: 8,
  },
  cardText: {
    color: COLORS.textPrimary,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
  },
  postPreview: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 8,
  },
  cardCTA: {
    marginTop: 12,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.aqua,
  },
  fauxTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingVertical: 10,
  },
  fauxTabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fauxTabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
});

// -------------------------------------------------
// BASIC SMOKE TESTS (for Jest / React Test Renderer)
// These are provided as reference. They are NOT executed in the app runtime.
// Create a file __tests__/screens.test.js and paste the code below.
// Then add Jest config for React Native / Expo if you want automated tests.
// -------------------------------------------------
//
// import React from 'react';
// import renderer from 'react-test-renderer';
// import {
//   HomeScreen,
//   CommunityScreen,
//   ResourcesScreen,
//   ProfileScreen,
// } from '../App';
//
// describe('Soft But Savage Screens render without crashing', () => {
//   it('HomeScreen shows Today’s Reminder quote', () => {
//     const tree = renderer.create(<HomeScreen />).toJSON();
//     // Expect some node in the tree contains the Divine Beauty quote
//     const textNodes = JSON.stringify(tree);
//     expect(textNodes).toContain('You were forged in pressure');
//   });
//
//   it('CommunityScreen mentions Boss Energy Index', () => {
//     const tree = renderer.create(<CommunityScreen />).toJSON();
//     const textNodes = JSON.stringify(tree);
//     expect(textNodes).toContain('Boss Energy Index');
//   });
//
//   it('ResourcesScreen references Shadow Work PDF', () => {
//     const tree = renderer.create(<ResourcesScreen />).toJSON();
//     const textNodes = JSON.stringify(tree);
//     expect(textNodes).toContain('Shadow Work: Part 1 PDF');
//   });
//
//   it('ProfileScreen shows membership status', () => {
//     const tree = renderer.create(<ProfileScreen />).toJSON();
//     const textNodes = JSON.stringify(tree);
//     expect(textNodes).toContain('Soft But Savage Premium');
//   });
// });
//
// -------------------------------------------------
// MORE TESTS WE'RE KEEPING:
// These confirm the sandbox fallback shell is rendering correct info.
// -------------------------------------------------
//
// import React from 'react';
// import renderer from 'react-test-renderer';
// import App from '../App';
//
// describe('Fallback App shell', () => {
//   it('renders without crashing and shows Soft But Savage header', () => {
//     const tree = renderer.create(<App />).toJSON();
//     const textNodes = JSON.stringify(tree);
//     expect(textNodes).toContain('Soft But Savage');
//   });
//
//   it('has faux tab labels for all 4 sections', () => {
//     const tree = renderer.create(<App />).toJSON();
//     const textNodes = JSON.stringify(tree);
//     expect(textNodes).toContain('Home');
//     expect(textNodes).toContain('Community');
//     expect(textNodes).toContain('Resources');
//     expect(textNodes).toContain('Profile');
//   });
// });
//
// -------------------------------------------------
// EXTRA TESTS (emoji tab bar rendering):
// These confirm the emoji icons render instead of native icon packs. This is
// important for sandbox safety.
// -------------------------------------------------
//
// describe('Sandbox faux tab bar visuals', () => {
//   it('uses emoji icons for tabs instead of Ionicons', () => {
//     const tree = renderer.create(<App />).toJSON();
//     const textNodes = JSON.stringify(tree);
//     expect(textNodes).toContain('🏠');
//     expect(textNodes).toContain('💬');
//     expect(textNodes).toContain('📘');
//     expect(textNodes).toContain('👤');
//   });
// });
//
// -------------------------------------------------
// QUESTION FOR YOU (to build next step):
// When a woman taps "Boss Energy Index", what EXACT behavior do you want?
// - A mood slider (1–10 for Body / Money / Boundaries / Spirit)?
// - A tap-and-go checklist ("tense / sore / energized", "secure / scared / hustling", etc.)?
// - A micro journal moment ("Where did you almost abandon yourself today?")?
//
// Tell me which version is the REAL Boss Energy Index in your vision so I can
// build that screen, save the data, and surface her trend on Profile.
