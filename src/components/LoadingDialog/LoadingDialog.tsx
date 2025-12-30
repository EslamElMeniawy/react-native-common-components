// External imports.
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { withTheme, ActivityIndicator } from 'react-native-paper';

// Types imports.
import type { PropsWithTheme, Props } from './LoadingDialog.types';

// Internal imports.
import styles from './LoadingDialog.styles';
import { Dialog } from '../Dialog';

/**
 * LoadingDialog component (unwrapped, for testing)
 * Displays a loading dialog with an activity indicator
 */
export const LoadingDialogComponent = React.memo(
  (props: PropsWithTheme): React.ReactElement => {
    const { visible, theme, dialogProps, loader, activityIndicatorProps } =
      props;

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
        style={StyleSheet.flatten([styles.dialog, dialogStyle])}
        {...restDialogProps}
      >
        {loader ?? (
          <ActivityIndicator
            animating={visible}
            size={size ?? 'large'}
            color={color ?? theme.colors.surface}
            {...restActivityIndicatorProps}
          />
        )}
      </Dialog>
    );
  }
);

LoadingDialogComponent.displayName = 'LoadingDialogComponent';

/**
 * LoadingDialog component (wrapped with theme, for production)
 */
const LoadingDialog = withTheme(
  LoadingDialogComponent
) as React.ComponentType<Props>;

export default LoadingDialog;
