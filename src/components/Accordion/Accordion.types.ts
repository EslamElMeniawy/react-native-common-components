// Types imports.
import type { StyleProp, ViewStyle } from 'react-native';
import type { MD2Theme, MD3Theme } from 'react-native-paper';
import type { IconButtonProps } from '../IconButton';

export interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  headerContainerStyle?: StyleProp<ViewStyle>;
  headerContent?: React.ReactNode;
  children?: React.ReactNode;
  iconButtonProps?: IconButtonProps;
}

export interface PropsWithTheme extends Props {
  theme: MD2Theme | MD3Theme;
}
