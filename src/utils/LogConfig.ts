// External imports.
import reactotron from 'reactotron-react-native';
import { NativeModules } from 'react-native';

// Types imports.
import type { LogLevel, Options } from './LogConfig.types';

let firebaseLogLevels: LogLevel[] = [];
let isLocalLogEnable: boolean = false;

const configureReactotron = (options?: Options): void => {
  const { appName, clientOptions, pluginCreators } = options ?? {};
  const { name, host, ...restClientOptions } = clientOptions ?? {};
  const { scriptURL } = NativeModules.SourceCode;
  const scriptHostname = scriptURL.split('://')[1].split(':')[0];

  reactotron.configure({
    name: name ?? appName,
    host: host ?? scriptHostname,
    ...restClientOptions,
  });

  pluginCreators?.forEach((pluginCreator) => reactotron.use(pluginCreator));
  reactotron.useReactNative().connect();

  // Clear log on start.
  reactotron.clear?.();
};

const info = (message: string, ...args: any[]): void => {
  const tag = 'INFO';

  if (firebaseLogLevels.includes(tag)) {
    try {
      require('@react-native-firebase/app');
      const crashlytics = require('@react-native-firebase/crashlytics').default;

      crashlytics().log(
        `## ${tag} ## Message: ${message} ## Data: ${JSON.stringify(args)}`
      );
    } catch (e) {}
  }

  if (isLocalLogEnable) {
    reactotron.display({
      name: tag,
      preview: message,
      value: { message, args },
    });
  }
};

const log = (message: string, ...args: any[]): void => {
  const tag = 'LOG';

  if (firebaseLogLevels.includes(tag)) {
    try {
      require('@react-native-firebase/app');
      const crashlytics = require('@react-native-firebase/crashlytics').default;

      crashlytics().log(
        `## ${tag} ## Message: ${message} ## Data: ${JSON.stringify(args)}`
      );
    } catch (e) {}
  }

  if (isLocalLogEnable) {
    reactotron.display({
      name: tag,
      preview: message,
      value: { message, args },
    });
  }
};

const warn = (message: string, ...args: any[]): void => {
  const tag = 'WARN';

  if (firebaseLogLevels.includes(tag)) {
    try {
      require('@react-native-firebase/app');
      const crashlytics = require('@react-native-firebase/crashlytics').default;

      crashlytics().log(
        `## ${tag} ## Message: ${message} ## Data: ${JSON.stringify(args)}`
      );
    } catch (e) {}
  }

  if (isLocalLogEnable) {
    reactotron.display({
      name: tag,
      preview: message,
      value: { message, args },
      important: true,
    });
  }
};

const error = (message: string, ...args: any[]): void => {
  const tag = 'ERROR';

  if (firebaseLogLevels.includes(tag)) {
    try {
      require('@react-native-firebase/app');
      const crashlytics = require('@react-native-firebase/crashlytics').default;

      crashlytics().recordError(
        new Error(
          `## ${tag} ## Message: ${message} ## Data: ${JSON.stringify(args)}`
        )
      );
    } catch (e) {}
  }

  if (isLocalLogEnable) {
    reactotron.display({
      name: tag,
      preview: message,
      value: { message, args },
      important: true,
    });
  }
};

const connectConsoleToReactotron = (): void => {
  console.info = info;
  console.log = log;
  console.warn = warn;
  console.error = error;
};

export const configureLog = !reactotron
  ? undefined
  : (options?: Options) => {
      firebaseLogLevels = options?.firebaseLogLevels ?? [];
      isLocalLogEnable = options?.isLocalLogEnable ?? false;
      configureReactotron(options);
      connectConsoleToReactotron();
      return reactotron;
    };
