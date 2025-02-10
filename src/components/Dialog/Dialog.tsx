// External imports.
import * as React from 'react';
import { Pressable, BackHandler, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withTheme, Portal } from 'react-native-paper';

// Types imports.
import type { PropsWithTheme, State } from './Dialog.types';
import type { NativeEventSubscription } from 'react-native';
import type { Edge } from 'react-native-safe-area-context';

// Internal imports.
import styles from './Dialog.styles';

class Dialog extends React.PureComponent<PropsWithTheme, State> {
  // Variable for android back handler.
  _backHandlerSubscription: null | NativeEventSubscription = null;

  // #region Lifecycle
  componentDidMount() {
    // Register subscription for back handler.
    this._backHandlerSubscription = BackHandler.addEventListener(
      'hardwareBackPress',
      this._onBackPress
    );
  }

  componentWillUnmount() {
    // Remove subscription for back handler.
    this._backHandlerSubscription?.remove();
  }
  // #endregion

  _onBackPress = (): boolean => {
    const { visible, onDismiss, dismissable } = this.props;

    if (visible) {
      const isDialogDismissable = dismissable ?? true;

      if (isDialogDismissable && onDismiss) {
        onDismiss();
      }

      return true;
    } else {
      return false;
    }
  };

  render(): null | React.ReactElement {
    const {
      visible,
      position,
      onDismiss,
      dismissable,
      style,
      overlayColor,
      children,
      theme,
    } = this.props;

    if (visible) {
      const edges: Edge[] = ['right', 'left'];

      let justifyContent:
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'space-between'
        | 'space-around'
        | 'space-evenly'
        | undefined;

      switch (position) {
        case 'top':
          edges.push('bottom');
          justifyContent = 'flex-start';
          break;
        case 'bottom':
          edges.push('top');
          justifyContent = 'flex-end';
          break;
        default:
          edges.push('top', 'bottom');
          justifyContent = 'center';
          break;
      }

      const isDialogDismissable = dismissable ?? true;

      const overlayStyle = StyleSheet.flatten([
        styles.overlay,
        {
          backgroundColor: overlayColor ?? theme.colors.backdrop,
        },
      ]);

      const borderRadius = (theme.isV3 ? 7 : 1) * theme.roundness;

      return (
        <Portal>
          <Pressable
            style={overlayStyle}
            onPress={isDialogDismissable ? onDismiss : null}
          >
            <SafeAreaView
              edges={edges}
              style={StyleSheet.flatten([
                styles.safeArea,
                { justifyContent: justifyContent },
              ])}
            >
              <Pressable
                style={StyleSheet.flatten([
                  styles.dialog,
                  {
                    backgroundColor: theme.colors.surface,
                    borderRadius: borderRadius,
                    padding: borderRadius,
                  },
                  style,
                ])}
                onPress={() => {}}
              >
                {children}
              </Pressable>
            </SafeAreaView>
          </Pressable>
        </Portal>
      );
    }

    return null;
  }
}

export default withTheme(Dialog);
