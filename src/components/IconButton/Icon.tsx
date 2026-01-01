// External imports.
import * as React from 'react';
import { Image, StyleSheet } from 'react-native';

// Types imports.
import type { IconProps } from './IconButton.types';

// Internal imports.
import styles from './IconButton.styles';
import { ResponsiveDimensions } from '../../utils';

let VectorImage: any = null;
try {
  VectorImage = require('react-native-vector-image').default;
} catch (_error) {
  VectorImage = null;
}

let MaterialDesignIcons: any = null;
try {
  MaterialDesignIcons =
    require('@react-native-vector-icons/material-design-icons').MaterialDesignIcons;
} catch (_error) {
  MaterialDesignIcons = null;
}

const Icon = React.memo((props: IconProps): null | React.ReactElement => {
  const { image, vector, iconName, size, color, iconPercent, noIconTint } =
    props;

  const _iconPercent: number = iconPercent ?? 60;

  const _iconSize: number =
    ((size ?? ResponsiveDimensions.ms(size ?? 36)) * _iconPercent) / 100;

  const _iconStyle = StyleSheet.flatten([
    styles.icon,
    {
      width: _iconSize,
      height: _iconSize,
      tintColor: noIconTint ? undefined : color,
    },
  ]);

  if (image) {
    return <Image source={image} style={_iconStyle} resizeMode="contain" />;
  }

  if (vector && VectorImage) {
    return (
      <VectorImage source={vector} style={_iconStyle} resizeMode="contain" />
    );
  }

  if (iconName && MaterialDesignIcons) {
    return (
      <MaterialDesignIcons name={iconName} color={color} size={_iconSize} />
    );
  }

  return null;
});

export default Icon;
