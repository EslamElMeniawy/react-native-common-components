import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  ScrollView,
  Card,
  Text,
} from '@eslam-elmeniawy/react-native-common-components';
import styles from './styles';

export default function CardScreen() {
  const _cardStyle = StyleSheet.flatten([
    styles.width90perc,
    styles.marginHorizontal5perc,
    styles.marginVertical8vs,
  ]);

  return (
    <ScrollView>
      <Card style={_cardStyle}>
        <Text>Default card</Text>
      </Card>
      <Card style={_cardStyle} mode="contained">
        <Text>Contained card</Text>
      </Card>
    </ScrollView>
  );
}
