import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { COLORS } from '../theme/colors';

export function SupportStat({ value, label, hint, suffix }) {
  const displayValue = suffix ? `${value} ${suffix}` : value;
  return (
    <View style={styles.container}>
      <Text style={styles.value}>{displayValue}</Text>
      <Text style={styles.label}>{label}</Text>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

SupportStat.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  hint: PropTypes.string,
  suffix: PropTypes.string,
};

SupportStat.defaultProps = {
  hint: undefined,
  suffix: undefined,
};

const styles = StyleSheet.create({
  container: {
    minWidth: 120,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.cardAlt,
    gap: 6,
  },
  value: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: COLORS.textSecondary,
  },
  hint: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});
