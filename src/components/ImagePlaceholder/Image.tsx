// External imports.
import * as React from 'react';

// Types imports.
import type { ImageProps } from './ImagePlaceholder.types';

// Internal imports.
import styles from './ImagePlaceholder.styles';
import Placeholder from './Placeholder';
import Loading from './Loading';

const Image = React.memo((props: ImageProps): null | React.ReactElement => {
  try {
    const FastImage = require('react-native-fast-image');
    require('react-native-svg');

    const {
      source,
      placeholder,
      vectorPlaceholder,
      resizeMode,
      priority,
      cache,
      loadingProps,
      theme,
      isLoading,
      isError,
      progress,
      progressSize,
      setLoadingState,
      setErrorState,
      setProgressState,
      setProgressSizeState,
    } = props;

    let notNullResizeMode;

    switch (resizeMode) {
      case 'contain':
        notNullResizeMode = FastImage.resizeMode.contain;
        break;
      case 'stretch':
        notNullResizeMode = FastImage.resizeMode.stretch;
        break;
      case 'center':
        notNullResizeMode = FastImage.resizeMode.center;
        break;
      default:
        notNullResizeMode = FastImage.resizeMode.cover;
        break;
    }

    let notNullPriority;

    switch (priority) {
      case 'low':
        notNullPriority = FastImage.priority.low;
        break;
      case 'high':
        notNullPriority = FastImage.priority.high;
        break;
      default:
        notNullPriority = FastImage.priority.normal;
        break;
    }

    let notNullCache;

    switch (cache) {
      case 'web':
        notNullCache = FastImage.cacheControl.web;
        break;
      case 'cacheOnly':
        notNullCache = FastImage.cacheControl.cacheOnly;
        break;
      default:
        notNullCache = FastImage.cacheControl.immutable;
        break;
    }

    let shouldDisplayLoading: boolean = isLoading;

    if (loadingProps?.showLoading === false) {
      shouldDisplayLoading = false;
    }

    return (
      <>
        <Placeholder
          source={source}
          placeholder={placeholder}
          vectorPlaceholder={vectorPlaceholder}
          resizeMode={resizeMode}
          isLoading={isLoading}
          isError={isError}
          progress={progress}
          progressSize={progressSize}
        />
        {Boolean(source) && !isError && (
          <FastImage
            style={styles.image}
            source={{
              uri: source,
              priority: notNullPriority,
              cache: notNullCache,
            }}
            resizeMode={notNullResizeMode}
            onLoadStart={() => setLoadingState(true)}
            onLoadEnd={() => setLoadingState(false)}
            onError={() => setErrorState(true)}
            onProgress={(e: {
              nativeEvent: { loaded: number; total: number };
            }) =>
              setProgressState(
                e.nativeEvent.total > 0
                  ? e.nativeEvent.loaded / e.nativeEvent.total
                  : 0
              )
            }
          />
        )}
        {shouldDisplayLoading && (
          <Loading
            loadingProps={loadingProps}
            theme={theme}
            setProgressSizeState={setProgressSizeState}
            progress={progress}
            progressSize={progressSize}
          />
        )}
      </>
    );
  } catch (error) {
    return null;
  }
});

export default Image;
