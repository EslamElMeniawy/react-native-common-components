// External imports.
import * as React from 'react';
import { TouchableRipple } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { omit } from 'lodash';

// Types imports.
import type { PropsWithTheme } from './TextInput.types';
import type { SelectItem } from '../../types/SelectItem';

// Internal imports.
import styles from './TextInput.styles';
import SelectInputMenu from './SelectInputMenu';
import SelectInputInput from './SelectInputInput';
import { SelectDialog } from '../SelectDialog';

const SelectInput = React.memo<PropsWithTheme>(
  (props: PropsWithTheme): React.ReactElement => {
    const { style, selectProps, value: propsValue, editable } = props;

    const {
      marginVertical,
      marginTop,
      marginBottom,
      width,
      marginHorizontal,
      marginStart,
      marginEnd,
      marginLeft,
      marginRight,
      alignSelf,
    } = style ?? {};

    const _widthHorizontalMarginStyle = {
      width,
      marginHorizontal,
      marginStart,
      marginEnd,
      marginLeft,
      marginRight,
      alignSelf,
    };

    const [isSelectVisible, setIsSelectVisible] = React.useState(false);
    const [value, setValue] = React.useState(propsValue ?? '');

    const [selectedItems, setSelectedItems] = React.useState(
      selectProps?.selectedItems
    );

    // #region Lifecycle
    React.useEffect(() => {
      setSelectedItems(selectProps?.selectedItems);

      if ((selectProps?.selectedItems ?? []).length) {
        const names: string[] = [];

        (selectProps?.selectedItems ?? []).forEach((item) => {
          if (item) {
            names.push(item.dropdownTitle ?? '');
          }
        });

        setValue(names.join(' - '));
      }
    }, [selectProps]);
    // #endregion

    const _showSelect = React.useCallback((): void => {
      setIsSelectVisible(true);
    }, []);

    const _dismissSelect = React.useCallback((): void => {
      setIsSelectVisible(false);
    }, []);

    const _setSelectedText = React.useCallback(
      (items?: SelectItem[]): void => {
        if (items?.length) {
          const names: string[] = [];

          items?.forEach((item) => {
            if (item) {
              names.push(item.dropdownTitle ?? '');
            }
          });

          setValue(names.join(' - '));
        } else {
          setValue(propsValue ?? '');
        }
      },
      [propsValue]
    );

    const _onItemsSelected = React.useCallback(
      (items?: SelectItem[]): void => {
        _setSelectedText(items);

        if (selectProps?.onItemsSelected) {
          selectProps?.onItemsSelected(items);
        }
      },
      [_setSelectedText, selectProps]
    );

    const _isItemSelected = React.useCallback(
      (item: SelectItem): boolean => {
        let itemSelected = false;

        selectedItems?.some((dataItem) => {
          if (dataItem && dataItem.key === item.key) {
            itemSelected = true;
            return true;
          }

          return false;
        });

        return itemSelected;
      },
      [selectedItems]
    );

    // #region Press events
    const _onPress = React.useCallback((): void => {
      isSelectVisible ? _dismissSelect() : _showSelect();
    }, [_dismissSelect, _showSelect, isSelectVisible]);

    const _onItemPressed = React.useCallback(
      (item: SelectItem): void => {
        let newSelectedItems: SelectItem[] = Array.from(selectedItems ?? []);
        let index = -1;

        newSelectedItems.some((dataItem, i) => {
          if (dataItem && dataItem.key === item.key) {
            index = i;
            return true;
          }

          return false;
        });

        if (index > -1) {
          newSelectedItems.splice(index, 1);
        } else if (selectProps?.allowMultiSelect) {
          newSelectedItems.push(item);
        } else {
          newSelectedItems = [item];
        }

        setSelectedItems(newSelectedItems);
        _onItemsSelected(newSelectedItems);

        if (!selectProps?.allowMultiSelect) {
          _dismissSelect();
        }
      },
      [_dismissSelect, _onItemsSelected, selectProps, selectedItems]
    );
    // #endregion

    return (
      <>
        <TouchableRipple
          disabled={editable === false}
          onPress={_onPress}
          style={StyleSheet.flatten([
            styles.noVerticalMargin,
            {
              marginTop: marginVertical ?? marginTop,
              marginBottom: marginVertical ?? marginBottom,
            },
            _widthHorizontalMarginStyle,
          ])}
        >
          <View pointerEvents="box-only">
            {selectProps?.mode === 'dropdown' ? (
              <SelectInputMenu
                value={value}
                isSelectVisible={isSelectVisible}
                dismissSelect={_dismissSelect}
                marginVertical={marginVertical}
                marginTop={marginTop}
                marginBottom={marginBottom}
                widthHorizontalMarginStyle={_widthHorizontalMarginStyle}
                onItemPressed={_onItemPressed}
                isItemSelected={_isItemSelected}
                onPress={_onPress}
                {...props}
              />
            ) : (
              <SelectInputInput
                value={value}
                onPress={_onPress}
                {...omit(props, ['theme'])}
              />
            )}
          </View>
        </TouchableRipple>
        {selectProps?.mode !== 'dropdown' && (
          <SelectDialog
            visible={isSelectVisible}
            onDismiss={_dismissSelect}
            items={selectProps?.items}
            selectedItems={selectProps?.selectedItems}
            allowMultiSelect={selectProps?.allowMultiSelect}
            onItemsSelected={_onItemsSelected}
            searchLabel={selectProps?.searchLabel}
            noDataMessage={selectProps?.noDataMessage}
            closeText={selectProps?.closeText}
          />
        )}
      </>
    );
  }
);

export default SelectInput;
