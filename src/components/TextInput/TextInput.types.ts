// Types imports.
import type { TextInputProps, MD2Theme, MD3Theme } from 'react-native-paper';
import type { TextProps } from '../Text';
import type SelectItem from '../../types/SelectItem';
import type { DimensionValue, FlexAlignType } from 'react-native';

export interface SelectProps {
  mode?: 'dialog' | 'dropdown';
  items?: SelectItem[];
  selectedItems?: SelectItem[];
  allowMultiSelect?: boolean;
  onItemsSelected?: (selectedItems?: SelectItem[]) => void;
  searchLabel?: string;
  noDataMessage?: string;
  closeText?: string;
  trimLength?: number;
}

export interface ErrorProps {
  errorMessage?: string;
  textProps?: Omit<TextProps, 'children'>;
}

export interface TopLabelProps {
  label?: string;
  textProps?: Omit<TextProps, 'children'>;
}

export interface Props extends Omit<TextInputProps, 'theme'> {
  style?: TextInputProps['style'] & { [key: string]: any };
  isRequired?: boolean;
  topLabelProps?: TopLabelProps;
  errorProps?: ErrorProps;
  selectProps?: SelectProps;
  ref?: any;
  positiveNumbersOnly?: boolean;
  hasPasswordToggle?: boolean;
}

export interface PropsWithTheme extends Props {
  theme: MD2Theme | MD3Theme;
}

export interface SelectInputState {
  isSelectVisible: boolean;
  value: string;
  selectedItems?: SelectItem[];
}

export interface SelectInputInputProps extends Props {
  value: string;
}

export interface SelectInputMenuProps
  extends PropsWithTheme,
    Omit<SelectInputMenuItemProps, 'item' | 'theme'> {
  value: string;
  isSelectVisible: boolean;
  dismissSelect: () => void;
  marginVertical?: DimensionValue | undefined;
  marginTop?: DimensionValue | undefined;
  marginBottom?: DimensionValue | undefined;
  widthHorizontalMarginStyle: WidthHorizontalMarginStyleType;
}

export interface SelectInputMenuItemProps {
  theme: MD2Theme | MD3Theme;
  item: SelectItem;
  onItemPressed: (item: SelectItem) => void;
  isItemSelected: (item: SelectItem) => boolean;
}

interface WidthHorizontalMarginStyleType {
  width?: DimensionValue | undefined;
  marginHorizontal?: DimensionValue | undefined;
  marginStart?: DimensionValue | undefined;
  marginEnd?: DimensionValue | undefined;
  marginLeft?: DimensionValue | undefined;
  marginRight?: DimensionValue | undefined;
  alignSelf?: 'auto' | FlexAlignType | undefined;
}
