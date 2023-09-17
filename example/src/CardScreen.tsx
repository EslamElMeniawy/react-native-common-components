import * as React from 'react';
import {
  ScrollView,
  Card,
  Text,
} from '@eslam-elmeniawy/react-native-common-components';
import styles from './styles';

export default function CardScreen() {
  const _cardStyle = {
    ...(styles.width90perc as object),
    ...(styles.marginHorizontal5perc as object),
    ...(styles.marginVertical8vs as object),
  };

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
