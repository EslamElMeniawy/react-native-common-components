// External imports.
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  withTheme,
  TouchableRipple,
  Checkbox as PaperCheckbox,
} from 'react-native-paper';
import tinyColor from 'tinycolor2';

// Types imports.
import type { PropsWithTheme } from './CompoundButton.types';

// Internal imports.
import styles from './CompoundButton.styles';
import { Text } from '../Text';

const Checkbox = React.memo((props: PropsWithTheme): React.ReactElement => {
  const {
    text,
    checked,
    onPress,
    disabled,
    checkedColor,
    uncheckedColor,
    textProps,
    contentAlign,
    style,
    theme,
    ...other
  } = props;

  const { style: textStyle, ...rest } = textProps ?? {};

  const notNullCheckedColor: string =
    checkedColor == null || checkedColor === undefined
      ? theme.colors.primary
      : checkedColor;

  const rippleColor = tinyColor(notNullCheckedColor)
    .setAlpha(0.25)
    .toHex8String();

  const flattenStyle = StyleSheet.flatten(
    style == null || style === undefined ? {} : style
  );

  const {
    padding,
    paddingHorizontal,
    paddingVertical,
    paddingTop,
    paddingBottom,
    paddingStart,
    paddingEnd,
    paddingRight,
    paddingLeft,
  } = flattenStyle;

  return (
    <View style={[styles.container, style, styles.noPadding]} {...other}>
      <TouchableRipple
        onPress={onPress}
        disabled={disabled}
        rippleColor={rippleColor}
        underlayColor={rippleColor}
      >
        <View
          style={[
            styles.rippleView,
            {
              padding,
              paddingHorizontal,
              paddingVertical,
              paddingTop,
              paddingBottom,
              paddingStart,
              paddingEnd,
              paddingRight,
              paddingLeft,
              alignItems: contentAlign ?? 'center',
            },
          ]}
        >
          <PaperCheckbox.Android
            status={checked ? 'checked' : 'unchecked'}
            onPress={onPress}
            color={notNullCheckedColor}
            uncheckedColor={uncheckedColor}
            disabled={disabled}
          />
          {Boolean(text) && Boolean(text?.length) && (
            <Text style={[styles.text, textStyle]} {...rest}>
              {text}
            </Text>
          )}
        </View>
      </TouchableRipple>
    </View>
  );
});

export default withTheme(Checkbox);
