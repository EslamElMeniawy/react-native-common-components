// External imports.
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  withTheme,
  TouchableRipple,
  RadioButton as PaperRadioButton,
} from 'react-native-paper';
import tinyColor from 'tinycolor2';

// Types imports.
import type { PropsWithTheme } from './CompoundButton.types';

// Internal imports.
import styles from './CompoundButton.styles';
import { Text } from '@src/components/Text';

const RadioButton = React.memo((props: PropsWithTheme): React.ReactElement => {
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
  const _checkedColor: string = checkedColor ?? theme.colors.primary;
  const _rippleColor = tinyColor(_checkedColor).setAlpha(0.25).toHex8String();
  const _flattenStyle = StyleSheet.flatten(style ?? {});

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
  } = _flattenStyle;

  const _borderRadius = (theme.isV3 ? 5 : 1) * theme.roundness;

  return (
    <View
      style={StyleSheet.flatten([
        styles.container,
        { borderRadius: _borderRadius },
        style,
        styles.noPadding,
      ])}
      {...other}
    >
      <TouchableRipple
        onPress={onPress}
        disabled={disabled}
        rippleColor={_rippleColor}
        underlayColor={_rippleColor}
      >
        <View
          style={StyleSheet.flatten([
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
          ])}
        >
          <PaperRadioButton.Android
            value={text ?? 'radio'}
            status={checked ? 'checked' : 'unchecked'}
            onPress={onPress}
            color={_checkedColor}
            uncheckedColor={uncheckedColor}
            disabled={disabled}
          />
          {Boolean(text) && Boolean(text?.length) && (
            <Text
              style={StyleSheet.flatten([styles.text, textStyle])}
              {...rest}
            >
              {text}
            </Text>
          )}
        </View>
      </TouchableRipple>
    </View>
  );
});

export default withTheme(RadioButton);
