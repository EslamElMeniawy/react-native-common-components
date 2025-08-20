// Types imports.
import type {
  MD2Theme,
  MD3Theme,
  ActivityIndicatorProps,
} from 'react-native-paper';
import type { DialogProps } from '@src/components/Dialog';

export interface Props {
  visible?: boolean;
  dialogProps?: Omit<DialogProps, 'visible'>;
  loader?: React.ReactNode;
  activityIndicatorProps?: Omit<ActivityIndicatorProps, 'animating'>;
}

export interface PropsWithTheme extends Props {
  theme: MD2Theme | MD3Theme;
}
