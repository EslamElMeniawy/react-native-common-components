// Types imports.
import type {
  ClientOptions,
  ReactotronReactNative,
} from 'reactotron-react-native';
import type { PluginCreator } from 'reactotron-core-client';

export type LogLevel = 'INFO' | 'LOG' | 'WARN' | 'ERROR';

export type Options = {
  appName?: string;
  firebaseLogLevels?: LogLevel[];
  isLocalLogEnable?: boolean;
  clientOptions?: ClientOptions<ReactotronReactNative>;
  pluginCreators?: PluginCreator<ReactotronReactNative>[];
};
