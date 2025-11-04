import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { useBossEnergy } from '../context/BossEnergyContext';
import { COLORS } from '../theme/colors';

export function MilestoneChecklist({ items }) {
  const { milestones, toggleMilestone } = useBossEnergy();

  return (
    <View style={styles.wrapper}>
      {items.map((item) => {
        const checked = milestones.includes(item.id);
        return (
          <TouchableOpacity
            key={item.id}
            style={[styles.item, checked && styles.checkedItem]}
            onPress={() => toggleMilestone(item.id)}
            accessibilityRole="checkbox"
            accessibilityState={{ checked }}
            accessibilityLabel={item.title}
          >
            <Text style={styles.icon}>{checked ? '✨' : '○'}</Text>
            <View style={styles.copy}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

MilestoneChecklist.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

const styles = StyleSheet.create({
  wrapper: {
    gap: 12,
  },
  item: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.cardAlt,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  checkedItem: {
    borderColor: COLORS.fuchsia,
    backgroundColor: COLORS.card,
  },
  icon: {
    fontSize: 18,
  },
  copy: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  description: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});
