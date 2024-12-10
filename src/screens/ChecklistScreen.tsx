import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, TextInput, Button, Checkbox } from 'react-native-paper';

export default function ChecklistScreen() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, { text: newItem, completed: false }]);
      setNewItem('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          label="Add new item"
          value={newItem}
          onChangeText={setNewItem}
          mode="outlined"
          style={styles.input}
        />
        <Button mode="contained" onPress={addItem}>
          Add
        </Button>
      </View>

      {items.map((item, index) => (
        <List.Item
          key={index}
          title={item.text}
          left={() => (
            <Checkbox
              status={item.completed ? 'checked' : 'unchecked'}
              onPress={() => {
                const newItems = [...items];
                newItems[index].completed = !newItems[index].completed;
                setItems(newItems);
              }}
            />
          )}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
});