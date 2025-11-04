import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import PropTypes from 'prop-types';

import { COLORS } from '../theme/colors';

const DIMENSIONS = ['Body', 'Money', 'Boundaries', 'Spirit'];

export function MoodTracker({ initialScores, onSnapshotChange }) {
  const [snapshot, setSnapshot] = useState(initialScores);

  useEffect(() => {
    setSnapshot(initialScores);
  }, [initialScores]);

  const scoreAverage = useMemo(() => {
    const total = DIMENSIONS.reduce((sum, dimension) => sum + snapshot[dimension], 0);
    return Math.round((total / DIMENSIONS.length) * 10) / 10;
  }, [snapshot]);

  const cycleScore = (dimension) => {
    setSnapshot((prev) => {
      const nextScore = prev[dimension] >= 10 ? 1 : prev[dimension] + 1;
      const nextSnapshot = { ...prev, [dimension]: nextScore };
      if (onSnapshotChange) {
        onSnapshotChange(nextSnapshot);
      }
      return nextSnapshot;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {DIMENSIONS.map((dimension) => {
          const score = snapshot[dimension];
          return (
            <Pressable
              key={dimension}
              onPress={() => cycleScore(dimension)}
              style={({ pressed }) => [styles.tile, pressed && styles.pressedTile]}
              accessibilityRole="button"
              accessibilityLabel={`${dimension} score ${score} out of 10. Double tap to increase.`}
            >
              <Text style={styles.dimension}>{dimension}</Text>
              <Text style={styles.score}>{score}/10</Text>
              <Text style={styles.hint}>Tap to adjust</Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={styles.footer}>
        Average mood score today: <Text style={styles.highlight}>{scoreAverage}</Text>. The AI Mood
        Mentor personalizes CBT prompts and somatic resets from this snapshot.
      </Text>
    </View>
  );
}

MoodTracker.propTypes = {
  initialScores: PropTypes.shape({
    Body: PropTypes.number,
    Money: PropTypes.number,
    Boundaries: PropTypes.number,
    Spirit: PropTypes.number,
  }),
  onSnapshotChange: PropTypes.func,
};

MoodTracker.defaultProps = {
  initialScores: { Body: 7, Money: 6, Boundaries: 8, Spirit: 9 },
  onSnapshotChange: undefined,
};

const styles = StyleSheet.create({
  container: {
    gap: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tile: {
    flexGrow: 1,
    minWidth: 120,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: COLORS.cardAlt,
    gap: 8,
  },
  pressedTile: {
    transform: [{ scale: 0.97 }],
  },
  dimension: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  score: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.fuchsia,
  },
  hint: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  footer: {
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.textSecondary,
  },
  highlight: {
    color: COLORS.purple,
    fontWeight: '700',
  },
});
