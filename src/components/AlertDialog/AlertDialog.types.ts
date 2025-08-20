// Types imports.
import type { MD2Theme, MD3Theme } from 'react-native-paper';
import type { DialogProps } from '@src/components/Dialog';
import type { TextProps } from '@src/components/Text';
import type { ButtonProps } from '@src/components/Button';

export interface Action {
  action?: string;
  actionProps?: Omit<ButtonProps, 'text'>;
}

export interface Props {
  dialogProps?: DialogProps;
  title?: string;
  titleProps?: Omit<TextProps, 'children'>;
  message?: string;
  messageProps?: Omit<TextProps, 'children'>;
  actions?: Action[];
}

export interface PropsWithTheme extends Props {
  theme: MD2Theme | MD3Theme;
}
