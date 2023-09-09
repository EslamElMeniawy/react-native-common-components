// Types imports.
import type { MD2Theme, MD3Theme, TextProps } from 'react-native-paper';

export type TextType = 'normal' | 'bold' | 'caption';

export interface Props extends TextProps<never> {
  size?: number;
  type?: TextType;
}

export interface PropsWithTheme extends Props {
  theme: MD2Theme | MD3Theme;
}
