import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

import { COLORS } from '../theme/colors';
import { FeaturePill, SavageCard, SectionHeader, SupportStat } from '../components';
import { PROFILE_FEATURES } from '../constants/featureData';

export function ProfileScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionHeader
        title="My Soft Power Profile"
        subtitle="Personalize your avatar, manage therapy support, and celebrate every milestone."
      />

      {PROFILE_FEATURES.map((feature) => (
        <SavageCard
          key={feature.title}
          title={feature.title}
          accentColor={feature.accentColor}
          tone={feature.tone}
          onPress={() => console.log(`Navigate to ${feature.title}`)}
        >
          <Text style={styles.copy}>{feature.description}</Text>
          {feature.pills.length > 0 ? (
            <View style={styles.row}>
              {feature.pills.map((pill) => (
                <FeaturePill key={pill.label} icon={pill.icon} label={pill.label} />
              ))}
            </View>
          ) : null}
          {feature.analytics.length > 0 ? (
            <View style={styles.statRow}>
              {feature.analytics.map((stat) => (
                <SupportStat key={stat.label} value={stat.value} label={stat.label} hint={stat.hint} />
              ))}
            </View>
          ) : null}
        </SavageCard>
      ))}
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
  copy: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.textPrimary,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
});
