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

const Button = (props: PropsWithTheme): React.ReactElement => {
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

  const enabledStyle = {
    opacity: disabled ? 0.5 : 1.0,
  };

  const buttonDefaultBackgroundStyle = {
    backgroundColor: theme.colors.primary,
  };

  const buttonColor =
    StyleSheet.flatten(
      style == null || style === undefined
        ? buttonDefaultBackgroundStyle
        : style
    ).backgroundColor?.toString() ?? theme.colors.primary;

  const textColor =
    StyleSheet.flatten(
      textStyle == null || textStyle === undefined ? styles.text : textStyle
    ).color?.toString() ??
    (theme.isV3
      ? theme.colors.onPrimary
      : tinyColor(buttonColor).isDark()
      ? '#ffffff'
      : '#000000');

  const rippleColor = tinyColor(textColor).setAlpha(0.25).toHex8String();

  const notNullIconSize: number = ms(
    iconSize == null || iconSize === undefined ? 24 : iconSize
  );

  const iconColor = noIconTint ? undefined : textColor;

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
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.primary },
        style,
        enabledStyle,
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
            },
          ]}
        >
          <Icon
            image={startImage}
            vector={startVector}
            iconName={startIconName}
            size={notNullIconSize}
            color={iconColor}
          />
          <Text
            style={[styles.text, { color: textColor }, textStyle]}
            type={type == null || type === undefined ? 'bold' : type}
            {...rest}
          >
            {text}
          </Text>
          <Icon
            image={endImage}
            vector={endVector}
            iconName={endIconName}
            size={notNullIconSize}
            color={iconColor}
          />
        </View>
      </TouchableRipple>
    </View>
  );
};

export default withTheme(Button);
