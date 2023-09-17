// External imports.
import { Card } from 'react-native-paper';

// Types imports.
import type { MD2Theme, MD3Theme } from 'react-native-paper';

export type Props = React.ComponentProps<typeof Card>;

export type PropsWithTheme = Props & {
  theme: MD2Theme | MD3Theme;
};
