// External imports.
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { ms } from 'react-native-size-matters';
import { withTheme } from 'react-native-paper';

// Types imports.
import type { PropsWithTheme, State } from './ImagePlaceholder.types';

// Internal imports.
import styles from './ImagePlaceholder.styles';
import Image from './Image';

class ImagePlaceholder extends React.PureComponent<PropsWithTheme, State> {
  // Variable for mount state.
  _isComponentMounted: boolean = false;

  constructor(props: PropsWithTheme) {
    super(props);

    this.state = {
      isLoading: false,
      isError: false,
      progress: 0,
      progressSize: 0,
    };
  }

  // #region Lifecycle
  componentDidMount() {
    // Set is mounted.
    this._isComponentMounted = true;
  }

  componentWillUnmount() {
    // Clear is mounted.
    this._isComponentMounted = false;
  }
  // #endregion

  _setLoadingState = (isLoading: boolean): void => {
    if (this._isComponentMounted) {
      this.setState({ isLoading });
    }
  };

  _setErrorState = (isError: boolean): void => {
    if (this._isComponentMounted) {
      this.setState({ isError, isLoading: false });
    }
  };

  _setProgressState = (progress: number): void => {
    if (this._isComponentMounted) {
      this.setState({ progress });
    }
  };

  _setProgressSizeState = (progressSize: number): void => {
    if (this._isComponentMounted) {
      this.setState({ progressSize });
    }
  };

  render(): React.ReactElement {
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
    } = this.props;

    const { isLoading, isError, progress, progressSize } = this.state;

    const scaledSize: number | undefined =
      size == null || size === undefined ? undefined : ms(size);

    return (
      <View
        style={StyleSheet.flatten([
          styles.container,
          style,
          { width: scaledSize, height: scaledSize },
          styles.noPadding,
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
          setLoadingState={this._setLoadingState}
          setErrorState={this._setErrorState}
          setProgressState={this._setProgressState}
          setProgressSizeState={this._setProgressSizeState}
        />
      </View>
    );
  }
}

export default withTheme(ImagePlaceholder);
