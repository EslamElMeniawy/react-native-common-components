// External imports.
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Menu } from 'react-native-paper';

// Types imports.
import type { SelectInputMenuProps } from './TextInput.types';

// Internal imports.
import styles from './TextInput.styles';
import SelectInputInput from './SelectInputInput';
import SelectInputMenuItem from './SelectInputMenuItem';
import { getStatusBarHeight } from '../../utils/StatusBarHeight';

const SelectInputMenu = React.memo<SelectInputMenuProps>(
  (props: SelectInputMenuProps): React.ReactElement => {
    const {
      theme,
      onItemPressed,
      isItemSelected,
      isSelectVisible,
      dismissSelect,
      value,
      marginVertical,
      marginTop,
      marginBottom,
      widthHorizontalMarginStyle,
      selectProps,
      ...rest
    } = props;

    return (
      <Menu
        statusBarHeight={getStatusBarHeight()}
        visible={isSelectVisible}
        onDismiss={dismissSelect}
        anchor={
          <SelectInputInput value={value} selectProps={selectProps} {...rest} />
        }
        style={StyleSheet.flatten([
          styles.noVerticalMargin,
          {
            marginTop: marginVertical ?? marginTop,
            marginBottom: marginVertical ?? marginBottom,
          },
          widthHorizontalMarginStyle,
        ])}
      >
        {selectProps?.items?.map((item) => (
          <SelectInputMenuItem
            key={item.key}
            item={item}
            theme={theme}
            onItemPressed={onItemPressed}
            isItemSelected={isItemSelected}
          />
        ))}
      </Menu>
    );
  }
);

export default SelectInputMenu;
