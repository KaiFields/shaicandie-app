import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import PropTypes from 'prop-types';

import { COLORS } from '../../theme/colors';
import { useAuth } from '../../context/AuthContext';

export function SignInScreen({ navigation }) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Missing info', 'Email and password are required.');
      return;
    }
    setLoading(true);
    try {
      await signIn({ email, password });
    } catch (error) {
      Alert.alert('Sign in failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>Log in to re-enter your Soft But Savage sanctuary.</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
          placeholder="you@example.com"
          placeholderTextColor={COLORS.textSecondary}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor={COLORS.textSecondary}
        />
      </View>
      <TouchableOpacity
        style={[styles.submit, loading && styles.disabled]}
        onPress={handleSubmit}
        disabled={loading}
        accessibilityRole="button"
      >
        {loading ? <ActivityIndicator color={COLORS.textPrimary} /> : <Text style={styles.submitText}>Sign in</Text>}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')} accessibilityRole="link">
        <Text style={styles.secondaryAction}>New here? Create an account</Text>
      </TouchableOpacity>
    </View>
  );
}

SignInScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 32,
    justifyContent: 'center',
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  formGroup: {
    gap: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  input: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    padding: 14,
    color: COLORS.textPrimary,
  },
  submit: {
    backgroundColor: COLORS.fuchsia,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  disabled: {
    opacity: 0.6,
  },
  submitText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  secondaryAction: {
    textAlign: 'center',
    color: COLORS.aqua,
    fontWeight: '600',
  },
});
