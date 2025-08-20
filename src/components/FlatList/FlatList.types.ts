// Types imports.
import type { MD2Theme, MD3Theme } from 'react-native-paper';
import type { FlatListProps } from 'react-native';
import type { FlatListItem } from '@src/types/FlatListItem';

export interface Props<T extends FlatListItem = FlatListItem>
  extends FlatListProps<T> {
  refreshColor?: string;
}

export interface PropsWithTheme extends Props {
  theme: MD2Theme | MD3Theme;
}
