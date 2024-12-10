import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';

interface Props {
  text: string;
  completed: boolean;
  onToggle: () => void;
}

export default function ChecklistItem({ text, completed, onToggle }: Props) {
  return (
    <View style={styles.container}>
      <Checkbox
        status={completed ? 'checked' : 'unchecked'}
        onPress={onToggle}
      />
      <Text style={[styles.text, completed && styles.completed]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  text: {
    marginLeft: 8,
    flex: 1,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#666',
  },
});