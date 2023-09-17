// Types imports.
import type { ViewProps } from 'react-native';
import type { MD2Theme, MD3Theme } from 'react-native-paper';

export type ResizeModeType = 'cover' | 'contain' | 'stretch' | 'center';

export type PriorityType = 'low' | 'normal' | 'high';

export type CacheType = 'immutable' | 'web' | 'cacheOnly';

export interface LoadingProps {
  showLoading?: boolean;
  color?: string;
  backgroundColor?: string;
}

export interface Props extends ViewProps {
  size?: number;
  source?: string;
  placeholder?: number;
  vectorPlaceholder?: number;
  resizeMode?: ResizeModeType;
  priority?: PriorityType;
  cache?: CacheType;
  loadingProps?: LoadingProps;
}

export interface PropsWithTheme extends Props {
  theme: MD2Theme | MD3Theme;
}

export interface State {
  isLoading: boolean;
  isError: boolean;
  progress: number;
  progressSize: number;
}

export interface PlaceholderProps extends State {
  source?: string;
  placeholder?: number;
  vectorPlaceholder?: number;
  resizeMode?: ResizeModeType;
}

export interface ImageProps extends PlaceholderProps {
  priority?: PriorityType;
  cache?: CacheType;
  loadingProps?: LoadingProps;
  theme: MD2Theme | MD3Theme;
  setLoadingState: (isLoading: boolean) => void;
  setErrorState: (isError: boolean) => void;
  setProgressState: (progress: number) => void;
  setProgressSizeState: (progressSize: number) => void;
}

export interface ImageLoadingProps {
  loadingProps?: LoadingProps;
  theme: MD2Theme | MD3Theme;
  setProgressSizeState: (progressSize: number) => void;
  progress: number;
  progressSize: number;
}
