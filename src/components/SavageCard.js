import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { COLORS } from '../theme/colors';

export function SavageCard({
  title,
  accentColor = COLORS.purple,
  tone = 'default',
  onPress,
  children,
}) {
  const containerStyle = [
    styles.container,
    tone === 'blush' && styles.blush,
    tone === 'mint' && styles.mint,
    { borderColor: accentColor },
  ];

  const Wrapper = onPress ? Pressable : View;
  const wrapperProps =
    onPress
      ? {
          onPress,
          style: ({ pressed }) => [containerStyle, pressed && styles.pressed],
          accessibilityRole: 'button',
          accessibilityLabel: title,
        }
      : { style: containerStyle };

  return (
    <Wrapper {...wrapperProps}>
      <Text style={[styles.title, { color: accentColor }]} accessibilityRole="header">
        {title}
      </Text>
      <View style={styles.body}>{children}</View>
    </Wrapper>
  );
}

SavageCard.propTypes = {
  title: PropTypes.string.isRequired,
  accentColor: PropTypes.string,
  tone: PropTypes.oneOf(['default', 'blush', 'mint']),
  onPress: PropTypes.func,
  children: PropTypes.node.isRequired,
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 20,
    backgroundColor: COLORS.card,
    gap: 16,
  },
  blush: {
    backgroundColor: COLORS.blush,
  },
  mint: {
    backgroundColor: COLORS.mint,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  body: {
    gap: 12,
  },
  pressed: {
    opacity: 0.86,
  },
});
