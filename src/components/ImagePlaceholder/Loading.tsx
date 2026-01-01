// External imports.
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

// Types imports.
import type { LayoutChangeEvent } from 'react-native';
import type { ImageLoadingPropsWithTheme } from './ImagePlaceholder.types';

// Internal imports.
import styles from './ImagePlaceholder.styles';

let Progress: any = null;
try {
  Progress = require('react-native-progress');
  try {
    require('react-native-svg');
  } catch (_error) {
    // ignore svg load errors in non-native envs
  }
} catch (error) {
  console.warn('Error loading `react-native-progress`:', error);
  Progress = null;
}

// Create ProgressPie component ONCE at module level, not per-render
const ProgressPie = (Progress as any)?.Pie
  ? (Progress as any).Pie
  : (pieProps: any) => React.createElement('Pie', pieProps);

const Loading = React.memo(
  (props: ImageLoadingPropsWithTheme): null | React.ReactElement => {
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
        <ProgressPie
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
  }
);

export default Loading;
