// Types imports.
import type { MD2Theme, MD3Theme } from 'react-native-paper';
import type { ViewProps } from 'react-native';
import type { TextProps } from '../Text';

export interface Props extends ViewProps {
  text?: string;
  startImage?: number;
  startVector?: number;
  startIconName?: string;
  endImage?: number;
  endVector?: number;
  endIconName?: string;
  onPress?: () => void;
  onLongPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  disabled?: boolean;
  iconSize?: number;
  noIconTint?: boolean;
  textProps?: Omit<TextProps, 'children'>;
}

export interface PropsWithTheme extends Props {
  theme: MD2Theme | MD3Theme;
}
