import { StyleSheet, type ListRenderItemInfo } from 'react-native';
import {
  FlatList,
  Text,
  type FlatListItem,
} from '@eslam-elmeniawy/react-native-common-components';
import styles from './styles';
import { Card } from 'react-native-paper';

export default function FlatListScreen() {
  const _cardStyle = StyleSheet.flatten([
    styles.width90perc,
    styles.marginHorizontal5perc,
    styles.marginVertical8vs,
    styles.padding8ms,
    styles.borderRadius8ms,
  ]);

  interface ListType extends FlatListItem {
    title?: string;
    details?: string;
  }

  const _items: ListType[] = [...Array(100).keys()].map((_item, index) => ({
    key: `item_${index}`,
    title: `Item ${index + 1}`,
    details: `Details related to item ${index + 1}`,
  }));

  return (
    <FlatList
      data={_items}
      renderItem={({ item }: ListRenderItemInfo<ListType>) => (
        <Card style={_cardStyle}>
          <Text type="bold">{item.title}</Text>
          <Text>{item.details}</Text>
        </Card>
      )}
    />
  );
}
