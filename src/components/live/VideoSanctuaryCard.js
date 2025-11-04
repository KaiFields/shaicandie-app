import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';

import { useAuth } from '../../context/AuthContext';
import { getVideoRoomUrl } from '../../services/apiClient';
import { COLORS } from '../../theme/colors';

export function VideoSanctuaryCard({ roomId, title, description }) {
  const { token } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [configError, setConfigError] = useState('');
  const [roomUrl, setRoomUrl] = useState(null);

  useEffect(() => {
    try {
      const url = getVideoRoomUrl({ roomId, token });
      setRoomUrl(url);
      setConfigError('');
    } catch (error) {
      setRoomUrl(null);
      setConfigError(error.message);
    }
  }, [roomId, token]);

  if (configError) {
    return (
      <View style={[styles.wrapper, styles.errorWrapper]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{configError}</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.header} onPress={() => setOpen((prev) => !prev)}>
        <View style={styles.meta}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <Text style={styles.toggle}>{open ? 'Hide' : 'Join'}</Text>
      </TouchableOpacity>
      {open && roomUrl ? (
        <View style={styles.player}>
          {loading ? (
            <View style={styles.loading}>
              <ActivityIndicator color={COLORS.fuchsia} />
              <Text style={styles.loadingText}>Securing sanctuary…</Text>
            </View>
          ) : null}
          <WebView
            source={{ uri: roomUrl }}
            onLoadEnd={() => setLoading(false)}
            style={styles.webview}
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction={false}
          />
        </View>
      ) : null}
    </View>
  );
}

VideoSanctuaryCard.propTypes = {
  roomId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    overflow: 'hidden',
  },
  errorWrapper: {
    padding: 20,
    gap: 8,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  meta: {
    flex: 1,
    gap: 6,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  description: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  toggle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.aqua,
  },
  player: {
    height: 240,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(15, 15, 16, 0.6)',
    zIndex: 2,
  },
  loadingText: {
    fontSize: 12,
    color: COLORS.textPrimary,
  },
  webview: {
    flex: 1,
  },
});
