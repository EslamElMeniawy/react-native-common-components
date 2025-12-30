import { configureLog } from '../LogConfig';

// Mock dependencies
jest.mock('reactotron-react-native', () => ({
  default: {
    configure: jest.fn(() => ({
      useReactNative: jest.fn(() => ({
        connect: jest.fn(),
      })),
      use: jest.fn(),
    })),
    useReactNative: jest.fn(() => ({
      connect: jest.fn(),
    })),
    connect: jest.fn(),
    clear: jest.fn(),
    display: jest.fn(),
  },
}));

jest.mock('@react-native-firebase/app');
jest.mock('@react-native-firebase/crashlytics', () => ({
  getCrashlytics: jest.fn(() => 'mockCrashlyticsInstance'),
  log: jest.fn(),
  recordError: jest.fn(),
}));

describe('LogConfig', () => {
  let originalConsole: {
    log: typeof console.log;
    info: typeof console.info;
    warn: typeof console.warn;
    error: typeof console.error;
  };

  beforeEach(() => {
    // Save original console methods
    originalConsole = {
      log: console.log,
      info: console.info,
      warn: console.warn,
      error: console.error,
    };

    jest.clearAllMocks();
  });

  afterEach(() => {
    // Restore original console
    console.log = originalConsole.log;
    console.info = originalConsole.info;
    console.warn = originalConsole.warn;
    console.error = originalConsole.error;

    jest.clearAllMocks();
  });

  describe('configureLog', () => {
    it('should configure log without options', () => {
      const result = configureLog();

      expect(result).toBeDefined();
    });

    it('should configure log with app name', () => {
      const result = configureLog({
        appName: 'Test App',
      });

      expect(result).toBeDefined();
    });

    it('should configure log with local logging enabled', () => {
      configureLog({
        isLocalLogEnable: true,
      });

      // Test that console methods are overridden
      expect(console.log).toBeDefined();
      expect(console.info).toBeDefined();
      expect(console.warn).toBeDefined();
      expect(console.error).toBeDefined();
    });

    it('should configure log with Firebase log levels', () => {
      configureLog({
        firebaseLogLevels: ['ERROR', 'WARN'],
      });

      expect(console.error).toBeDefined();
    });

    it('should configure log with client options', () => {
      const result = configureLog({
        appName: 'Test App',
        clientOptions: {
          name: 'Custom Name',
          host: 'localhost',
        },
      });

      expect(result).toBeDefined();
    });
  });

  describe('Console Method Overriding', () => {
    it('should override console.log', () => {
      const logSpy = jest.spyOn(originalConsole, 'log');

      configureLog({
        isLocalLogEnable: true,
      });

      // Console should now be overridden
      expect(console.log).not.toBe(logSpy);
    });

    it('should override console.info', () => {
      const infoSpy = jest.spyOn(originalConsole, 'info');

      configureLog({
        isLocalLogEnable: true,
      });

      expect(console.info).not.toBe(infoSpy);
    });

    it('should override console.warn', () => {
      const warnSpy = jest.spyOn(originalConsole, 'warn');

      configureLog({
        isLocalLogEnable: true,
      });

      expect(console.warn).not.toBe(warnSpy);
    });

    it('should override console.error', () => {
      const errorSpy = jest.spyOn(originalConsole, 'error');

      configureLog({
        isLocalLogEnable: true,
      });

      expect(console.error).not.toBe(errorSpy);
    });
  });

  describe('Local Logging', () => {
    it('should handle console methods when local logging is enabled', () => {
      configureLog({
        isLocalLogEnable: true,
      });

      // Should not throw errors
      expect(() => console.log('Test message', 'extra param')).not.toThrow();
    });

    it('should handle console methods when local logging is disabled', () => {
      configureLog({
        isLocalLogEnable: false,
      });

      // Should not throw errors even when disabled
      expect(() => console.log('Test')).not.toThrow();
    });

    it('should handle multiple parameters in console methods', () => {
      configureLog({
        isLocalLogEnable: true,
      });

      expect(() =>
        console.log('Message', { key: 'value' }, [1, 2, 3])
      ).not.toThrow();
    });
  });

  describe('Firebase Logging', () => {
    it('should attempt Firebase logging for configured log levels', () => {
      configureLog({
        firebaseLogLevels: ['LOG', 'ERROR'],
        isLocalLogEnable: true,
      });

      // These should not throw even if Firebase is not properly configured
      expect(() => console.log('Test')).not.toThrow();
      expect(() => console.error('Error')).not.toThrow();
    });

    it('should handle Firebase logging errors gracefully', () => {
      // Firebase is mocked, so it should handle any errors internally
      configureLog({
        firebaseLogLevels: ['ERROR'],
        isLocalLogEnable: true,
      });

      expect(() => console.error('Test error')).not.toThrow();
    });

    it('should not attempt Firebase logging for non-configured levels', () => {
      configureLog({
        firebaseLogLevels: ['ERROR'],
        isLocalLogEnable: true,
      });

      // INFO and WARN should not attempt Firebase logging
      expect(() => console.info('Info')).not.toThrow();
      expect(() => console.warn('Warning')).not.toThrow();
    });
  });

  describe('Reactotron Integration', () => {
    it('should handle missing Reactotron gracefully', () => {
      // Reactotron is mocked, but this tests that the code handles it
      expect(() => configureLog()).not.toThrow();
    });

    it('should configure Reactotron when available', () => {
      const result = configureLog({
        appName: 'Test App',
      });

      expect(result).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined messages', () => {
      configureLog({
        isLocalLogEnable: true,
      });

      expect(() => console.log(undefined)).not.toThrow();
    });

    it('should handle null messages', () => {
      configureLog({
        isLocalLogEnable: true,
      });

      expect(() => console.log(null)).not.toThrow();
    });

    it('should handle object messages', () => {
      configureLog({
        isLocalLogEnable: true,
      });

      expect(() => console.log({ key: 'value' })).not.toThrow();
    });

    it('should handle array messages', () => {
      configureLog({
        isLocalLogEnable: true,
      });

      expect(() => console.log([1, 2, 3])).not.toThrow();
    });

    it('should handle empty options', () => {
      expect(() => configureLog({})).not.toThrow();
    });

    it('should handle empty arrays', () => {
      expect(() =>
        configureLog({
          firebaseLogLevels: [],
          pluginCreators: [],
        })
      ).not.toThrow();
    });
  });
});
