// External imports.
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { withTheme } from 'react-native-paper';

// Types imports.
import type { PropsWithTheme } from './ImagePlaceholder.types';

// Internal imports.
import styles from './ImagePlaceholder.styles';
import Image from './Image';
import ResponsiveDimensions from '../../utils/ResponsiveDimensions';

const ImagePlaceholder = React.memo<PropsWithTheme>(
  (props: PropsWithTheme): React.ReactElement => {
    const {
      size,
      source,
      placeholder,
      vectorPlaceholder,
      resizeMode,
      priority,
      cache,
      loadingProps,
      style,
      theme,
      ...other
    } = props;

    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [progressSize, setProgressSize] = React.useState(0);

    const _scaledSize: number | undefined =
      size == null || size === undefined
        ? undefined
        : ResponsiveDimensions.ms(size);

    return (
      <View
        style={StyleSheet.flatten([
          styles.container,
          { width: _scaledSize, height: _scaledSize },
          styles.noPadding,
          style,
        ])}
        {...other}
      >
        <Image
          source={source}
          placeholder={placeholder}
          vectorPlaceholder={vectorPlaceholder}
          resizeMode={resizeMode}
          priority={priority}
          cache={cache}
          loadingProps={loadingProps}
          theme={theme}
          isLoading={isLoading}
          isError={isError}
          progress={progress}
          progressSize={progressSize}
          setLoadingState={setIsLoading}
          setErrorState={setIsError}
          setProgressState={setProgress}
          setProgressSizeState={setProgressSize}
        />
      </View>
    );
  }
);

export default withTheme(ImagePlaceholder);
