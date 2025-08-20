// External imports.
import * as React from 'react';

// Types imports.
import type { ListProps } from './SelectDialog.types';
import type { SelectItem } from '@src/types';

// Internal imports.
import styles from './SelectDialog.styles';
import { FlatList } from '@src/components/FlatList';
import { Checkbox } from '@src/components/CompoundButton';

const List = React.memo((props: ListProps): React.ReactElement => {
  const { items, theme, onItemPressed, isItemSelected } = props;

  const _getListItem = <T extends SelectItem>(item: T): React.ReactElement => (
    <Checkbox
      style={styles.selectItem}
      onPress={() => onItemPressed(item)}
      checked={isItemSelected(item)}
      checkedColor={theme.colors.primary}
      uncheckedColor={theme.colors.onSurface}
      text={item.dropdownTitle}
      textProps={{ style: { color: theme.colors.onSurface } }}
    />
  );

  return (
    <FlatList
      data={items}
      renderItem={({ item }) => _getListItem(item)}
      bounces={false}
      style={styles.list}
    />
  );
});

export default List;
