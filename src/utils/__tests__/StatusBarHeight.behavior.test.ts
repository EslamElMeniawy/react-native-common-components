describe('StatusBarHeight (actual implementation)', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
    jest.unmock('../StatusBarHeight');
  });

  it('detects monobrow devices and returns matching height', () => {
    const Platform = require('react-native').Platform;
    const Dimensions = require('react-native').Dimensions;

    Platform.OS = 'ios';
    Platform.isPad = false;
    Platform.isTV = false;
    Dimensions.get = jest.fn().mockReturnValue({ width: 393, height: 852 });

    const StatusBarModule = require('../StatusBarHeight');
    const getStatusBarHeight =
      StatusBarModule.getStatusBarHeight ??
      StatusBarModule.default?.getStatusBarHeight;
    const isIPhone14Pro =
      StatusBarModule.isIPhone14Pro ?? StatusBarModule.default?.isIPhone14Pro;
    const isIPhoneWithMonobrow =
      StatusBarModule.isIPhoneWithMonobrow ??
      StatusBarModule.default?.isIPhoneWithMonobrow;

    expect(isIPhone14Pro()).toBe(true);
    expect(isIPhoneWithMonobrow()).toBe(true);
    expect(getStatusBarHeight()).toBe(59);
  });

  it('uses android status bar height unless skipped', () => {
    const ReactNative = require('react-native');
    const Platform = ReactNative.Platform;
    const Dimensions = ReactNative.Dimensions;
    const StatusBar = (ReactNative.StatusBar = ReactNative.StatusBar ?? {
      currentHeight: undefined,
    });

    Platform.OS = 'android';
    Platform.isPad = false;
    Platform.isTV = false;
    Dimensions.get = jest.fn().mockReturnValue({ width: 400, height: 800 });
    StatusBar.currentHeight = 24;

    const StatusBarModule = require('../StatusBarHeight');
    const getStatusBarHeight =
      StatusBarModule.getStatusBarHeight ??
      StatusBarModule.default?.getStatusBarHeight;
    const isIPhoneWithMonobrow =
      StatusBarModule.isIPhoneWithMonobrow ??
      StatusBarModule.default?.isIPhoneWithMonobrow;

    expect(isIPhoneWithMonobrow()).toBe(false);
    expect(getStatusBarHeight()).toBe(24);
    expect(getStatusBarHeight(true)).toBe(0);
  });
});
