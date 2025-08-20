// External imports.
import * as React from 'react';

// Types imports.
import type { SelectInputMenuItemProps } from './TextInput.types';

// Internal imports.
import styles from './TextInput.styles';
import { Checkbox } from '@src/components/CompoundButton';

const SelectInputMenuItem = React.memo(
  (props: SelectInputMenuItemProps): React.ReactElement => {
    const { theme, item, onItemPressed, isItemSelected } = props;

    return (
      <Checkbox
        key={item.key}
        style={styles.selectItem}
        onPress={() => onItemPressed(item)}
        checked={isItemSelected(item)}
        checkedColor={theme.colors.primary}
        uncheckedColor={theme.colors.onSurface}
        text={item.dropdownTitle}
        textProps={{ style: { color: theme.colors.onSurface } }}
      />
    );
  }
);

export default SelectInputMenuItem;
