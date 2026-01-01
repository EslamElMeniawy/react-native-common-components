// External imports.
import * as React from 'react';
import { StyleSheet } from 'react-native';

// Types imports.
import type { PlaceholderProps } from './ImagePlaceholder.types';

// Internal imports.
import styles from './ImagePlaceholder.styles';

let Image: any = null;
let VectorImage: any = null;

try {
  Image = require('react-native').Image;
} catch (error) {
  console.warn('Error loading Image from react-native:', error);
  Image = null;
}

try {
  VectorImage = require('react-native-vector-image').default;
} catch (error) {
  console.warn('Error loading `react-native-vector-image`:', error);
  VectorImage = null;
}

const Placeholder = React.memo(
  (props: PlaceholderProps): null | React.ReactElement => {
    const {
      source,
      placeholder,
      vectorPlaceholder,
      resizeMode,
      isLoading,
      isError,
    } = props;

    if (!source || isError || isLoading) {
      const _resizeMode = resizeMode ?? 'cover';

      if (placeholder && Image) {
        return React.createElement(Image, {
          source: placeholder,
          style: StyleSheet.flatten([
            styles.image,
            { resizeMode: _resizeMode },
          ]),
          resizeMode: _resizeMode,
        });
      }

      if (vectorPlaceholder && VectorImage) {
        return React.createElement(VectorImage, {
          source: vectorPlaceholder,
          style: StyleSheet.flatten([
            styles.image,
            { resizeMode: _resizeMode },
          ]),
          resizeMode: _resizeMode,
        });
      }

      return null;
    }

    return null;
  }
);

export default Placeholder;
