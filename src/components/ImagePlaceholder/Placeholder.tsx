// External imports.
import * as React from 'react';
import { Image } from 'react-native';

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
      const notNullResizeMode = resizeMode || 'cover';

      if (placeholder) {
        return (
          <Image
            source={placeholder}
            style={[styles.image, { resizeMode: notNullResizeMode }]}
            resizeMode={notNullResizeMode}
          />
        );
      }

      if (vectorPlaceholder) {
        try {
          const VectorImage = require('react-native-vector-image').default;

          return (
            <VectorImage
              source={vectorPlaceholder}
              style={[styles.image, { resizeMode: notNullResizeMode }]}
              resizeMode={notNullResizeMode}
            />
          );
        } catch (error) {
          return null;
        }
      }

      return null;
    }

    return null;
  }
);

export default Placeholder;
