// External imports.
import reactotron from 'reactotron-react-native';

// Types imports.
import type { LogLevel, Options } from './LogConfig.types';

let firebaseLogLevels: LogLevel[] = [];
let isLocalLogEnable: boolean = false;

let originalInfo:
  | ((message?: any, ...optionalParams: any[]) => void)
  | undefined;

let originalLog:
  | ((message?: any, ...optionalParams: any[]) => void)
  | undefined;

let originalWarn:
  | ((message?: any, ...optionalParams: any[]) => void)
  | undefined;

let originalError:
  | ((message?: any, ...optionalParams: any[]) => void)
  | undefined;

const configureReactotron = (options?: Options): void => {
  const { appName, clientOptions, pluginCreators } = options ?? {};
  const { name, ...restClientOptions } = clientOptions ?? {};

  reactotron.configure({ name: name ?? appName, ...restClientOptions });

  pluginCreators?.forEach((pluginCreator) => reactotron.use(pluginCreator));
  reactotron.useReactNative().connect();

  // Clear log on start.
  reactotron.clear?.();
};

const info = (message?: any, ...optionalParams: any[]): void => {
  const tag = 'INFO';

  if (firebaseLogLevels.includes(tag)) {
    try {
      require('@react-native-firebase/app');

      const getCrashlytics =
        require('@react-native-firebase/crashlytics').getCrashlytics;

      const crashlyticsLog = require('@react-native-firebase/crashlytics').log;

      crashlyticsLog(
        getCrashlytics(),
        `## ${tag} ## Message: ${message} ## Data: ${JSON.stringify(optionalParams)}`
      );
    } catch (e) {}
  }

  if (isLocalLogEnable) {
    originalInfo?.(message, ...optionalParams);

    reactotron.display({
      name: tag,
      preview: typeof message === 'string' ? message : JSON.stringify(message),
      value: { message, optionalParams },
    });
  }
};

const log = (message?: any, ...optionalParams: any[]): void => {
  const tag = 'LOG';

  if (firebaseLogLevels.includes(tag)) {
    try {
      require('@react-native-firebase/app');

      const getCrashlytics =
        require('@react-native-firebase/crashlytics').getCrashlytics;

      const crashlyticsLog = require('@react-native-firebase/crashlytics').log;

      crashlyticsLog(
        getCrashlytics(),
        `## ${tag} ## Message: ${message} ## Data: ${JSON.stringify(optionalParams)}`
      );
    } catch (e) {}
  }

  if (isLocalLogEnable) {
    originalLog?.(message, ...optionalParams);

    reactotron.display({
      name: tag,
      preview: typeof message === 'string' ? message : JSON.stringify(message),
      value: { message, optionalParams },
    });
  }
};

const warn = (message?: any, ...optionalParams: any[]): void => {
  const tag = 'WARN';

  if (firebaseLogLevels.includes(tag)) {
    try {
      require('@react-native-firebase/app');

      const getCrashlytics =
        require('@react-native-firebase/crashlytics').getCrashlytics;

      const crashlyticsLog = require('@react-native-firebase/crashlytics').log;

      crashlyticsLog(
        getCrashlytics(),
        `## ${tag} ## Message: ${message} ## Data: ${JSON.stringify(optionalParams)}`
      );
    } catch (e) {}
  }

  if (isLocalLogEnable) {
    originalWarn?.(message, ...optionalParams);

    reactotron.display({
      name: tag,
      preview: typeof message === 'string' ? message : JSON.stringify(message),
      value: { message, optionalParams },
      important: true,
    });
  }
};

const error = (message?: any, ...optionalParams: any[]): void => {
  const tag = 'ERROR';

  if (firebaseLogLevels.includes(tag)) {
    try {
      require('@react-native-firebase/app');

      const getCrashlytics =
        require('@react-native-firebase/crashlytics').getCrashlytics;

      const crashlyticsRecordError =
        require('@react-native-firebase/crashlytics').recordError;

      crashlyticsRecordError(
        getCrashlytics(),
        new Error(
          `## ${tag} ## Message: ${message} ## Data: ${JSON.stringify(optionalParams)}`
        )
      );
    } catch (e) {}
  }

  if (isLocalLogEnable) {
    originalError?.(message, ...optionalParams);

    reactotron.display({
      name: tag,
      preview: typeof message === 'string' ? message : JSON.stringify(message),
      value: { message, optionalParams },
      important: true,
    });
  }
};

const connectConsoleToReactotron = (): void => {
  originalInfo = console.info;
  originalLog = console.log;
  originalWarn = console.warn;
  originalError = console.error;
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
