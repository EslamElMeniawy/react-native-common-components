// Base jest mock from RN
const React = require('react');
const RN = jest.requireActual('react-native/jest/mock');

const createComponent = (name) =>
  React.forwardRef((props, ref) =>
    React.createElement(name, { ...props, ref }, props.children)
  );

const StyleSheet = {
  create: (styles) => styles,
  flatten: (style) => {
    if (Array.isArray(style)) {
      return Object.assign({}, ...style.filter(Boolean));
    }
    return style || {};
  },
  compose: (style1, style2) => [style1, style2],
  absoluteFill: {},
  absoluteFillObject: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  hairlineWidth: 1,
};

const Platform = {
  OS: 'ios',
  select: (obj) => {
    if (!obj) return undefined;
    if (obj.ios !== undefined) return obj.ios;
    if (obj.native !== undefined) return obj.native;
    if (obj.default !== undefined) return obj.default;
    return undefined;
  },
  Version: 14,
  isPad: false,
  isTV: false,
};

const PixelRatio = {
  get: () => 2,
  getFontScale: () => 1,
  getPixelSizeForLayoutSize: (layoutSize) => layoutSize * 2,
  roundToNearestPixel: (layoutSize) => Math.round(layoutSize),
};

const Dimensions = {
  get: () => ({ width: 375, height: 812 }),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};

const Animated = {
  createAnimatedComponent: (Component) => Component,
  Value: jest.fn(() => ({ setValue: jest.fn() })),
  timing: jest.fn(() => ({ start: jest.fn() })),
  Easing: {
    bezier: jest.fn(() => jest.fn()),
  },
};

const Easing = {
  bezier: jest.fn(() => jest.fn()),
};

const I18nManager = {
  isRTL: false,
  allowRTL: jest.fn(),
  forceRTL: jest.fn(),
  doLeftAndRightSwapInRTL: false,
  swapLeftAndRightInRTL: jest.fn(),
  getConstants: () => ({
    isRTL: false,
    doLeftAndRightSwapInRTL: false,
  }),
};

const flatListMock = jest.fn((props) =>
  React.createElement('FlatList', props, props.children)
);
const refreshControlMock = jest.fn((props) =>
  React.createElement('RefreshControl', props, props.children)
);

module.exports = {
  ...RN,
  StyleSheet,
  Platform,
  PixelRatio,
  Dimensions,
  Animated,
  Easing,
  I18nManager,
  View: createComponent('View'),
  Text: createComponent('Text'),
  Pressable: createComponent('Pressable'),
  TouchableOpacity: createComponent('TouchableOpacity'),
  TouchableWithoutFeedback: createComponent('TouchableWithoutFeedback'),
  FlatList: flatListMock,
  RefreshControl: refreshControlMock,
  NativeModules: {
    ...RN.NativeModules,
    ReactNativeCommonComponents: {
      multiply: jest.fn((a, b) => Promise.resolve(a * b)),
    },
    RNCSafeAreaContext: {
      getConstants: () => ({ initialWindowMetrics: null }),
    },
  },
  __mock: {
    flatListMock,
    refreshControlMock,
  },
};
