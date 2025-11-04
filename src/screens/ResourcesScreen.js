import React from 'react';
import { ScrollView, View, Text, StyleSheet, Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import { COLORS } from '../theme/colors';
import { SavageCard, FeaturePill, SectionHeader, CourseCatalog, ProductShowcase } from '../components';
import { RESOURCE_FEATURES } from '../constants/featureData';

export function ResourcesScreen() {
  const handleOpenCourse = (course) => {
    if (course?.deeplink) {
      WebBrowser.openBrowserAsync(course.deeplink);
    } else {
      Alert.alert('Course coming soon', `${course.title} will unlock after onboarding.`);
    }
  };

  const handleCheckout = (product) => {
    if (product?.checkoutUrl) {
      WebBrowser.openBrowserAsync(product.checkoutUrl);
    } else {
      Alert.alert('Add to cart', `${product.title} will be available when commerce is connected.`);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionHeader title="Tools & Healing Library" hint="Downloadables, journal pages, voice notes, slides." />

      {RESOURCE_FEATURES.map((feature) => (
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

      <SavageCard title="Course Studio" accentColor={COLORS.purple} tone="blush">
        <Text style={styles.bodyCopy}>
          Stream therapist-authored workshops in-app. We sync progress to your Boss Energy Index so homework adapts to your nervous system trends.
        </Text>
        <CourseCatalog onOpenCourse={handleOpenCourse} />
      </SavageCard>

      <SavageCard title="Boutique Shop" accentColor={COLORS.aqua} tone="mint">
        <Text style={styles.bodyCopy}>
          Shop curated ritual boxes, digital downloads, and premium services that align with your current healing season.
        </Text>
        <ProductShowcase onCheckout={handleCheckout} />
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
  pills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
});
