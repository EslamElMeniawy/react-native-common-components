// Types imports.
import type { TextInputProps, MD2Theme, MD3Theme } from 'react-native-paper';
import type { TextProps } from '../Text';
import type { SelectItem } from '../../types/SelectItem';
import type { DimensionValue, GestureResponderEvent } from 'react-native';

export interface SelectProps<T extends SelectItem = SelectItem> {
  mode?: 'dialog' | 'dropdown';
  items?: T[];
  selectedItems?: T[];
  allowMultiSelect?: boolean;
  onItemsSelected?: (selectedItems?: T[]) => void;
  searchLabel?: string;
  noDataMessage?: string;
  closeText?: string;
  trimLength?: number;
}

export interface ErrorProps {
  errorMessage?: string;
  textProps?: Omit<Partial<TextProps>, 'children'>;
}

export interface TopLabelProps {
  label?: string;
  textProps?: Omit<Partial<TextProps>, 'children'>;
}

export interface Props extends Omit<Partial<TextInputProps>, 'theme'> {
  style?: TextInputProps['style'] & { [key: string]: any };
  isRequired?: boolean;
  topLabelProps?: Partial<TopLabelProps>;
  errorProps?: Partial<ErrorProps>;
  selectProps?: Partial<SelectProps>;
  ref?: any;
  positiveNumbersOnly?: boolean;
  hasPasswordToggle?: boolean;
}

export interface PropsWithTheme extends Partial<Props> {
  theme: MD2Theme | MD3Theme;
}

export interface SelectInputInputProps extends Partial<Props> {
  value: string;
  onPress?: (e: GestureResponderEvent) => void;
}

export interface SelectInputMenuProps
  extends PropsWithTheme,
    Omit<Partial<SelectInputMenuItemProps>, 'item' | 'theme'> {
  value: string;
  isSelectVisible: boolean;
  dismissSelect: () => void;
  marginVertical?: DimensionValue;
  marginTop?: DimensionValue;
  marginBottom?: DimensionValue;
  widthHorizontalMarginStyle: Partial<WidthHorizontalMarginStyleType>;
  onPress?: (e: GestureResponderEvent) => void;
}

export interface SelectInputMenuItemProps<T extends SelectItem = SelectItem> {
  theme: MD2Theme | MD3Theme;
  item: T;
  onItemPressed?: (item: T) => void;
  isItemSelected?: (item: T) => boolean;
}

interface WidthHorizontalMarginStyleType {
  width?: DimensionValue;
  marginHorizontal?: DimensionValue;
  marginStart?: DimensionValue;
  marginEnd?: DimensionValue;
  marginLeft?: DimensionValue;
  marginRight?: DimensionValue;
  alignSelf?:
    | 'auto'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'baseline';
}
