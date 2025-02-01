// External imports.
import type { KeyboardAwareScrollViewProps } from 'react-native-keyboard-controller';

// Types imports.
import type { MD2Theme, MD3Theme } from 'react-native-paper';

export type Props = KeyboardAwareScrollViewProps & {
  refreshing?: boolean;
  onRefresh?: () => void;
  refreshColor?: string;
};

export type PropsWithTheme = Props & {
  theme: MD2Theme | MD3Theme;
};
