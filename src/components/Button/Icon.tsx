// External imports.
import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ms } from 'react-native-size-matters';

// Types imports.
import type { IconProps } from '../IconButton';

// Internal imports.
import styles from './Button.styles';

const Icon = React.memo((props: IconProps): null | React.ReactElement => {
  const { image, vector, iconName, size, color } = props;
  const _iconSize: number = ms(size);

  const _iconStyle = StyleSheet.flatten([
    styles.icon,
    {
      width: _iconSize,
      height: _iconSize,
      tintColor: color,
    },
  ]);

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
