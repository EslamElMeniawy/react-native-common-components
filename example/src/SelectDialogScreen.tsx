import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  ScrollView,
  SelectDialog,
  Text,
  Button,
  type SelectItem,
} from '@eslam-elmeniawy/react-native-common-components';
import styles from './styles';

export default function SelectDialogScreen() {
  type SelectType = SelectItem<{
    id?: number;
  }>;

  const [singleSelectDialogVisible, setSingleSelectDialogVisible] =
    React.useState(false);

  const [singleSelectDialogSelectedItems, setSingleSelectDialogSelectedItems] =
    React.useState<SelectType[] | undefined>(undefined);

  const [multiSelectDialogVisible, setMultiSelectDialogVisible] =
    React.useState(false);

  const [multiSelectDialogSelectedItems, setMultiSelectDialogSelectedItems] =
    React.useState<SelectType[] | undefined>(undefined);

  const _showSingleSelectDialog = () => setSingleSelectDialogVisible(true);

  const _hideSingleSelectDialog = () => setSingleSelectDialogVisible(false);

  const _onSingleSelectItemsSelected = (selectedItems?: SelectType[]) =>
    setSingleSelectDialogSelectedItems(selectedItems);

  const _showMultiSelectDialog = () => setMultiSelectDialogVisible(true);

  const _hideMultiSelectDialog = () => setMultiSelectDialogVisible(false);

  const _onMultiSelectItemsSelected = (selectedItems?: SelectType[]) =>
    setMultiSelectDialogSelectedItems(selectedItems);

  const singleSelectItems: SelectType[] = [
    {
      id: 1,
      key: 'single-select-item-1',
      dropdownTitle: 'Single Select Item 1',
    },
    {
      id: 2,
      key: 'single-select-item-2',
      dropdownTitle: 'Single Select Item 2',
    },
    {
      id: 3,
      key: 'single-select-item-3',
      dropdownTitle: 'Single Select Item 3',
    },
    {
      id: 4,
      key: 'single-select-item-4',
      dropdownTitle: 'Single Select Item 4',
    },
    {
      id: 5,
      key: 'single-select-item-5',
      dropdownTitle: 'Single Select Item 5',
    },
  ];

  const multiSelectItems: SelectType[] = [
    { id: 1, key: 'multi-select-item-1', dropdownTitle: 'Multi Select Item 1' },
    { id: 2, key: 'multi-select-item-2', dropdownTitle: 'Multi Select Item 2' },
    { id: 3, key: 'multi-select-item-3', dropdownTitle: 'Multi Select Item 3' },
    { id: 4, key: 'multi-select-item-4', dropdownTitle: 'Multi Select Item 4' },
    { id: 5, key: 'multi-select-item-5', dropdownTitle: 'Multi Select Item 5' },
  ];

  const _buttonStyle = StyleSheet.flatten([
    styles.width90perc,
    styles.alignSelfCenter,
    styles.marginTop8vs,
  ]);

  const _textStyle = StyleSheet.flatten([
    styles.width90perc,
    styles.alignSelfCenter,
    styles.marginTop2vs,
    styles.marginBottom8vs,
  ]);

  return (
    <>
      <ScrollView contentContainerStyle={styles.paddingVertical4vs}>
        <Button
          style={_buttonStyle}
          onPress={_showSingleSelectDialog}
          text="Show Single Select Dialog"
        />
        <Text style={_textStyle}>
          {singleSelectDialogSelectedItems
            ?.map((item) => item.dropdownTitle)
            ?.join(', ')}
        </Text>
        <Button
          style={_buttonStyle}
          onPress={_showMultiSelectDialog}
          text="Show Multi Select Dialog"
        />
        <Text style={_textStyle}>
          {multiSelectDialogSelectedItems
            ?.map((item) => item.dropdownTitle)
            ?.join(', ')}
        </Text>
      </ScrollView>
      <SelectDialog
        visible={singleSelectDialogVisible}
        onDismiss={_hideSingleSelectDialog}
        items={singleSelectItems}
        selectedItems={singleSelectDialogSelectedItems}
        onItemsSelected={_onSingleSelectItemsSelected}
      />
      <SelectDialog
        allowMultiSelect
        visible={multiSelectDialogVisible}
        onDismiss={_hideMultiSelectDialog}
        items={multiSelectItems}
        selectedItems={multiSelectDialogSelectedItems}
        onItemsSelected={_onMultiSelectItemsSelected}
      />
    </>
  );
}
