import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

import { useBossEnergy } from '../context/BossEnergyContext';
import { COLORS } from '../theme/colors';
import { MoodTracker } from './MoodTracker';

export function BossEnergyForm() {
  const { metrics, recordEntry } = useBossEnergy();
  const [scores, setScores] = useState({
    Body: metrics.latest?.body ?? 5,
    Money: metrics.latest?.money ?? 5,
    Boundaries: metrics.latest?.boundaries ?? 5,
    Spirit: metrics.latest?.spirit ?? 5,
  });
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [confirmation, setConfirmation] = useState('');

  const canSubmit = useMemo(() => !saving && notes.trim().length >= 0, [saving, notes]);

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSaving(true);
    try {
      recordEntry({
        body: scores.Body,
        money: scores.Money,
        boundaries: scores.Boundaries,
        spirit: scores.Spirit,
        notes,
      });
      setNotes('');
      setConfirmation('Boss Energy snapshot saved. The mentor is recalibrating.');
      setTimeout(() => setConfirmation(''), 4000);
    } catch (error) {
      setConfirmation(error.message || 'Unable to save snapshot right now.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.wrapper}>
      <MoodTracker initialScores={scores} onSnapshotChange={setScores} />
      <View style={styles.notesBlock}>
        <Text style={styles.notesLabel}>Micro journal — where did you almost abandon yourself today?</Text>
        <TextInput
          value={notes}
          onChangeText={setNotes}
          placeholder="Write a 2-minute download so we can trend your healing wins."
          placeholderTextColor={COLORS.textSecondary}
          style={styles.notesInput}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>
      <TouchableOpacity
        style={[styles.submitButton, !canSubmit && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={!canSubmit}
        accessibilityRole="button"
        accessibilityLabel="Save Boss Energy Index entry"
      >
        {saving ? <ActivityIndicator color={COLORS.textPrimary} /> : <Text style={styles.submitText}>Save snapshot</Text>}
      </TouchableOpacity>
      {confirmation ? <Text style={styles.confirmation}>{confirmation}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 16,
  },
  notesBlock: {
    gap: 8,
  },
  notesLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  notesInput: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.cardAlt,
    padding: 16,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  submitButton: {
    borderRadius: 16,
    backgroundColor: COLORS.fuchsia,
    paddingVertical: 14,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  submitText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  confirmation: {
    fontSize: 12,
    color: COLORS.aqua,
  },
});
