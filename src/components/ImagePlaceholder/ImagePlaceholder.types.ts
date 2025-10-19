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

export interface Props extends Partial<ViewProps> {
  size?: number;
  source?: string;
  placeholder?: number;
  vectorPlaceholder?: number;
  resizeMode?: ResizeModeType;
  priority?: PriorityType;
  cache?: CacheType;
  loadingProps?: Partial<LoadingProps>;
}

export interface PropsWithTheme extends Partial<Props> {
  theme: MD2Theme | MD3Theme;
}

export interface PlaceholderProps {
  source?: string;
  placeholder?: number;
  vectorPlaceholder?: number;
  resizeMode?: ResizeModeType;
  isLoading?: boolean;
  isError?: boolean;
  progress?: number;
  progressSize?: number;
}

export interface ImageProps extends Partial<PlaceholderProps> {
  priority?: PriorityType;
  cache?: CacheType;
  loadingProps?: Partial<LoadingProps>;
  setLoadingState?: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorState?: React.Dispatch<React.SetStateAction<boolean>>;
  setProgressState?: React.Dispatch<React.SetStateAction<number>>;
  setProgressSizeState?: React.Dispatch<React.SetStateAction<number>>;
}

export interface ImagePropsWithTheme extends Partial<ImageProps> {
  theme: MD2Theme | MD3Theme;
}

export interface ImageLoadingProps {
  loadingProps?: Partial<LoadingProps>;
  setProgressSizeState?: React.Dispatch<React.SetStateAction<number>>;
  progress?: number;
  progressSize?: number;
}

export interface ImageLoadingPropsWithTheme extends Partial<ImageLoadingProps> {
  theme: MD2Theme | MD3Theme;
}
