import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { useAuth } from '../../context/AuthContext';
import { fetchProducts } from '../../services/apiClient';
import { COLORS } from '../../theme/colors';

export function ProductShowcase({ onCheckout }) {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const response = await fetchProducts({ token });
        if (!mounted) return;
        setProducts(response?.data ?? []);
      } catch (err) {
        if (!mounted) return;
        setError(err.message || 'Unable to load shop');
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
        <Text style={styles.stateText}>Stocking the boutique…</Text>
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
    <View style={styles.wrapper}>
      {products.map((product) => (
        <View key={product.id} style={styles.item}>
          <View style={styles.meta}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.price}>{product.price}</Text>
          </View>
          <TouchableOpacity
            style={styles.cta}
            onPress={() => onCheckout?.(product)}
            accessibilityRole="button"
            accessibilityLabel={`Checkout ${product.title}`}
          >
            <Text style={styles.ctaText}>Add to cart</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

ProductShowcase.propTypes = {
  onCheckout: PropTypes.func,
};

ProductShowcase.defaultProps = {
  onCheckout: undefined,
};

const styles = StyleSheet.create({
  wrapper: {
    gap: 16,
  },
  item: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.cardAlt,
    padding: 18,
    gap: 12,
  },
  meta: {
    gap: 6,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.textSecondary,
  },
  price: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.aqua,
  },
  cta: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: COLORS.fuchsia,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  ctaText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
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
