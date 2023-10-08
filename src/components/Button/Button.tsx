// External imports.
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme, TouchableRipple } from 'react-native-paper';
import { ms } from 'react-native-size-matters';
import tinyColor from 'tinycolor2';

// Types imports.
import type { PropsWithTheme } from './Button.types';

// Internal imports.
import styles from './Button.styles';
import { Text } from '../Text';
import Icon from './Icon';

const Button = React.memo((props: PropsWithTheme): React.ReactElement => {
  const {
    text,
    startImage,
    startVector,
    startIconName,
    endImage,
    endVector,
    endIconName,
    onPress,
    onLongPress,
    onPressIn,
    onPressOut,
    disabled,
    iconSize,
    noIconTint,
    textProps,
    style,
    theme,
    ...other
  } = props;

  const { style: textStyle, type, ...rest } = textProps ?? {};

  const _enabledStyle = {
    opacity: disabled ? 0.5 : 1.0,
  };

  const _buttonDefaultBackgroundStyle = {
    backgroundColor: theme.colors.primary,
  };

  const _buttonColor =
    StyleSheet.flatten(
      style == null || style === undefined
        ? _buttonDefaultBackgroundStyle
        : style
    ).backgroundColor?.toString() ?? theme.colors.primary;

  const _defaultTextColor = theme.isV3
    ? theme.colors.onPrimary
    : tinyColor(_buttonColor).isDark()
    ? '#ffffff'
    : '#000000';

  const _textColor =
    textStyle == null || textStyle === undefined
      ? _defaultTextColor
      : StyleSheet.flatten(textStyle).color?.toString() ?? _defaultTextColor;

  const _rippleColor = tinyColor(_textColor).setAlpha(0.25).toHex8String();

  const _iconSize: number = ms(
    iconSize == null || iconSize === undefined ? 24 : iconSize
  );

  const _iconColor = noIconTint ? undefined : _textColor;

  const _flattenStyle = StyleSheet.flatten(
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
  } = _flattenStyle;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.primary },
        style,
        _enabledStyle,
        styles.noPadding,
      ]}
      {...other}
    >
      <TouchableRipple
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        disabled={disabled}
        rippleColor={_rippleColor}
        underlayColor={_rippleColor}
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
            },
          ]}
        >
          <Icon
            image={startImage}
            vector={startVector}
            iconName={startIconName}
            size={_iconSize}
            color={_iconColor}
          />
          <Text
            style={[styles.text, { color: _textColor }, textStyle]}
            type={type == null || type === undefined ? 'bold' : type}
            {...rest}
          >
            {text}
          </Text>
          <Icon
            image={endImage}
            vector={endVector}
            iconName={endIconName}
            size={_iconSize}
            color={_iconColor}
          />
        </View>
      </TouchableRipple>
    </View>
  );
});

export default withTheme(Button);
