// Types imports.
import type { MD2Theme, MD3Theme } from 'react-native-paper';
import type { ViewProps } from 'react-native';
import type { TextProps } from '../Text';

export interface Props extends Partial<ViewProps> {
  text?: string;
  startImage?: number;
  startVector?: number;
  startIconName?: string;
  startIconSize?: number;
  startIconColor?: string;
  noStartIconTint?: boolean;
  endImage?: number;
  endVector?: number;
  endIconName?: string;
  endIconSize?: number;
  endIconColor?: string;
  noEndIconTint?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  disabled?: boolean;
  iconSize?: number;
  noIconTint?: boolean;
  textProps?: Omit<Partial<TextProps>, 'children'>;
}

export interface PropsWithTheme extends Partial<Props> {
  theme: MD2Theme | MD3Theme;
}
