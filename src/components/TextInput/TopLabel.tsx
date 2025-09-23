// External imports.
import * as React from 'react';
import { StyleSheet } from 'react-native';

// Types imports.
import type { PropsWithTheme } from './TextInput.types';

// Internal imports.
import styles from './TextInput.styles';
import { Text } from '../Text';

const TopLabel = React.memo<PropsWithTheme>(
  (props: PropsWithTheme): null | React.ReactElement => {
    const { topLabelProps, theme, isRequired, style: inputStyle } = props;
    const { label, textProps } = topLabelProps ?? {};

    if (label) {
      const { type, size, style, ...other } = textProps ?? {};

      const {
        marginVertical,
        marginTop,
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
          type={type ?? 'bold'}
          size={size ?? 13}
          style={StyleSheet.flatten([
            styles.noVerticalMargin,
            {
              color: theme.isV3 ? theme.colors.onBackground : theme.colors.text,
              marginTop: marginVertical ?? marginTop,
            },
            _widthHorizontalMarginStyle,
            style,
          ])}
          {...other}
        >
          {label}
          {isRequired && (
            <Text
              type={type ?? 'bold'}
              size={size ?? 13}
              style={{ color: theme.colors.error }}
            >
              {' *'}
            </Text>
          )}
        </Text>
      );
    }

    return null;
  }
);

export default TopLabel;
