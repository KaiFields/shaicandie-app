import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

import { COLORS } from '../theme/colors';
import { SavageCard, FeaturePill, SupportStat, SectionHeader, VideoSanctuaryCard } from '../components';
import { COMMUNITY_FEATURES } from '../constants/featureData';

export function CommunityScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionHeader
        title="Community Lounge"
        hint='Private. Safe. No performative "be strong" culture. Just real.'
      />

      {COMMUNITY_FEATURES.map((feature) => (
        <SavageCard key={feature.title} title={feature.title} accentColor={feature.accentColor}>
          <Text style={styles.bodyCopy}>{feature.description}</Text>
          {feature.pills?.length ? (
            <View style={styles.pills}>
              {feature.pills.map((pill) => (
                <FeaturePill key={pill.label} icon={pill.icon} label={pill.label} />
              ))}
            </View>
          ) : null}
          {feature.analytics?.length ? (
            <View style={styles.analytics}>
              {feature.analytics.map((metric) => (
                <SupportStat key={metric.label} label={metric.label} value={metric.value} hint={metric.hint} />
              ))}
            </View>
          ) : null}
        </SavageCard>
      ))}

      <VideoSanctuaryCard
        roomId="boss-energy-therapy"
        title="Video Therapy Sanctuary"
        description="Tap to join your secure Daily-powered room for therapist, guardian, or avatar co-regulation."
      />
      <VideoSanctuaryCard
        roomId="soft-power-cowork"
        title="Soft Power Co-Working"
        description="Host avatar meetups and body-doubling sprints with screen share and rituals."
      />
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
    paddingBottom: 140,
  },
  bodyCopy: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.textPrimary,
  },
  pills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  analytics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
  },
});
