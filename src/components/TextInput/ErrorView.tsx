// External imports.
import * as React from 'react';
import { StyleSheet } from 'react-native';

// Types imports.
import type { PropsWithTheme } from './TextInput.types';

// Internal imports.
import styles from './TextInput.styles';
import { Text } from '../Text';

const ErrorView = React.memo<PropsWithTheme>(
  (props: PropsWithTheme): null | React.ReactElement => {
    const { errorProps, theme, style: inputStyle } = props;
    const { errorMessage, textProps } = errorProps ?? {};

    if (errorMessage) {
      const { type, style, ...rest } = textProps ?? {};

      const {
        marginVertical,
        marginBottom,
        width,
        marginHorizontal,
        marginStart,
        marginEnd,
        marginLeft,
        marginRight,
        alignSelf,
      } = inputStyle ?? {};

      const _widthHorizontalMarginStyle = {
        width,
        marginHorizontal,
        marginStart,
        marginEnd,
        marginLeft,
        marginRight,
        alignSelf,
      };

      return (
        <Text
          type={type ?? 'caption'}
          style={StyleSheet.flatten([
            styles.noVerticalMargin,
            {
              color: theme.colors.error,
              marginBottom: marginVertical ?? marginBottom,
            },
            _widthHorizontalMarginStyle,
            style,
          ])}
          {...rest}
        >
          {errorMessage}
        </Text>
      );
    }

    return null;
  }
);

export default ErrorView;
