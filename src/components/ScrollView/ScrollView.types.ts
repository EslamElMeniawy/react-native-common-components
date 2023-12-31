// External imports.
import * as React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Types imports.
import type { MD2Theme, MD3Theme } from 'react-native-paper';

export type Props = React.ComponentProps<typeof KeyboardAwareScrollView> & {
  refreshing?: boolean;
  onRefresh?: () => void;
  refreshColor?: string;
};

export type PropsWithTheme = Props & {
  theme: MD2Theme | MD3Theme;
};
