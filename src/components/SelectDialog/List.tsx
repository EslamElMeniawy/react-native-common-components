// External imports.
import * as React from 'react';

// Types imports.
import type { ListProps } from './SelectDialog.types';
import type { SelectItem } from '../../types';

// Internal imports.
import styles from './SelectDialog.styles';
import { FlatList } from '../FlatList';
import { Checkbox } from '../CompoundButton';

const List = React.memo((props: ListProps): React.ReactElement => {
  const { items, theme, onItemPressed, isItemSelected } = props;

  const _getListItem = (item: SelectItem): React.ReactElement => (
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
