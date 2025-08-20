import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  ScrollView,
  TextInput,
  type SelectItem,
} from '@eslam-elmeniawy/react-native-common-components';
import styles from './styles';

export default function TextInputScreen() {
  type SelectType = SelectItem<{
    id?: number;
  }>;

  const [normalValue, setNormalValue] = React.useState('');
  const [multilineValue, setMultilineValue] = React.useState('');
  const [requiredValue, setRequiredValue] = React.useState('');
  const [outlinedValue, setOutlinedValue] = React.useState('');
  const [topLabelValue, setTopLabelValue] = React.useState('');

  const [dialogSelectedItems, setDialogSelectedItems] = React.useState<
    SelectType[] | undefined
  >(undefined);

  const [dropdownSelectedItems, setDropdownSelectedItems] = React.useState<
    SelectType[] | undefined
  >(undefined);

  const _onChangeTextNormal = (text: string) => setNormalValue(text);

  const _onChangeTextMultiline = (text: string) => setMultilineValue(text);

  const _onChangeTextRequired = (text: string) => setRequiredValue(text);

  const _onChangeTextOutlined = (text: string) => setOutlinedValue(text);

  const _onChangeTextTopLabel = (text: string) => setTopLabelValue(text);

  const _onDialogItemsSelected = (selectedItems?: SelectType[]) =>
    setDialogSelectedItems(selectedItems);

  const _onDropdownItemsSelected = (selectedItems?: SelectType[]) =>
    setDropdownSelectedItems(selectedItems);

  const dialogItems: SelectType[] = [
    { id: 1, key: 'dialog-item-1', dropdownTitle: 'Dialog Item 1' },
    { id: 2, key: 'dialog-item-2', dropdownTitle: 'Dialog Item 2' },
    { id: 3, key: 'dialog-item-3', dropdownTitle: 'Dialog Item 3' },
    { id: 4, key: 'dialog-item-4', dropdownTitle: 'Dialog Item 4' },
    { id: 5, key: 'dialog-item-5', dropdownTitle: 'Dialog Item 5' },
    {
      id: 6,
      key: 'dialog-item-6',
      dropdownTitle:
        'Dialog Item 6 Dialog Item 6 Dialog Item 6 Dialog Item 6 Dialog Item 6 Dialog Item 6 Dialog Item 6 Dialog Item 6',
    },
  ];

  const dropdownItems: SelectType[] = [
    { id: 1, key: 'dropdown-item-1', dropdownTitle: 'Dropdown Item 1' },
    { id: 2, key: 'dropdown-item-2', dropdownTitle: 'Dropdown Item 2' },
    { id: 3, key: 'dropdown-item-3', dropdownTitle: 'Dropdown Item 3' },
    { id: 4, key: 'dropdown-item-4', dropdownTitle: 'Dropdown Item 4' },
    { id: 5, key: 'dropdown-item-5', dropdownTitle: 'Dropdown Item 5' },
    {
      id: 6,
      key: 'dropdown-item-6',
      dropdownTitle:
        'Dropdown Item 6 Dropdown Item 6 Dropdown Item 6 Dropdown Item 6 Dropdown Item 6 Dropdown Item 6 Dropdown Item 6 Dropdown Item 6',
    },
  ];

  const _inputStyle = StyleSheet.flatten([
    styles.width90perc,
    styles.alignSelfCenter,
    styles.marginVertical8vs,
  ]);

  return (
    <ScrollView>
      <TextInput
        style={_inputStyle}
        value={normalValue}
        onChangeText={_onChangeTextNormal}
        placeholder="Normal"
        label="Normal"
      />
      <TextInput
        style={_inputStyle}
        value={multilineValue}
        onChangeText={_onChangeTextMultiline}
        multiline
        placeholder="Multiline"
        label="Multiline"
      />
      <TextInput
        style={_inputStyle}
        value={requiredValue}
        onChangeText={_onChangeTextRequired}
        placeholder="Required"
        label="Required"
        isRequired
      />
      <TextInput
        mode="outlined"
        style={_inputStyle}
        value={outlinedValue}
        onChangeText={_onChangeTextOutlined}
        placeholder="Outlined"
        label="Outlined"
      />
      <TextInput
        style={_inputStyle}
        value={topLabelValue}
        onChangeText={_onChangeTextTopLabel}
        placeholder="Top Label"
        errorProps={{ errorMessage: 'Error' }}
        topLabelProps={{ label: 'Top Label' }}
      />
      <TextInput
        style={_inputStyle}
        placeholder="Dialog"
        label="Dialog"
        selectProps={{
          items: dialogItems,
          selectedItems: dialogSelectedItems,
          onItemsSelected: _onDialogItemsSelected,
          allowMultiSelect: true,
        }}
      />
      <TextInput
        style={_inputStyle}
        placeholder="Dropdown"
        label="Dropdown"
        selectProps={{
          mode: 'dropdown',
          items: dropdownItems,
          selectedItems: dropdownSelectedItems,
          onItemsSelected: _onDropdownItemsSelected,
          allowMultiSelect: true,
        }}
      />
    </ScrollView>
  );
}
