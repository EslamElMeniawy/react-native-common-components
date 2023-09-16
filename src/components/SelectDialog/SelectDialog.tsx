// External imports.
import * as React from 'react';
import { withTheme } from 'react-native-paper';
import { View, I18nManager } from 'react-native';

// Types imports.
import type { PropsWithTheme, State, Props } from './SelectDialog.types';
import type SelectItem from '../../types/SelectItem';

// Internal imports.
import styles from './SelectDialog.styles';
import { Dialog } from '../Dialog';
import SearchInput from './SearchInput';
import List from './List';
import NoData from './NoData';
import { Button } from '../Button';

class SelectDialog extends React.PureComponent<PropsWithTheme, State> {
  // Variable for mount state.
  isComponentMounted: boolean = false;

  constructor(props: PropsWithTheme) {
    super(props);

    this.state = {
      selectedItems: props.selectedItems,
      searchText: undefined,
    };
  }

  // #region Lifecycle
  static getDerivedStateFromProps(props: Props, state: State): State {
    return {
      ...state,
      selectedItems: props.selectedItems,
    };
  }

  componentDidMount() {
    // Set is mounted.
    this.isComponentMounted = true;
  }

  componentWillUnmount() {
    // Clear is mounted.
    this.isComponentMounted = false;
  }
  // #endregion

  // #region Text change events
  _onChangeTextSearchText = (text: string): void => {
    this.setState({ searchText: text });
  };
  // #endregion

  // #region Press events
  _onItemPressed = (item: SelectItem): void => {
    const { selectedItems } = this.state;
    const { allowMultiSelect, onItemsSelected } = this.props;
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

    this.setState({ selectedItems: newSelectedItems }, () => {
      if (onItemsSelected) {
        onItemsSelected(newSelectedItems);
      }

      if (!allowMultiSelect) {
        this._dismissDialog();
      }
    });
  };
  // #endregion

  _dismissDialog = (): void => {
    const { onDismiss } = this.props;

    this.setState({ searchText: undefined }, () => {
      if (onDismiss) {
        onDismiss();
      }
    });
  };

  _getFilterList = (): SelectItem[] | undefined => {
    const { items } = this.props;
    const { searchText } = this.state;

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
  };

  _isItemSelected = (item: SelectItem): boolean => {
    const { selectedItems } = this.state;
    let itemSelected = false;

    selectedItems?.some((dataItem) => {
      if (dataItem && dataItem.key === item.key) {
        itemSelected = true;
        return true;
      }

      return false;
    });

    return itemSelected;
  };

  _getSearchInput = (): React.ReactElement => {
    const { theme, searchLabel, searchComponent } = this.props;

    return (
      <SearchInput
        searchLabel={searchLabel}
        searchComponent={searchComponent}
        theme={theme}
        onChangeText={this._onChangeTextSearchText}
      />
    );
  };

  _getContent = (): React.ReactElement => {
    const { noDataMessage, noDataComponent, theme } = this.props;
    const items = this._getFilterList();

    if (items && items.length) {
      return (
        <List
          items={items}
          theme={theme}
          onItemPressed={this._onItemPressed}
          isItemSelected={this._isItemSelected}
        />
      );
    }

    return (
      <NoData noDataMessage={noDataMessage} noDataComponent={noDataComponent} />
    );
  };

  _getCloseButton = (): React.ReactElement => {
    const { closeText, theme } = this.props;

    const isArabic =
      (I18nManager.getConstants().localeIdentifier?.indexOf('ar') || -1) > -1;

    return (
      <Button
        text={closeText === undefined ? (isArabic ? 'تم' : 'Done') : closeText}
        onPress={this._dismissDialog}
        style={[styles.closeButton, { backgroundColor: theme.colors.surface }]}
        textProps={{
          style: { color: theme.colors.onSurface },
        }}
      />
    );
  };

  render(): React.ReactElement {
    const { visible, theme } = this.props;

    return (
      <Dialog
        visible={visible}
        onDismiss={this._dismissDialog}
        style={styles.dialog}
      >
        <>
          <View
            style={[
              styles.container,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            {this._getSearchInput()}
            {this._getContent()}
          </View>
          {this._getCloseButton()}
        </>
      </Dialog>
    );
  }
}

export default withTheme(SelectDialog);
