// Types imports.
import type { MD2Theme, MD3Theme } from 'react-native-paper';
import type { DialogProps } from '../Dialog';
import type { TextProps } from '../Text';
import type { ButtonProps } from '../Button';

export interface Action {
  action?: string;
  actionProps?: Omit<Partial<ButtonProps>, 'text'>;
}

export interface Props {
  dialogProps?: Partial<DialogProps>;
  title?: string;
  titleProps?: Omit<Partial<TextProps>, 'children'>;
  message?: string;
  messageProps?: Omit<Partial<TextProps>, 'children'>;
  actions?: Partial<Action>[];
}

export interface PropsWithTheme extends Partial<Props> {
  theme: MD2Theme | MD3Theme;
}
