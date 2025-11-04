// Soft But Savage: The ShaiCandie Rebirth Lounge
// Mobile App (Expo / React Native)
// -------------------------------------------------
// UPDATED DEBUG BUILD (Sandbox-Safe v4)
// -------------------------------------------------
// This build keeps the sandbox-friendly approach (no native imports) while
// showcasing the expanded vision for Soft But Savage: minimalist, modern, and
// powered by AI wellness features. All copy and layout updates lean into the
// female-chic aesthetic with roomy spacing, pastel tones, and kinetic type.
//
// HOW TO SHIP TO A REAL ANDROID PHONE:
// 1. npx create-expo-app soft-but-savage
// 2. cd soft-but-savage
// 3. npx expo install @react-navigation/native @react-navigation/bottom-tabs
// 4. npx expo install react-native-safe-area-context react-native-screens
// 5. npx expo install @expo/vector-icons
// 6. Paste this file into App.js
// 7. UNCOMMENT the "REAL NAVIGATION APP" block below and delete the sandbox
//    fallback <App /> implementation.
// 8. npx expo start --android
// 9. Open the app in Expo Go on your Android phone.
//
// NOTES FOR THE SANDBOX:
// - We only rely on React Native primitives so the restricted bundler never
//   attempts to load native modules.
// - Emoji icons continue to replace vector font packs inside the faux tab bar.
// - The new UI highlights AI mood tracking, video therapy rooms, avatar
//   creation, courses, and a boutique shop—mirroring the long-term roadmap.

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

// ---------- BRAND THEME (PASTEL + CHIC) ----------
const COLORS = {
  bg: '#F8F6FF',
  card: '#FFFFFF',
  border: '#E3DAFF',
  textPrimary: '#1F1147',
  textSecondary: '#6D5CA6',
  softBlush: '#FFD6E8',
  aqua: '#79F2FF',
  lilac: '#C8B6FF',
  fuchsia: '#FF38B5',
  purple: '#7B5CFF',
  mint: '#C7FFE1',
};

// ---------- REUSABLE BUILDING BLOCKS ----------
function SavageCard({ title, accentColor, children, tone = 'default', onPress }) {
  const cardStyle = [
    styles.card,
    tone === 'gradient' && { backgroundColor: COLORS.softBlush },
    tone === 'mint' && { backgroundColor: COLORS.mint },
    { borderColor: accentColor || COLORS.lilac },
  ];

  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.86 : 1}
      onPress={onPress}
      style={cardStyle}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={title}
    >
      <Text style={[styles.cardTitle, { color: accentColor || COLORS.purple }]}>{title}</Text>
      <View style={styles.cardBody}>{children}</View>
    </TouchableOpacity>
  );
}

function FeaturePill({ icon, label }) {
  return (
    <View style={styles.featurePill}>
      <Text style={styles.featurePillIcon}>{icon}</Text>
      <Text style={styles.featurePillLabel}>{label}</Text>
    </View>
  );
}

function SupportStat({ value, label, hint }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
      {hint ? <Text style={styles.statHint}>{hint}</Text> : null}
    </View>
  );
}

function MoodTracker() {
  const [snapshot, setSnapshot] = useState({
    Body: 7,
    Money: 6,
    Boundaries: 8,
    Spirit: 9,
  });

  const cycleScore = (dimension) => {
    setSnapshot((prev) => {
      const nextScore = prev[dimension] >= 10 ? 1 : prev[dimension] + 1;
      return { ...prev, [dimension]: nextScore };
    });
  };

  return (
    <View style={styles.moodTracker}>
      <View style={styles.moodGrid}>
        {Object.entries(snapshot).map(([dimension, score]) => (
          <TouchableOpacity
            key={dimension}
            style={styles.moodTile}
            onPress={() => cycleScore(dimension)}
            accessibilityRole="button"
            accessibilityLabel={`${dimension} score: ${score} of 10. Tap to adjust.`}
          >
            <Text style={styles.moodLabel}>{dimension}</Text>
            <Text style={styles.moodValue}>{score}/10</Text>
            <Text style={styles.moodHint}>Tap to nudge</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.moodFootnote}>
        The AI Mood Mentor combines these scores with your journal cues to deliver CBT-style prompts
        and nervous system care plans.
      </Text>
    </View>
  );
}

// ---------- HOME SCREEN ----------
export function HomeScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />

      <View style={styles.heroSection}>
        <Text style={styles.appHeader}>Soft But Savage</Text>
        <Text style={styles.tagline}>The ShaiCandie Rebirth Lounge</Text>
        <Text style={styles.subtitle}>
          A dynamic sanctuary for women building resilience, softness, and strategy with AI-powered
          care, therapy protection, and glam community energy.
        </Text>

        <View style={styles.featureRow}>
          <FeaturePill icon="🤍" label="AI Mood Mentor" />
          <FeaturePill icon="🎥" label="Video Circles" />
          <FeaturePill icon="🛍️" label="Boutique Shop" />
        </View>
      </View>

      <SavageCard title="Boss Energy Index" accentColor={COLORS.purple} tone="gradient">
        <Text style={styles.cardText}>
          Track how your body, money, boundaries, and spirit feel in real time. Each tap cycles the
          intensity so the lounge can tailor meditations, mantras, and weekly plans.
        </Text>
        <MoodTracker />
      </SavageCard>

      <SavageCard title="AI Mood Mentor" accentColor={COLORS.fuchsia}>
        <Text style={styles.cardText}>
          Meet your always-on guide trained in trauma-informed care. She delivers compassionate CBT,
          attachment repair tips, and celebratory reminders using your data—not generic scripts.
        </Text>
        <View style={styles.featureRow}>
          <FeaturePill icon="🧠" label="CBT Micro-Coaching" />
          <FeaturePill icon="💌" label="Voice Affirmations" />
          <FeaturePill icon="💤" label="Sleep Rituals" />
        </View>
      </SavageCard>

      <SavageCard title="Daily Gentle Challenge" accentColor={COLORS.aqua} tone="mint">
        <Text style={styles.cardText}>
          Unlock mindful games, breathwork quests, and community dares that help you keep your soft
          power sharp. Completing streaks triggers luxury self-care rewards.
        </Text>
        <View style={styles.featureRow}>
          <FeaturePill icon="🌙" label="Evening Reset" />
          <FeaturePill icon="🔥" label="Shadow Prompt" />
          <FeaturePill icon="💎" label="Reward Vault" />
        </View>
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
        Live video salons, avatar meetups, and threaded conversations designed for softness and
        strategy.
      </Text>

      <SavageCard
        title="Interactive Posting Feed"
        accentColor={COLORS.fuchsia}
        onPress={() => {
          console.log('Open interactive feed with polls, clips, and audio rooms');
        }}
      >
        <Text style={styles.cardText}>
          Share voice notes, mini reels, and screen-shared wins. Posts auto-caption for accessibility
          and surface AI reflection prompts.
        </Text>
        <View style={styles.featureRow}>
          <FeaturePill icon="📹" label="Clip Uploads" />
          <FeaturePill icon="🗳️" label="Energy Polls" />
          <FeaturePill icon="✨" label="AI Highlights" />
        </View>
      </SavageCard>

      <SavageCard
        title="Video Therapy Sanctuaries"
        accentColor={COLORS.purple}
        onPress={() => {
          console.log('Launch secure video chat rooms for therapists and members');
        }}
      >
        <Text style={styles.cardText}>
          HIPAA-ready rooms with co-regulation timers, whiteboard journaling, and panic-button support
          that alerts your chosen guardians.
        </Text>
        <View style={styles.statsRow}>
          <SupportStat value="256-bit" label="Encryption" />
          <SupportStat value="SOS" label="Panic Mode" hint="Location safe share" />
          <SupportStat value="Co-Op" label="Screen Share" />
        </View>
      </SavageCard>

      <SavageCard
        title="Avatar Studio & Co-Working"
        accentColor={COLORS.aqua}
        onPress={() => {
          console.log('Open avatar customization and focus rooms');
        }}
      >
        <Text style={styles.cardText}>
          Craft animated lookbooks with voice cloning, then join focus tables where your avatar hosts
          body-doubling sessions.
        </Text>
        <View style={styles.featureRow}>
          <FeaturePill icon="🧜‍♀️" label="Custom Avatars" />
          <FeaturePill icon="🕰️" label="50-min Sprints" />
          <FeaturePill icon="🎧" label="Lo-fi Rooms" />
        </View>
      </SavageCard>
    </ScrollView>
  );
}

// ---------- RESOURCES SCREEN ----------
export function ResourcesScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
      <Text style={styles.sectionHeader}>Courses • Library • Boutique</Text>
      <Text style={styles.sectionHint}>
        Guided workshops, mental wellness audio, and the Soft But Savage commerce experience.
      </Text>

      <SavageCard
        title="Therapy-Aligned Courses"
        accentColor={COLORS.purple}
        onPress={() => {
          console.log('Navigate to interactive course platform');
        }}
      >
        <Text style={styles.cardText}>
          Stream mastery tracks on boundaries, financial softness, and sensual entrepreneurship. Each
          module syncs with your Boss Energy Index to adapt homework.
        </Text>
        <View style={styles.featureRow}>
          <FeaturePill icon="📝" label="Interactive Lessons" />
          <FeaturePill icon="🧩" label="Trauma-Informed" />
          <FeaturePill icon="📈" label="Progress Maps" />
        </View>
      </SavageCard>

      <SavageCard
        title="Audio Prayers & Breath Library"
        accentColor={COLORS.fuchsia}
        onPress={() => {
          console.log('Play curated prayers, affirmations, and breathwork');
        }}
      >
        <Text style={styles.cardText}>
          Binaural mixes, gentle prayers, and somatic resets recorded by ShaiCandie and therapist
          partners. Queue them for morning, midday, or midnight rescue.
        </Text>
        <View style={styles.featureRow}>
          <FeaturePill icon="🎧" label="3D Audio" />
          <FeaturePill icon="🕯️" label="Calming Scenes" />
          <FeaturePill icon="🔁" label="Smart Routines" />
        </View>
      </SavageCard>

      <SavageCard
        title="Soft But Savage Boutique"
        accentColor={COLORS.aqua}
        onPress={() => {
          console.log('Open e-commerce experience for self-care kits and merch');
        }}
      >
        <Text style={styles.cardText}>
          Shop ritual boxes, therapy journals, membership add-ons, and VIP retreat passes. Built with
          secure checkout and fulfillment alerts.
        </Text>
        <View style={styles.statsRow}>
          <SupportStat value="1-Click" label="Checkout" />
          <SupportStat value="Members" label="Exclusive Drops" />
          <SupportStat value="Sync" label="Multi-Device" />
        </View>
      </SavageCard>
    </ScrollView>
  );
}

// ---------- PROFILE SCREEN ----------
export function ProfileScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
      <Text style={styles.sectionHeader}>My Soft Power Profile</Text>
      <Text style={styles.sectionHint}>
        Personalize your avatar, manage therapy support, and celebrate every milestone.
      </Text>

      <SavageCard title="Avatar & Identity" accentColor={COLORS.fuchsia}>
        <Text style={styles.cardText}>
          Update your animated persona, upload new voice prints, and script how she greets the room.
          Toggle between business glam and cozy home vibes anytime.
        </Text>
        <View style={styles.featureRow}>
          <FeaturePill icon="🪞" label="Lookbook Modes" />
          <FeaturePill icon="🎙️" label="Voice Clone" />
          <FeaturePill icon="🖌️" label="Illustrated Packs" />
        </View>
      </SavageCard>

      <SavageCard title="Therapy Protection" accentColor={COLORS.purple}>
        <Text style={styles.cardText}>
          Secure notes, crisis contacts, and breathing scripts live here. Activate guardian alerts and
          share session summaries with your licensed team.
        </Text>
        <View style={styles.statsRow}>
          <SupportStat value="HIPAA" label="Cloud" />
          <SupportStat value="Dual" label="Device Sync" />
          <SupportStat value="Safe" label="Encrypted Vault" />
        </View>
      </SavageCard>

      <SavageCard title="Wellness Milestones" accentColor={COLORS.aqua} tone="mint">
        <Text style={styles.cardText}>
          Review your challenge streaks, gratitude logs, and Boss Energy Index trends. Export wins to
          share with your therapist or accountability circle.
        </Text>
        <View style={styles.featureRow}>
          <FeaturePill icon="🏆" label="Challenge Streaks" />
          <FeaturePill icon="📊" label="Trend Reports" />
          <FeaturePill icon="💖" label="Love Notes" />
        </View>
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
//             paddingBottom: 10,
//             paddingTop: 10,
//             height: 70,
//           },
//           tabBarActiveTintColor: COLORS.fuchsia,
//           tabBarInactiveTintColor: COLORS.textSecondary,
//           tabBarIcon: ({ color, size, focused }) => {
//             let iconName = 'home';
//             if (route.name === 'Home') {
//               iconName = focused ? 'flower' : 'flower-outline';
//             } else if (route.name === 'Community') {
//               iconName = focused ? 'people' : 'people-outline';
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

// -------------------------------------------------
// SANDBOX FALLBACK APP (NO NATIVE IMPORTS)
// -------------------------------------------------
export default function App() {
  const [activeTab, setActiveTab] = useState('Home');

  const tabs = [
    { key: 'Home', icon: '🌸' },
    { key: 'Community', icon: '🤝' },
    { key: 'Resources', icon: '📚' },
    { key: 'Profile', icon: '💫' },
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
                  fontSize: 20,
                  color: focused ? COLORS.fuchsia : COLORS.textSecondary,
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
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 120,
    gap: 20,
  },
  heroSection: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#4E3BA6',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 2,
    gap: 16,
  },
  appHeader: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.fuchsia,
    textAlign: 'center',
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.fuchsia,
  },
  sectionHint: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: -4,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
    gap: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  cardBody: {
    gap: 16,
  },
  cardText: {
    color: COLORS.textPrimary,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '500',
  },
  featureRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featurePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: COLORS.lilac,
  },
  featurePillIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  featurePillLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.card,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flexGrow: 1,
    minWidth: 100,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    backgroundColor: '#F2EDFF',
    gap: 6,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statHint: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  moodTracker: {
    gap: 12,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  moodTile: {
    flexGrow: 1,
    minWidth: 120,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: '#EFE8FF',
    gap: 8,
  },
  moodLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  moodValue: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.fuchsia,
  },
  moodHint: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  moodFootnote: {
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.textSecondary,
  },
  fauxTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingVertical: 12,
  },
  fauxTabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  fauxTabLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
});

// -------------------------------------------------
// UPDATED REFERENCE TESTS (for Jest / React Test Renderer)
// -------------------------------------------------
// import React from 'react';
// import renderer from 'react-test-renderer';
// import { HomeScreen, CommunityScreen, ResourcesScreen, ProfileScreen } from '../App';
//
// describe('Soft But Savage Screens render without crashing', () => {
//   it('HomeScreen surfaces Boss Energy Index copy', () => {
//     const tree = renderer.create(<HomeScreen />).toJSON();
//     const textNodes = JSON.stringify(tree);
//     expect(textNodes).toContain('Boss Energy Index');
//   });
//
//   it('CommunityScreen highlights Video Therapy Sanctuaries', () => {
//     const tree = renderer.create(<CommunityScreen />).toJSON();
//     const textNodes = JSON.stringify(tree);
//     expect(textNodes).toContain('Video Therapy Sanctuaries');
//   });
//
//   it('ResourcesScreen promotes the Soft But Savage Boutique', () => {
//     const tree = renderer.create(<ResourcesScreen />).toJSON();
//     const textNodes = JSON.stringify(tree);
//     expect(textNodes).toContain('Soft But Savage Boutique');
//   });
//
//   it('ProfileScreen shows the Therapy Protection hub copy', () => {
//     const tree = renderer.create(<ProfileScreen />).toJSON();
//     const textNodes = JSON.stringify(tree);
//     expect(textNodes).toContain('Therapy Protection');
//   });
// });
//
// describe('Sandbox faux tab bar visuals', () => {
//   it('uses emoji icons for tabs instead of Ionicons', () => {
//     const tree = renderer.create(<App />).toJSON();
//     const textNodes = JSON.stringify(tree);
//     expect(textNodes).toContain('🌸');
//     expect(textNodes).toContain('🤝');
//     expect(textNodes).toContain('📚');
//     expect(textNodes).toContain('💫');
//   });
// });
