// External imports.
import React from 'react';
import { View } from 'react-native';
import { withTheme, TouchableRipple } from 'react-native-paper';
import { ms } from 'react-native-size-matters';
import tinyColor from 'tinycolor2';

// Types imports.
import type { PropsWithTheme } from './IconButton.types';

// Internal imports.
import styles from './IconButton.styles';
import Icon from './Icon';

const IconButton = (props: PropsWithTheme): React.ReactElement => {
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

  const notNullSize: number = ms(
    size == null || size === undefined ? 36 : size
  );

  const notNullColor: string =
    color == null || color === undefined ? theme.colors.primary : color;

  const enabledStyle = {
    opacity: disabled ? 0.5 : 1.0,
  };

  const rippleColor = tinyColor(notNullColor).setAlpha(0.25).toHex8String();

  return (
    <View
      style={[
        styles.container,
        {
          borderRadius: notNullSize / 2,
        },
        style,
        {
          width: notNullSize,
          height: notNullSize,
        },
        enabledStyle,
        styles.noPadding,
      ]}
      {...other}
    >
      <TouchableRipple
        style={styles.ripple}
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        disabled={disabled}
        rippleColor={rippleColor}
        underlayColor={rippleColor}
      >
        <View style={[styles.ripple, styles.rippleView]}>
          <Icon
            image={image}
            vector={vector}
            iconName={iconName}
            size={notNullSize}
            color={notNullColor}
            iconPercent={iconPercent}
            noIconTint={noIconTint}
          />
        </View>
      </TouchableRipple>
    </View>
  );
};

export default withTheme(IconButton);
