import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import PropTypes from 'prop-types';

import { useAuth } from '../../context/AuthContext';
import { fetchCourses } from '../../services/apiClient';
import { COLORS } from '../../theme/colors';

export function CourseCatalog({ onOpenCourse }) {
  const { token } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const response = await fetchCourses({ token });
        if (!mounted) return;
        setCourses(response?.data ?? []);
      } catch (err) {
        if (!mounted) return;
        setError(err.message || 'Unable to load courses');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [token]);

  if (loading) {
    return (
      <View style={styles.state}>
        <ActivityIndicator color={COLORS.fuchsia} />
        <Text style={styles.stateText}>Curating new lessons…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.state}>
        <Text style={styles.stateText}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={courses}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => onOpenCourse?.(item)}
          accessibilityRole="button"
          accessibilityLabel={`Open course ${item.title}`}
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
          <Text style={styles.meta}>{item.duration} • {item.level}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

CourseCatalog.propTypes = {
  onOpenCourse: PropTypes.func,
};

CourseCatalog.defaultProps = {
  onOpenCourse: undefined,
};

const styles = StyleSheet.create({
  list: {
    paddingVertical: 4,
    gap: 16,
  },
  card: {
    width: 220,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.cardAlt,
    padding: 16,
    marginRight: 16,
    gap: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.textSecondary,
  },
  meta: {
    fontSize: 12,
    color: COLORS.aqua,
  },
  state: {
    padding: 24,
    alignItems: 'center',
    gap: 8,
  },
  stateText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
});
