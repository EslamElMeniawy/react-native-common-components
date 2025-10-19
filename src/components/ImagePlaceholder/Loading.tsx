// External imports.
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

// Types imports.
import type { ImageLoadingPropsWithTheme } from './ImagePlaceholder.types';
import type { LayoutChangeEvent } from 'react-native';

// Internal imports.
import styles from './ImagePlaceholder.styles';

const Loading = React.memo(
  (props: ImageLoadingPropsWithTheme): null | React.ReactElement => {
    try {
      const Progress = require('react-native-progress');
      require('react-native-svg');

      const {
        loadingProps,
        theme,
        setProgressSizeState,
        progress,
        progressSize,
      } = props;

      return (
        <View
          style={StyleSheet.flatten([
            styles.image,
            styles.loadingContainer,
            {
              backgroundColor:
                loadingProps?.backgroundColor == null ||
                loadingProps?.backgroundColor === undefined
                  ? theme.colors.backdrop
                  : loadingProps?.backgroundColor,
            },
          ])}
          onLayout={(event: LayoutChangeEvent) =>
            setProgressSizeState?.(
              (event.nativeEvent.layout.width > event.nativeEvent.layout.height
                ? event.nativeEvent.layout.height
                : event.nativeEvent.layout.width) / 2
            )
          }
        >
          <Progress.Pie
            indeterminate={(progress ?? 0) <= 0}
            size={progressSize}
            progress={progress}
            color={
              loadingProps?.color == null || loadingProps?.color === undefined
                ? theme.colors.surface
                : loadingProps?.color
            }
          />
        </View>
      );
    } catch (error) {
      console.warn('Error loading `react-native-progress`:', error);
      return null;
    }
  }
);

export default Loading;
