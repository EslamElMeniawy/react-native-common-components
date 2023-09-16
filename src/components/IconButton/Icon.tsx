// External imports.
import * as React from 'react';
import { Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Types imports.
import type { IconProps } from './IconButton.types';

// Internal imports.
import styles from './IconButton.styles';

const Icon = React.memo((props: IconProps): null | React.ReactElement => {
  const { image, vector, iconName, size, color, iconPercent, noIconTint } =
    props;

  const _iconPercent: number =
    iconPercent == null || iconPercent === undefined ? 60 : iconPercent;

  const _iconSize: number = (size * _iconPercent) / 100;

  const _iconStyle = [
    styles.icon,
    {
      width: _iconSize,
      height: _iconSize,
      tintColor: noIconTint ? undefined : color,
    },
  ];

  if (image) {
    return <Image source={image} style={_iconStyle} resizeMode="contain" />;
  }

  if (vector) {
    try {
      const VectorImage = require('react-native-vector-image').default;

      return (
        <VectorImage source={vector} style={_iconStyle} resizeMode="contain" />
      );
    } catch (error) {
      return null;
    }
  }

  if (iconName) {
    return (
      <MaterialCommunityIcons name={iconName} color={color} size={_iconSize} />
    );
  }

  return null;
});

export default Icon;
