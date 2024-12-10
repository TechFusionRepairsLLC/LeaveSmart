import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  label: string;
  error?: string;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

export const Input = ({
  value,
  onChangeText,
  label,
  error,
  secureTextEntry = false,
  autoCapitalize = 'none',
  keyboardType = 'default',
}: InputProps) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      label={label}
      error={!!error}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
      mode="outlined"
      style={styles.input}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 8,
  },
});