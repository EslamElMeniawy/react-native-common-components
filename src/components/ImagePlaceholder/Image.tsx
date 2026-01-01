// External imports.
import * as React from 'react';

// Types imports.
import type { ImagePropsWithTheme } from './ImagePlaceholder.types';

// Internal imports.
import styles from './ImagePlaceholder.styles';
import Placeholder from './Placeholder';
import Loading from './Loading';

// Create fallback FastImage component ONCE at module level, not per-render
const FallbackFastImage = React.forwardRef(
  (imageProps: any, ref: React.Ref<any>) =>
    React.createElement('FastImage', { ...imageProps, ref })
) as any;

FallbackFastImage.resizeMode = {
  contain: 'contain',
  stretch: 'stretch',
  center: 'center',
  cover: 'cover',
};
FallbackFastImage.priority = {
  low: 'low',
  normal: 'normal',
  high: 'high',
};
FallbackFastImage.cacheControl = {
  web: 'web',
  cacheOnly: 'cacheOnly',
  immutable: 'immutable',
};

let FastImage: any = null;
try {
  FastImage = require('@d11/react-native-fast-image').default;
} catch (error) {
  FastImage = null;
}

const FastImageLocal: any = FastImage || FallbackFastImage;

const Image = React.memo(
  (props: ImagePropsWithTheme): null | React.ReactElement => {
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
        _resizeMode = FastImageLocal?.resizeMode?.contain;
        break;
      case 'stretch':
        _resizeMode = FastImageLocal?.resizeMode?.stretch;
        break;
      case 'center':
        _resizeMode = FastImageLocal?.resizeMode?.center;
        break;
      default:
        _resizeMode = FastImageLocal?.resizeMode?.cover;
        break;
    }

    let _priority;

    switch (priority) {
      case 'low':
        _priority = FastImageLocal?.priority?.low;
        break;
      case 'high':
        _priority = FastImageLocal?.priority?.high;
        break;
      default:
        _priority = FastImageLocal?.priority?.normal;
        break;
    }

    let _cache;

    switch (cache) {
      case 'web':
        _cache = FastImageLocal?.cacheControl?.web;
        break;
      case 'cacheOnly':
        _cache = FastImageLocal?.cacheControl?.cacheOnly;
        break;
      default:
        _cache = FastImageLocal?.cacheControl?.immutable;
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
          <FastImageLocal
            style={styles.image}
            source={{ uri: source, priority: _priority, cache: _cache }}
            resizeMode={_resizeMode}
            onLoadStart={() => setLoadingState?.(true)}
            onLoadEnd={() => setLoadingState?.(false)}
            onError={() => setErrorState?.(true)}
            onProgress={(e: {
              nativeEvent: { loaded: number; total: number };
            }) =>
              setProgressState?.(
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
  }
);

export default Image;
