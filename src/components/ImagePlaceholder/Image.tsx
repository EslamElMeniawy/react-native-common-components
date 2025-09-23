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
    const FastImage = require('@d11/react-native-fast-image').default;
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

    let _resizeMode;

    switch (resizeMode) {
      case 'contain':
        _resizeMode = FastImage.resizeMode.contain;
        break;
      case 'stretch':
        _resizeMode = FastImage.resizeMode.stretch;
        break;
      case 'center':
        _resizeMode = FastImage.resizeMode.center;
        break;
      default:
        _resizeMode = FastImage.resizeMode.cover;
        break;
    }

    let _priority;

    switch (priority) {
      case 'low':
        _priority = FastImage.priority.low;
        break;
      case 'high':
        _priority = FastImage.priority.high;
        break;
      default:
        _priority = FastImage.priority.normal;
        break;
    }

    let _cache;

    switch (cache) {
      case 'web':
        _cache = FastImage.cacheControl.web;
        break;
      case 'cacheOnly':
        _cache = FastImage.cacheControl.cacheOnly;
        break;
      default:
        _cache = FastImage.cacheControl.immutable;
        break;
    }

    let _shouldDisplayLoading: boolean | undefined = isLoading;

    if (loadingProps?.showLoading === false) {
      _shouldDisplayLoading = false;
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
            source={{ uri: source, priority: _priority, cache: _cache }}
            resizeMode={_resizeMode}
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
        {_shouldDisplayLoading && (
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
