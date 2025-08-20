// Types imports.
import type { MD2Theme, MD3Theme } from 'react-native-paper';
import type { ViewProps, FlexAlignType } from 'react-native';
import type { TextProps } from '@src/components/Text';

export interface Props extends ViewProps {
  text?: string;
  checked?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  checkedColor?: string;
  uncheckedColor?: string;
  textProps?: Omit<TextProps, 'children'>;
  contentAlign?: FlexAlignType;
}

export interface PropsWithTheme extends Props {
  theme: MD2Theme | MD3Theme;
}
