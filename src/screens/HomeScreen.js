import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

import { COLORS } from '../theme/colors';
import { FeaturePill, MoodTracker, SavageCard } from '../components';
import { HERO_FEATURES } from '../constants/featureData';

export function HomeScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      testID="home-screen"
    >
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Soft But Savage</Text>
        <Text style={styles.heroSubtitle}>The ShaiCandie Rebirth Lounge</Text>
        <Text style={styles.heroCopy}>
          A dynamic sanctuary for women building resilience, softness, and strategy with AI-powered
          care, therapy protection, and glam community energy.
        </Text>
        <View style={styles.heroPills}>
          {HERO_FEATURES.map(({ icon, label }) => (
            <FeaturePill key={label} icon={icon} label={label} />
          ))}
        </View>
      </View>

      <SavageCard title="Boss Energy Index" accentColor={COLORS.purple} tone="blush">
        <Text style={styles.bodyCopy}>
          Track how your body, money, boundaries, and spirit feel in real time. Each tap cycles the
          intensity so the lounge can tailor meditations, mantras, and weekly plans.
        </Text>
        <MoodTracker />
      </SavageCard>

      <SavageCard title="AI Mood Mentor" accentColor={COLORS.fuchsia}>
        <Text style={styles.bodyCopy}>
          Meet your always-on guide trained in trauma-informed care. She delivers compassionate CBT,
          attachment repair tips, and celebratory reminders using your data—not generic scripts.
        </Text>
        <View style={styles.pillRow}>
          <FeaturePill icon="🧠" label="CBT Micro-Coaching" />
          <FeaturePill icon="💌" label="Voice Affirmations" />
          <FeaturePill icon="💤" label="Sleep Rituals" />
        </View>
      </SavageCard>

      <SavageCard title="Daily Gentle Challenge" accentColor={COLORS.aqua} tone="mint">
        <Text style={styles.bodyCopy}>
          Unlock mindful games, breathwork quests, and community dares that help you keep your soft
          power sharp. Completing streaks triggers luxury self-care rewards.
        </Text>
        <View style={styles.pillRow}>
          <FeaturePill icon="🌙" label="Evening Reset" />
          <FeaturePill icon="🔥" label="Shadow Prompt" />
          <FeaturePill icon="💎" label="Reward Vault" />
        </View>
      </SavageCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 24,
    gap: 24,
    paddingBottom: 160,
  },
  hero: {
    borderRadius: 28,
    padding: 28,
    gap: 16,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: 0.6,
  },
  heroSubtitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.purple,
    letterSpacing: 0.4,
  },
  heroCopy: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.textSecondary,
  },
  heroPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  bodyCopy: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.textPrimary,
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});
