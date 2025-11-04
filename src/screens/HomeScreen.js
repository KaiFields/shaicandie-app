import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

import { COLORS } from '../theme/colors';
import { FeaturePill, SavageCard, SupportStat, BossEnergyForm, AIMentorPanel } from '../components';
import { HERO_FEATURES } from '../constants/featureData';
import { useBossEnergy } from '../context/BossEnergyContext';

export function HomeScreen() {
  const { metrics } = useBossEnergy();

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
        <View style={styles.metricRow}>
          <SupportStat label="Streak" value={`${metrics.streak} day${metrics.streak === 1 ? '' : 's'}`} />
          <SupportStat label="Body" value={metrics.weeklyAverage.body} suffix="avg" />
          <SupportStat label="Spirit" value={metrics.weeklyAverage.spirit} suffix="avg" />
        </View>
        <BossEnergyForm />
      </SavageCard>

      <AIMentorPanel style={styles.mentor} />
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
  metricRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginVertical: 8,
  },
  mentor: {
    marginBottom: 24,
  },
});
