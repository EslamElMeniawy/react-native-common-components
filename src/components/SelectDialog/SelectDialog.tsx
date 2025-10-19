// External imports.
import * as React from 'react';
import { withTheme } from 'react-native-paper';
import { View, I18nManager, StyleSheet } from 'react-native';

// Types imports.
import type { PropsWithTheme, Props } from './SelectDialog.types';
import type { SelectItem } from '../../types/SelectItem';

// Internal imports.
import styles from './SelectDialog.styles';
import { Dialog } from '../Dialog';
import SearchInput from './SearchInput';
import List from './List';
import NoData from './NoData';
import { Button } from '../Button';

const SelectDialog = React.memo((props: PropsWithTheme): React.ReactElement => {
  const {
    items,
    selectedItems: propsSelectedItems,
    allowMultiSelect,
    onItemsSelected,
    visible,
    onDismiss,
    searchLabel,
    searchComponent,
    noDataMessage,
    noDataComponent,
    closeText,
    theme,
  } = props;

  const _dialogBorderRadius = (theme.isV3 ? 7 : 1) * theme.roundness;

  const isArabic =
    (I18nManager.getConstants().localeIdentifier?.indexOf('ar') ?? -1) > -1;

  const _closeButtonBorderRadius = (theme.isV3 ? 5 : 1) * theme.roundness;

  const [selectedItems, setSelectedItems] = React.useState(propsSelectedItems);

  const [searchText, setSearchText] = React.useState<string | undefined>(
    undefined
  );

  const _filteredList = React.useMemo((): SelectItem[] | undefined => {
    if (items && searchText) {
      const filteredItems = items.filter(
        (item) =>
          (item.dropdownTitle ?? '')
            .toLowerCase()
            .indexOf(searchText.toLowerCase()) > -1
      );

      return filteredItems;
    }

    return items;
  }, [items, searchText]);

  const _dismissDialog = React.useCallback((): void => {
    setSearchText(undefined);

    if (onDismiss) {
      onDismiss();
    }
  }, [onDismiss]);

  // #region Lifecycle
  React.useEffect(() => {
    setSelectedItems(propsSelectedItems);
  }, [propsSelectedItems]);
  // #endregion

  // #region Text change events
  const _onChangeTextSearchText = React.useCallback((text: string): void => {
    setSearchText(text);
  }, []);
  // #endregion

  // #region Press events
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
      } else if (allowMultiSelect) {
        newSelectedItems.push(item);
      } else {
        newSelectedItems = [item];
      }

      setSelectedItems(newSelectedItems);

      if (onItemsSelected) {
        onItemsSelected(newSelectedItems);
      }

      if (!allowMultiSelect) {
        _dismissDialog();
      }
    },
    [_dismissDialog, allowMultiSelect, onItemsSelected, selectedItems]
  );
  // #endregion

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

  return (
    <Dialog visible={visible} onDismiss={_dismissDialog} style={styles.dialog}>
      <>
        <View
          style={StyleSheet.flatten([
            styles.container,
            {
              backgroundColor: theme.colors.surface,
              borderRadius: _dialogBorderRadius,
              padding: _dialogBorderRadius,
            },
          ])}
        >
          <SearchInput
            searchLabel={searchLabel}
            searchComponent={searchComponent}
            theme={theme}
            onChangeText={_onChangeTextSearchText}
          />
          {_filteredList?.length ? (
            <List
              items={_filteredList}
              theme={theme}
              onItemPressed={_onItemPressed}
              isItemSelected={_isItemSelected}
            />
          ) : (
            <NoData
              noDataMessage={noDataMessage}
              noDataComponent={noDataComponent}
            />
          )}
        </View>
        <Button
          text={closeText ?? (isArabic ? 'تم' : 'Done')}
          onPress={_dismissDialog}
          style={StyleSheet.flatten([
            styles.closeButton,
            {
              backgroundColor: theme.colors.surface,
              borderRadius: _closeButtonBorderRadius,
            },
          ])}
          textProps={{ style: { color: theme.colors.onSurface } }}
        />
      </>
    </Dialog>
  );
});

export default withTheme(SelectDialog) as React.ComponentType<Props>;
