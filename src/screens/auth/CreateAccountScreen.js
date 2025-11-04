import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import PropTypes from 'prop-types';

import { COLORS } from '../../theme/colors';
import { useAuth } from '../../context/AuthContext';

export function CreateAccountScreen({ navigation }) {
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      Alert.alert('Missing info', 'All fields are required.');
      return;
    }
    setLoading(true);
    try {
      await signUp({ name, email, password });
    } catch (error) {
      Alert.alert('Sign up failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create your account</Text>
      <Text style={styles.subtitle}>We protect your data with HIPAA-compliant storage and encrypted sync.</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Your full name"
          placeholderTextColor={COLORS.textSecondary}
        />
      </View>
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
          placeholder="Create a strong password"
          placeholderTextColor={COLORS.textSecondary}
        />
      </View>
      <TouchableOpacity
        style={[styles.submit, loading && styles.disabled]}
        onPress={handleSubmit}
        disabled={loading}
        accessibilityRole="button"
      >
        {loading ? <ActivityIndicator color={COLORS.textPrimary} /> : <Text style={styles.submitText}>Create account</Text>}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()} accessibilityRole="link">
        <Text style={styles.secondaryAction}>Already have a login? Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}

CreateAccountScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
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
    backgroundColor: COLORS.purple,
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
