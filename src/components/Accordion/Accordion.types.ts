// Types imports.
import type { StyleProp, ViewStyle } from 'react-native';
import type { MD2Theme, MD3Theme } from 'react-native-paper';
import type { IconButtonProps } from '../IconButton';

export interface Props {
  containerStyle?: Partial<StyleProp<ViewStyle>>;
  headerContainerStyle?: Partial<StyleProp<ViewStyle>>;
  headerContent?: React.ReactNode;
  children?: React.ReactNode;
  iconButtonProps?: Partial<IconButtonProps>;
}

export interface PropsWithTheme extends Partial<Props> {
  theme: MD2Theme | MD3Theme;
}
