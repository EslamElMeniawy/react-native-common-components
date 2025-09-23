// Types imports.
import type { MD2Theme, MD3Theme } from 'react-native-paper';
import type { FlatListProps } from 'react-native';
import type { FlatListItem } from '../../types/FlatListItem';

export interface Props<T extends FlatListItem = FlatListItem>
  extends Partial<FlatListProps<T>> {
  refreshColor?: string;
}

export interface PropsWithTheme extends Partial<Props> {
  theme: MD2Theme | MD3Theme;
}
