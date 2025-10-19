// External imports.
import * as React from 'react';
import { Image, StyleSheet } from 'react-native';

// Types imports.
import type { PlaceholderProps } from './ImagePlaceholder.types';

// Internal imports.
import styles from './ImagePlaceholder.styles';

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

      if (placeholder) {
        return (
          <Image
            source={placeholder}
            style={StyleSheet.flatten([
              styles.image,
              { resizeMode: _resizeMode },
            ])}
            resizeMode={_resizeMode}
          />
        );
      }

      if (vectorPlaceholder) {
        try {
          const VectorImage = require('react-native-vector-image').default;

          return (
            <VectorImage
              source={vectorPlaceholder}
              style={StyleSheet.flatten([
                styles.image,
                { resizeMode: _resizeMode },
              ])}
              resizeMode={_resizeMode}
            />
          );
        } catch (error) {
          console.warn('Error loading `react-native-vector-image`:', error);
          return null;
        }
      }

      return null;
    }

    return null;
  }
);

export default Placeholder;
