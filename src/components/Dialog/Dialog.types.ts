// External imports.
import * as React from 'react';

// Types imports.
import type { MD2Theme, MD3Theme } from 'react-native-paper';
import type { StyleProp, ViewStyle } from 'react-native';

export interface Props {
  visible?: boolean;
  position?: 'top' | 'bottom' | 'center';
  onDismiss?: () => void;
  dismissable?: boolean;
  style?: Partial<StyleProp<ViewStyle>>;
  overlayColor?: string;
  children?: React.ReactNode;
}

export interface PropsWithTheme extends Partial<Props> {
  theme: MD2Theme | MD3Theme;
}
