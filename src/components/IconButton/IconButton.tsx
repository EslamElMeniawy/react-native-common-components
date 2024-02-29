// External imports.
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { withTheme, TouchableRipple } from 'react-native-paper';
import { ms } from 'react-native-size-matters';
import tinyColor from 'tinycolor2';

// Types imports.
import type { PropsWithTheme } from './IconButton.types';

// Internal imports.
import styles from './IconButton.styles';
import Icon from './Icon';

const IconButton = React.memo((props: PropsWithTheme): React.ReactElement => {
  const {
    image,
    vector,
    iconName,
    size,
    color,
    onPress,
    onLongPress,
    onPressIn,
    onPressOut,
    disabled,
    iconPercent,
    style,
    theme,
    noIconTint,
    ...other
  } = props;

  const _size: number = ms(size ?? 36);
  const _color: string = color ?? theme.colors.primary;

  const _enabledStyle = {
    opacity: disabled ? 0.5 : 1.0,
  };

  const _rippleColor = tinyColor(_color).setAlpha(0.25).toHex8String();

  return (
    <View
      style={StyleSheet.flatten([
        styles.container,
        {
          borderRadius: _size / 2,
        },
        style,
        {
          width: _size,
          height: _size,
        },
        _enabledStyle,
        styles.noPadding,
      ])}
      {...other}
    >
      <TouchableRipple
        style={styles.ripple}
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        disabled={disabled}
        rippleColor={_rippleColor}
        underlayColor={_rippleColor}
      >
        <View style={StyleSheet.flatten([styles.ripple, styles.rippleView])}>
          <Icon
            image={image}
            vector={vector}
            iconName={iconName}
            size={_size}
            color={_color}
            iconPercent={iconPercent}
            noIconTint={noIconTint}
          />
        </View>
      </TouchableRipple>
    </View>
  );
});

export default withTheme(IconButton);
