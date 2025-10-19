// Types imports.
import type {
  MD2Theme,
  MD3Theme,
  ActivityIndicatorProps,
} from 'react-native-paper';
import type { DialogProps } from '../Dialog';

export interface Props {
  visible?: boolean;
  dialogProps?: Omit<Partial<DialogProps>, 'visible'>;
  loader?: React.ReactNode;
  activityIndicatorProps?: Omit<Partial<ActivityIndicatorProps>, 'animating'>;
}

export interface PropsWithTheme extends Partial<Props> {
  theme: MD2Theme | MD3Theme;
}
