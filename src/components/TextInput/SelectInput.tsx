// External imports.
import * as React from 'react';
import { TouchableRipple } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { omit } from 'lodash';

// Types imports.
import type { PropsWithTheme, SelectInputState } from './TextInput.types';
import type { SelectItem } from '../../types';

// Internal imports.
import styles from './TextInput.styles';
import SelectInputMenu from './SelectInputMenu';
import SelectInputInput from './SelectInputInput';
import { SelectDialog } from '../SelectDialog';

class SelectInput extends React.PureComponent<
  PropsWithTheme,
  SelectInputState
> {
  // Variable for mount state.
  _isComponentMounted: boolean = false;

  constructor(props: PropsWithTheme) {
    super(props);

    this.state = {
      isSelectVisible: false,
      value: props.value ?? '',
      selectedItems: props.selectProps?.selectedItems,
    };
  }

  // #region Lifecycle
  static getDerivedStateFromProps(
    props: PropsWithTheme,
    state: SelectInputState
  ): SelectInputState {
    const selectedItems = props.selectProps?.selectedItems ?? [];
    let value = '';

    if (selectedItems.length) {
      const names: string[] = [];

      selectedItems.forEach((item) => {
        if (item) {
          names.push(item.dropdownTitle ?? '');
        }
      });

      value = names.join(' - ');
    }

    return {
      ...state,
      value,
      selectedItems: props.selectProps?.selectedItems,
    };
  }

  componentDidMount() {
    // Set is mounted.
    this._isComponentMounted = true;
  }

  componentWillUnmount() {
    // Clear is mounted.
    this._isComponentMounted = false;
  }
  // #endregion

  // #region Press events
  _onItemPressed = (item: SelectItem): void => {
    const { selectedItems } = this.state;
    const { selectProps } = this.props;
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

    if (this._isComponentMounted) {
      this.setState({ selectedItems: newSelectedItems }, () => {
        this._onItemsSelected(newSelectedItems);

        if (!selectProps?.allowMultiSelect) {
          this._dismissSelect();
        }
      });
    }
  };
  // #endregion

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

  _showSelect = (): void => {
    if (this._isComponentMounted) {
      this.setState({ isSelectVisible: true });
    }
  };

  _dismissSelect = (): void => {
    if (this._isComponentMounted) {
      this.setState({ isSelectVisible: false });
    }
  };

  _onItemsSelected = (selectedItems?: SelectItem[]): void => {
    this._setSelectedText(selectedItems);
    const { selectProps } = this.props;

    if (selectProps?.onItemsSelected) {
      selectProps?.onItemsSelected(selectedItems);
    }
  };

  _setSelectedText = (selectedItems?: SelectItem[]): void => {
    let value: string;

    if (selectedItems?.length) {
      const names: string[] = [];

      selectedItems?.forEach((item) => {
        if (item) {
          names.push(item.dropdownTitle ?? '');
        }
      });

      value = names.join(' - ');
    } else {
      const { value: propsValue } = this.props;
      value = propsValue ?? '';
    }

    if (this._isComponentMounted) {
      this.setState({ value });
    }
  };

  render(): React.ReactElement {
    const { selectProps, editable, style } = this.props;
    const { isSelectVisible, value } = this.state;

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

    const widthHorizontalMarginStyle = {
      width,
      marginHorizontal,
      marginStart,
      marginEnd,
      marginLeft,
      marginRight,
      alignSelf,
    };

    return (
      <>
        <TouchableRipple
          disabled={editable === false}
          onPress={isSelectVisible ? this._dismissSelect : this._showSelect}
          style={StyleSheet.flatten([
            styles.noVerticalMargin,
            {
              marginTop: marginVertical ?? marginTop,
              marginBottom: marginVertical ?? marginBottom,
            },
            widthHorizontalMarginStyle,
          ])}
        >
          <View pointerEvents="box-only">
            {selectProps?.mode === 'dropdown' ? (
              <SelectInputMenu
                value={value}
                isSelectVisible={isSelectVisible}
                dismissSelect={this._dismissSelect}
                marginVertical={marginVertical}
                marginTop={marginTop}
                marginBottom={marginBottom}
                widthHorizontalMarginStyle={widthHorizontalMarginStyle}
                onItemPressed={this._onItemPressed}
                isItemSelected={this._isItemSelected}
                {...this.props}
              />
            ) : (
              <SelectInputInput
                value={value}
                {...omit(this.props, ['theme'])}
              />
            )}
          </View>
        </TouchableRipple>
        {selectProps?.mode !== 'dropdown' && (
          <SelectDialog
            visible={isSelectVisible}
            onDismiss={this._dismissSelect}
            items={selectProps?.items}
            selectedItems={selectProps?.selectedItems}
            allowMultiSelect={selectProps?.allowMultiSelect}
            onItemsSelected={this._onItemsSelected}
            searchLabel={selectProps?.searchLabel}
            noDataMessage={selectProps?.noDataMessage}
            closeText={selectProps?.closeText}
          />
        )}
      </>
    );
  }
}

export default SelectInput;
