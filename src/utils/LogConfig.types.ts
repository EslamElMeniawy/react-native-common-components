// Types imports.
import type { ClientOptions } from 'reactotron-core-client/dist/types/client-options';
import type { Reactotron } from 'reactotron-core-client';
import type { ReactotronReactNative } from 'reactotron-react-native';

export type LogLevel = 'INFO' | 'LOG' | 'WARN' | 'ERROR';

export type Options = {
  appName?: string;
  firebaseLogLevels?: LogLevel[];
  isLocalLogEnable?: boolean;
  clientOptions?: ClientOptions;
  pluginCreators?: ((
    client: Reactotron<ReactotronReactNative> & ReactotronReactNative
  ) => any)[];
};
