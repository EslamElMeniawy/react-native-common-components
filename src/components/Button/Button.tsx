// External imports.
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme, TouchableRipple } from 'react-native-paper';
import tinyColor from 'tinycolor2';

// Types imports.
import type { PropsWithTheme } from './Button.types';

// Internal imports.
import styles from './Button.styles';
import { Text } from '../Text';
import Icon from './Icon';
import ResponsiveDimensions from '../../utils/ResponsiveDimensions';

const Button = React.memo<PropsWithTheme>(
  (props: PropsWithTheme): React.ReactElement => {
    const {
      text,
      startImage,
      startVector,
      startIconName,
      startIconSize,
      startIconColor,
      noStartIconTint,
      endImage,
      endVector,
      endIconName,
      endIconSize,
      endIconColor,
      noEndIconTint,
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

    const _enabledStyle = { opacity: disabled ? 0.5 : 1.0 };

    const _buttonDefaultBackgroundStyle = {
      backgroundColor: theme.colors.primary,
    };

    const _buttonColor =
      StyleSheet.flatten(
        style ?? _buttonDefaultBackgroundStyle
      )?.backgroundColor?.toString() ?? theme.colors.primary;

    const _defaultTextColorNonV3 = tinyColor(_buttonColor).isDark()
      ? '#ffffff'
      : '#000000';

    const _defaultTextColor = theme.isV3
      ? theme.colors.onPrimary
      : _defaultTextColorNonV3;

    const _textColor =
      textStyle == null || textStyle === undefined
        ? _defaultTextColor
        : (StyleSheet.flatten(textStyle)?.color?.toString() ??
          _defaultTextColor);

    const _rippleColor = tinyColor(_textColor).setAlpha(0.25).toHex8String();
    const _startIconSize: number = ResponsiveDimensions.ms(
      startIconSize ?? iconSize ?? 24
    );
    const _endIconSize: number = ResponsiveDimensions.ms(
      endIconSize ?? iconSize ?? 24
    );

    const _startIconColor =
      noStartIconTint || noIconTint
        ? undefined
        : (startIconColor ?? _textColor);

    const _endIconColor =
      noEndIconTint || noIconTint ? undefined : (endIconColor ?? _textColor);

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
    } = _flattenStyle ?? {};

    const _borderRadius = (theme.isV3 ? 5 : 1) * theme.roundness;

    return (
      <View
        style={StyleSheet.flatten([
          styles.container,
          {
            backgroundColor: theme.colors.primary,
            borderRadius: _borderRadius,
          },
          style,
          _enabledStyle,
          styles.noPadding,
        ])}
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
              },
            ])}
          >
            <Icon
              image={startImage}
              vector={startVector}
              iconName={startIconName}
              size={_startIconSize}
              color={_startIconColor}
            />
            <Text
              style={StyleSheet.flatten([
                styles.text,
                { color: _textColor },
                textStyle,
              ])}
              type={type ?? 'bold'}
              {...rest}
            >
              {text}
            </Text>
            <Icon
              image={endImage}
              vector={endVector}
              iconName={endIconName}
              size={_endIconSize}
              color={_endIconColor}
            />
          </View>
        </TouchableRipple>
      </View>
    );
  }
);

export default withTheme(Button);
