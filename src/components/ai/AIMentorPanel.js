import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import { useAuth } from '../../context/AuthContext';
import { useBossEnergy } from '../../context/BossEnergyContext';
import { submitMentorPrompt } from '../../services/apiClient';
import { COLORS } from '../../theme/colors';

const INITIAL_SCRIPT = [
  {
    id: 'mentor-welcome',
    role: 'assistant',
    content:
      'Hi love. Take a breath. Drop a quick note about what your nervous system is carrying and I will respond with CBT prompts, affirming language, and a crisis escalation path if you need it.',
    createdAt: new Date().toISOString(),
  },
];

export function AIMentorPanel({ style }) {
  const { token } = useAuth();
  const { metrics } = useBossEnergy();
  const [messages, setMessages] = useState(INITIAL_SCRIPT);
  const [input, setInput] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const contextPayload = useMemo(
    () => ({
      latestSnapshot: metrics.latest,
      weeklyAverage: metrics.weeklyAverage,
      streak: metrics.streak,
    }),
    [metrics],
  );

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [userMessage, ...prev]);
    setInput('');
    setSubmitting(true);
    setError('');

    try {
      const response = await submitMentorPrompt({
        prompt: userMessage.content,
        context: contextPayload,
        token,
      });
      const mentorReply = {
        id: response.id ?? `mentor-${Date.now()}`,
        role: 'assistant',
        content: response.reply ?? 'Your mentor is offline. Use the crisis plan in Profile if you need immediate help.',
        createdAt: response.createdAt ?? new Date().toISOString(),
      };
      setMessages((prev) => [mentorReply, ...prev]);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={[styles.wrapper, style]}>
      <Text style={styles.heading}>AI Mood Mentor</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.message, item.role === 'assistant' ? styles.mentor : styles.user]}>
            <Text style={styles.meta}>{item.role === 'assistant' ? 'Mentor' : 'You'} · {dayjs(item.createdAt).format('HH:mm')}</Text>
            <Text style={styles.content}>{item.content}</Text>
          </View>
        )}
        inverted
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.composer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          style={styles.input}
          placeholder="Drop your trigger, win, or boundary wobble here."
          placeholderTextColor={COLORS.textSecondary}
          editable={!submitting}
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, (!input.trim() || submitting) && styles.sendDisabled]}
          onPress={handleSend}
          disabled={!input.trim() || submitting}
        >
          {submitting ? <ActivityIndicator color={COLORS.textPrimary} /> : <Text style={styles.sendText}>Send</Text>}
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

AIMentorPanel.propTypes = {
  style: PropTypes.object,
};

AIMentorPanel.defaultProps = {
  style: undefined,
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.cardAlt,
    overflow: 'hidden',
  },
  heading: {
    fontSize: 16,
    fontWeight: '800',
    padding: 20,
    color: COLORS.textPrimary,
  },
  list: {
    maxHeight: 320,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  message: {
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    gap: 4,
  },
  mentor: {
    backgroundColor: COLORS.card,
  },
  user: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  meta: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  content: {
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.textPrimary,
  },
  composer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    padding: 16,
    gap: 12,
  },
  input: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
    padding: 12,
    minHeight: 60,
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  sendButton: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.fuchsia,
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  sendDisabled: {
    opacity: 0.6,
  },
  sendText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  error: {
    color: COLORS.aqua,
    fontSize: 12,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
});
