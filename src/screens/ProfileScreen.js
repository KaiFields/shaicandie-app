import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import { COLORS } from '../theme/colors';
import { SavageCard, FeaturePill, SectionHeader, SupportStat, MilestoneChecklist } from '../components';
import { PROFILE_FEATURES, BOSS_ENERGY_MILESTONES } from '../constants/featureData';
import { useAuth } from '../context/AuthContext';
import { useBossEnergy } from '../context/BossEnergyContext';

export function ProfileScreen() {
  const { profile, signOut, refreshProfile } = useAuth();
  const { metrics } = useBossEnergy();

  const handleRefresh = async () => {
    try {
      await refreshProfile();
    } catch (error) {
      Alert.alert('Unable to refresh', error.message);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionHeader title="My Space" hint="This is your sanctuary, sis. Let it reflect you." />

      <SavageCard title={profile?.name ?? 'Member'} accentColor={COLORS.fuchsia}>
        <Text style={styles.bodyCopy}>{profile?.email ?? 'Secure member email pending sync.'}</Text>
        <View style={styles.profileStats}>
          <SupportStat label="Body" value={metrics.latest?.body ?? 5} suffix="today" />
          <SupportStat label="Money" value={metrics.latest?.money ?? 5} suffix="today" />
          <SupportStat label="Boundaries" value={metrics.latest?.boundaries ?? 5} suffix="today" />
          <SupportStat label="Spirit" value={metrics.latest?.spirit ?? 5} suffix="today" />
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.primaryCta} onPress={handleRefresh} accessibilityRole="button">
            <Text style={styles.primaryCtaText}>Sync profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryCta} onPress={signOut} accessibilityRole="button">
            <Text style={styles.secondaryCtaText}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </SavageCard>

      {PROFILE_FEATURES.map((feature) => (
        <SavageCard key={feature.title} title={feature.title} accentColor={feature.accentColor} tone={feature.tone}>
          <Text style={styles.bodyCopy}>{feature.description}</Text>
          {feature.pills?.length ? (
            <View style={styles.pills}>
              {feature.pills.map((pill) => (
                <FeaturePill key={pill.label} icon={pill.icon} label={pill.label} />
              ))}
            </View>
          ) : null}
        </SavageCard>
      ))}

      <SavageCard title="Wellness Milestones" accentColor={COLORS.aqua} tone="mint">
        <Text style={styles.bodyCopy}>
          Track the rituals that prove you are honoring softness and strategy. Toggle when you complete each milestone today.
        </Text>
        <MilestoneChecklist items={BOSS_ENERGY_MILESTONES} />
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
  bodyCopy: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.textPrimary,
  },
  profileStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
  },
  pills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  primaryCta: {
    flex: 1,
    backgroundColor: COLORS.fuchsia,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryCtaText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  secondaryCta: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryCtaText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
});
