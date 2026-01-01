// Mock BackHandler globally
global.BackHandler = {
  addEventListener: jest.fn(() => ({
    remove: jest.fn(),
  })),
  removeEventListener: jest.fn(),
};

// Mock utils that call Dimensions.get() at module level
jest.mock('./src/utils/StatusBarHeight', () => ({
  __esModule: true,
  default: 20,
  statusBarHeight: 20,
  isIPhoneX: () => false,
  ifIPhoneX: (iphoneXHeight, regularHeight) => regularHeight,
}));

jest.mock('./src/utils/ResponsiveDimensions', () => ({
  __esModule: true,
  default: {
    ms: (size, factor) => size * (factor || 1),
    mvs: (size, factor) => size * (factor || 1),
    s: (size) => size,
    vs: (size) => size,
  },
}));

// Mock all .styles.ts files to return empty style objects
jest.mock('./src/components/IconButton/IconButton.styles', () => ({
  __esModule: true,
  default: {
    container: {},
    noPadding: {},
    icon: {},
  },
}));

jest.mock('./src/components/LoadingDialog/LoadingDialog.styles', () => ({
  __esModule: true,
  default: {
    dialog: {},
  },
}));

jest.mock('./src/components/Button/Button.styles', () => ({
  __esModule: true,
  default: {
    container: {},
    noPadding: {},
    button: {},
    ripple: {},
    buttonContent: {},
    icon: {},
    text: {},
  },
}));

jest.mock('./src/components/Dialog/Dialog.styles', () => ({
  __esModule: true,
  default: {
    overlay: {},
    safeArea: {},
    dialog: {},
  },
}));

jest.mock('./src/components/AlertDialog/AlertDialog.styles', () => ({
  __esModule: true,
  default: {
    dialog: {},
    actionsContainer: {},
    actionsContainerRow: {},
    actionsContainerColumn: {},
  },
}));

jest.mock('./src/components/TextInput/TextInput.styles', () => ({
  __esModule: true,
  default: {
    input: {},
    container: {},
    label: {},
    error: {},
  },
}));

jest.mock('./src/components/Accordion/Accordion.styles', () => ({
  __esModule: true,
  default: {
    headerRow: {},
    headerRipple: {},
    measuringContainer: {},
  },
}));

jest.mock('./src/components/CompoundButton/CompoundButton.styles', () => ({
  __esModule: true,
  default: {
    container: {},
    noPadding: {},
    button: {},
    ripple: {},
    buttonContent: {},
    icon: {},
    text: {},
  },
}));

jest.mock('./src/components/SelectDialog/SelectDialog.styles', () => ({
  __esModule: true,
  default: {
    dialog: {},
    searchBox: {},
    listContainer: {},
    itemContainer: {},
  },
}));

jest.mock('./src/components/FlatList/FlatList.styles', () => ({
  __esModule: true,
  default: {
    container: {},
    contentContainer: {},
  },
}));

jest.mock('./src/components/ImagePlaceholder/ImagePlaceholder.styles', () => ({
  __esModule: true,
  default: {
    container: {},
    image: {},
    placeholder: {},
  },
}));

// Mock PixelRatio for StyleSheet
jest.mock('react-native/Libraries/Utilities/PixelRatio', () => ({
  get: jest.fn(() => 2),
  getFontScale: jest.fn(() => 1),
  getPixelSizeForLayoutSize: jest.fn((layoutSize) => layoutSize * 2),
  roundToNearestPixel: jest.fn((layoutSize) => Math.round(layoutSize)),
}));

// Mock StyleSheet to avoid touching PixelRatio internals at require time
jest.mock('react-native/Libraries/StyleSheet/StyleSheetExports', () => {
  const flatten = (input) => {
    if (Array.isArray(input)) {
      return Object.assign({}, ...input.filter(Boolean));
    }
    return input || {};
  };

  return {
    hairlineWidth: 1,
    compose: (style1, style2) => ({ ...flatten(style1), ...flatten(style2) }),
    create: (styles) => styles,
    flatten,
  };
});

jest.mock('react-native/Libraries/StyleSheet/StyleSheet', () => {
  const exports = jest.requireMock(
    'react-native/Libraries/StyleSheet/StyleSheetExports'
  );

  return {
    ...exports,
    absoluteFill: {},
    absoluteFillObject: {},
    setStyleAttributePreprocessor: jest.fn(),
  };
});

// Dimensions API FIRST with fixed values
jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
  get: jest.fn(() => ({ width: 375, height: 812 })),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

// Mock Platform FIRST before anything else - must return actual values
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios',
  select: (obj) => {
    if (!obj) return undefined;
    if (obj.ios !== undefined) return obj.ios;
    if (obj.default !== undefined) return obj.default;
    if (obj.native !== undefined) return obj.native;
    return undefined;
  },
  Version: 14,
  isPad: false,
  isTV: false,
}));

// Mock react-native-paper early to prevent Platform issues
jest.mock('react-native-paper', () => {
  const React = require('react');
  const RN = require('react-native');

  const mockTheme = {
    colors: {
      primary: '#6200ee',
      surface: '#ffffff',
      background: '#f6f6f6',
      text: '#000000',
      onSurface: '#000000',
      placeholder: '#666666',
      disabled: '#999999',
      error: '#B00020',
    },
    isV3: true,
    roundness: 4,
    fonts: {
      bodyMedium: { fontSize: 14, lineHeight: 20 },
      bodySmall: { fontSize: 12, lineHeight: 16 },
      titleLarge: { fontSize: 22, lineHeight: 28 },
    },
  };

  const DialogTitle = ({ children, ...props }) =>
    React.createElement(RN.Text, props, children);
  const DialogContent = ({ children, ...props }) =>
    React.createElement(RN.View, props, children);
  const DialogActions = ({ children, ...props }) =>
    React.createElement(RN.View, props, children);

  const MockDialog = ({ children, ...props }) =>
    React.createElement(RN.View, props, children);

  MockDialog.Title = DialogTitle;
  MockDialog.Content = DialogContent;
  MockDialog.Actions = DialogActions;

  const MockTextInput = React.forwardRef((props, ref) => {
    const { onChangeText, value, ...otherProps } = props;
    return React.createElement(RN.TextInput, {
      ...otherProps,
      onChangeText,
      value,
      ref,
    });
  });

  return {
    withTheme: (Component) => {
      const ThemedComponent = React.forwardRef((props, ref) => {
        return React.createElement(Component, {
          ...props,
          theme: mockTheme,
          ref,
        });
      });
      ThemedComponent.displayName = `withTheme(${Component.displayName || Component.name || 'Component'})`;
      return ThemedComponent;
    },
    Text: (props) => React.createElement(RN.Text, props, props.children),
    TextInput: MockTextInput,
    ActivityIndicator: (props) =>
      React.createElement(RN.ActivityIndicator, props),
    TouchableRipple: ({ children, ...props }) => {
      return React.createElement(RN.TouchableOpacity, props, children);
    },
    Portal: ({ children }) =>
      React.createElement(React.Fragment, null, children),
    Modal: ({ children, visible }) =>
      visible ? React.createElement(React.Fragment, null, children) : null,
    Provider: ({ children }) =>
      React.createElement(React.Fragment, null, children),
    Dialog: MockDialog,
  };
});

// Mock NativeModules - defer StyleSheet patching to afterEnv
jest.mock('react-native', () => {
  const React = require('react');
  const RN = jest.requireActual('react-native/jest/mock');
  const StyleSheet = jest.requireMock(
    'react-native/Libraries/StyleSheet/StyleSheet'
  );
  StyleSheet.compose = (style1, style2) => [style1, style2];
  StyleSheet.create = (styles) => styles;
  const Platform = jest.requireMock(
    'react-native/Libraries/Utilities/Platform'
  );
  const PixelRatio = jest.requireMock(
    'react-native/Libraries/Utilities/PixelRatio'
  );
  const Dimensions = jest.requireMock(
    'react-native/Libraries/Utilities/Dimensions'
  );

  const createComponent = (name) =>
    React.forwardRef((props, ref) =>
      React.createElement(name, { ...props, ref }, props.children)
    );

  const flatListMock = jest.fn((props) =>
    React.createElement('FlatList', props, props.children)
  );

  const refreshControlMock = jest.fn((props) =>
    React.createElement('RefreshControl', props, props.children)
  );

  const I18nManager = {
    isRTL: false,
    allowRTL: jest.fn(),
    forceRTL: jest.fn(),
    doLeftAndRightSwapInRTL: false,
    swapLeftAndRightInRTL: jest.fn(),
    getConstants: jest.fn(() => ({
      isRTL: false,
      doLeftAndRightSwapInRTL: false,
      localeIdentifier: 'en-US',
    })),
  };

  return {
    ...RN,
    NativeModules: {
      ...RN.NativeModules,
      ReactNativeCommonComponents: {
        multiply: jest.fn((a, b) => Promise.resolve(a * b)),
      },
    },
    StyleSheet,
    Platform,
    PixelRatio,
    Dimensions,
    I18nManager,
    View: createComponent('View'),
    Text: createComponent('Text'),
    TouchableOpacity: createComponent('TouchableOpacity'),
    TouchableWithoutFeedback: createComponent('TouchableWithoutFeedback'),
    FlatList: flatListMock,
    RefreshControl: refreshControlMock,
    __mock: {
      flatListMock,
      refreshControlMock,
    },
  };
});

// Mock react-native-reanimated (optional dependency)
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // Mock additional functions if needed
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Mock react-native-keyboard-controller (optional dependency)
jest.mock('react-native-keyboard-controller', () => ({
  KeyboardAwareScrollView: jest.fn(({ children }) => children),
  KeyboardStickyView: jest.fn(({ children }) => children),
  KeyboardProvider: jest.fn(({ children }) => children),
  useKeyboardAnimation: jest.fn(() => ({
    height: { value: 0 },
    progress: { value: 0 },
  })),
}));

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: jest.fn(({ children }) => children),
  SafeAreaView: jest.fn(({ children }) => children),
  useSafeAreaInsets: jest.fn(() => ({
    top: 44,
    bottom: 34,
    left: 0,
    right: 0,
  })),
}));

// Mock react-native-vector-image (optional dependency)
jest.mock('react-native-vector-image', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: React.forwardRef((props, ref) => {
      return React.createElement('VectorImage', { ...props, ref });
    }),
  };
});

// Mock @react-native-vector-icons/material-design-icons
jest.mock('@react-native-vector-icons/material-design-icons', () => {
  const React = require('react');
  return {
    __esModule: true,
    MaterialDesignIcons: (props) => {
      return React.createElement('MaterialDesignIcons', props);
    },
  };
});

// Mock @d11/react-native-fast-image (optional dependency)
jest.mock('@d11/react-native-fast-image', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: React.forwardRef((props, ref) => {
      return React.createElement('Image', { ...props, ref });
    }),
    FastImage: React.forwardRef((props, ref) => {
      return React.createElement('Image', { ...props, ref });
    }),
  };
});

// Mock Reactotron (optional dependency)
jest.mock('reactotron-react-native', () => {
  const mockReactotron = {
    configure: jest.fn(function () {
      return this;
    }),
    useReactNative: jest.fn(function () {
      return this;
    }),
    connect: jest.fn(function () {
      return this;
    }),
    use: jest.fn(function () {
      return this;
    }),
    clear: jest.fn(),
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    display: jest.fn(),
  };

  return {
    __esModule: true,
    default: mockReactotron,
  };
});

// Mock @react-native-firebase/crashlytics (optional dependency)
jest.mock('@react-native-firebase/crashlytics', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    log: jest.fn(),
    recordError: jest.fn(),
    setAttributes: jest.fn(),
  })),
}));

// Mock tinycolor2
jest.mock('tinycolor2', () => {
  return jest.fn((color) => ({
    toRgbString: () => color,
    setAlpha: jest.fn(() => ({
      toRgbString: () => color,
      toHex8String: () => color,
    })),
    isDark: () => false,
    isLight: () => true,
    toHex8String: () => color,
  }));
});

// Don't mock react-native-paper - let it work naturally with the Provider in tests
// The withTheme HOC will work correctly when wrapped with PaperProvider

// Mock the wrappers module to use test-friendly implementations
jest.mock('./src/components/wrappers');

// Mock BackHandler for Dialog tests
jest.mock('react-native/Libraries/Utilities/BackHandler', () => ({
  addEventListener: jest.fn(() => ({
    remove: jest.fn(),
  })),
  removeEventListener: jest.fn(),
}));

// Silence console warnings in tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};
