// Types imports.
import type { MD2Theme, MD3Theme } from 'react-native-paper';
import type { ViewProps } from 'react-native';
import type { TextProps } from '../Text';

export interface Props extends Partial<ViewProps> {
  text?: string;
  checked?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  checkedColor?: string;
  uncheckedColor?: string;
  textProps?: Omit<Partial<TextProps>, 'children'>;
  contentAlign?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
}

export interface PropsWithTheme extends Partial<Props> {
  theme: MD2Theme | MD3Theme;
}
