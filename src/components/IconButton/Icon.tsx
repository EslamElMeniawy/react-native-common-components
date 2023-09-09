// External imports.
import React from 'react';
import { Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Types imports.
import type { IconProps } from './IconButton.types';

// Internal imports.
import styles from './IconButton.styles';

const Icon = (props: IconProps): null | React.ReactElement => {
  const { image, vector, iconName, size, color, iconPercent, noIconTint } =
    props;

  const notNullIconPercent: number =
    iconPercent == null || iconPercent === undefined ? 60 : iconPercent;

  const iconSize: number = (size * notNullIconPercent) / 100;

  const iconStyle = [
    styles.icon,
    {
      width: iconSize,
      height: iconSize,
      tintColor: noIconTint ? undefined : color,
    },
  ];

  if (image) {
    return <Image source={image} style={iconStyle} resizeMode="contain" />;
  }

  if (vector) {
    try {
      const VectorImage = require('react-native-vector-image').default;

      return (
        <VectorImage source={vector} style={iconStyle} resizeMode="contain" />
      );
    } catch (error) {
      return null;
    }
  }

  if (iconName) {
    return (
      <MaterialCommunityIcons name={iconName} color={color} size={iconSize} />
    );
  }

  return null;
};

export default Icon;
