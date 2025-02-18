// External imports.
import * as React from 'react';
import { Image, StyleSheet } from 'react-native';

// Types imports.
import type { IconProps } from '../IconButton';

// Internal imports.
import styles from './Button.styles';
import ResponsiveDimensions from '../../utils/ResponsiveDimensions';

const Icon = React.memo((props: IconProps): null | React.ReactElement => {
  const { image, vector, iconName, size, color } = props;
  const _iconSize: number = ResponsiveDimensions.ms(size);

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
    try {
      const MaterialCommunityIcons =
        require('react-native-vector-icons/MaterialCommunityIcons').default;

      return (
        <MaterialCommunityIcons
          name={iconName}
          color={color}
          size={_iconSize}
        />
      );
    } catch (error) {
      return null;
    }
  }

  return null;
});

export default Icon;
