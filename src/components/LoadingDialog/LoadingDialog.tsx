// External imports.
import * as React from 'react';
import { withTheme, ActivityIndicator } from 'react-native-paper';

// Types imports.
import type { PropsWithTheme } from './LoadingDialog.types';

// Internal imports.
import styles from './LoadingDialog.styles';
import { Dialog } from '../Dialog';

const LoadingDialog = (props: PropsWithTheme): React.ReactElement => {
  const { visible, theme, dialogProps, activityIndicatorProps } = props;

  const {
    dismissable,
    style: dialogStyle,
    ...restDialogProps
  } = dialogProps ?? {};

  const { size, color, ...restActivityIndicatorProps } =
    activityIndicatorProps ?? {};

  return (
    <Dialog
      visible={visible}
      dismissable={dismissable ?? false}
      style={[styles.dialog, dialogStyle]}
      {...restDialogProps}
    >
      <ActivityIndicator
        animating={visible}
        size={size ?? 'large'}
        color={color ?? theme.colors.surface}
        {...restActivityIndicatorProps}
      />
    </Dialog>
  );
};

export default withTheme(LoadingDialog);
