// Types imports.
import type { MD2Theme, MD3Theme } from 'react-native-paper';
import type { ViewProps } from 'react-native';

export interface Props extends ViewProps {
  image?: number;
  vector?: number;
  iconName?: string;
  size?: number;
  color?: string;
  onPress?: () => void;
  onLongPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  disabled?: boolean;
  iconPercent?: number;
  noIconTint?: boolean;
}

export interface PropsWithTheme extends Props {
  theme: MD2Theme | MD3Theme;
}

export interface IconProps {
  image?: number;
  vector?: number;
  iconName?: string;
  size: number;
  color?: string;
  iconPercent?: number;
  noIconTint?: boolean;
}
