import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Checklist } from '../utils/checklist';

interface Props {
  checklist: Checklist;
  onPress: () => void;
}

export default function ChecklistCard({ checklist, onPress }: Props) {
  const completedItems = checklist.items.filter(item => item.completed).length;

  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Content>
        <Title>{checklist.title}</Title>
        <Paragraph>
          {completedItems} of {checklist.items.length} items completed
        </Paragraph>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
});