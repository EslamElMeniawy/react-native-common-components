// External imports.
import React from 'react';
import { Pressable, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withTheme, Portal } from 'react-native-paper';

// Types imports.
import type { NativeEventSubscription } from 'react-native';
import type { Edge } from 'react-native-safe-area-context';
import type { PropsWithTheme, State } from './Dialog.types';

// Internal imports.
import styles from './Dialog.styles';

class Dialog extends React.PureComponent<PropsWithTheme, State> {
  // Variable for mount state.
  isComponentMounted: boolean = false;

  // Variable for android back handler.
  backHandlerSubscription: null | NativeEventSubscription = null;

  // #region Lifecycle
  componentDidMount() {
    // Set is mounted.
    this.isComponentMounted = true;

    // Register subscription for back handler.
    this.backHandlerSubscription = BackHandler.addEventListener(
      'hardwareBackPress',
      this._onBackPress
    );
  }

  componentWillUnmount() {
    // Clear is mounted.
    this.isComponentMounted = false;

    // Remove subscription for back handler.
    this.backHandlerSubscription?.remove();
  }
  // #endregion

  _onBackPress = (): boolean => {
    const { visible, onDismiss, dismissable } = this.props;

    if (visible) {
      const isDialogDismissable =
        dismissable == null || dismissable === undefined ? true : dismissable;

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

      const isDialogDismissable =
        dismissable == null || dismissable === undefined ? true : dismissable;

      const overlayStyle = [
        styles.overlay,
        {
          backgroundColor:
            overlayColor == null || overlayColor === undefined
              ? theme.colors.backdrop
              : overlayColor,
        },
      ];

      return (
        <Portal>
          <Pressable
            style={overlayStyle}
            onPress={isDialogDismissable ? onDismiss : null}
          >
            <SafeAreaView
              edges={edges}
              style={[styles.safeArea, { justifyContent: justifyContent }]}
            >
              <Pressable
                style={[
                  styles.dialog,
                  { backgroundColor: theme.colors.surface },
                  style,
                ]}
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
