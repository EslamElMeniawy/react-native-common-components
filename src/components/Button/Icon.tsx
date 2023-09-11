// External imports.
import * as React from 'react';
import { Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ms } from 'react-native-size-matters';

// Types imports.
import type { IconProps } from '../IconButton';

// Internal imports.
import styles from './Button.styles';

const Icon = (props: IconProps): null | React.ReactElement => {
  const { image, vector, iconName, size, color } = props;
  const iconSize: number = ms(size);

  const iconStyle = [
    styles.icon,
    {
      width: iconSize,
      height: iconSize,
      tintColor: color,
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
