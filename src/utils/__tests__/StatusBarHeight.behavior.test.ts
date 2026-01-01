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

  it('detects iPhone X and returns matching height', () => {
    const Platform = require('react-native').Platform;
    const Dimensions = require('react-native').Dimensions;

    Platform.OS = 'ios';
    Platform.isPad = false;
    Platform.isTV = false;
    Dimensions.get = jest.fn().mockReturnValue({ width: 375, height: 812 });

    const StatusBarModule = require('../StatusBarHeight');
    const isIPhoneX =
      StatusBarModule.isIPhoneX ?? StatusBarModule.default?.isIPhoneX;
    const getStatusBarHeight =
      StatusBarModule.getStatusBarHeight ??
      StatusBarModule.default?.getStatusBarHeight;

    expect(isIPhoneX()).toBe(true);
    expect(getStatusBarHeight()).toBe(44);
  });

  it('detects iPhone XS Max and returns matching height', () => {
    const Platform = require('react-native').Platform;
    const Dimensions = require('react-native').Dimensions;

    Platform.OS = 'ios';
    Platform.isPad = false;
    Platform.isTV = false;
    Dimensions.get = jest.fn().mockReturnValue({ width: 414, height: 896 });

    const StatusBarModule = require('../StatusBarHeight');
    const isIPhoneXMax =
      StatusBarModule.isIPhoneXMax ?? StatusBarModule.default?.isIPhoneXMax;
    const getStatusBarHeight =
      StatusBarModule.getStatusBarHeight ??
      StatusBarModule.default?.getStatusBarHeight;

    expect(isIPhoneXMax()).toBe(true);
    expect(getStatusBarHeight()).toBe(44);
  });

  it('detects iPhone 12 and returns matching height', () => {
    const Platform = require('react-native').Platform;
    const Dimensions = require('react-native').Dimensions;

    Platform.OS = 'ios';
    Platform.isPad = false;
    Platform.isTV = false;
    Dimensions.get = jest.fn().mockReturnValue({ width: 390, height: 844 });

    const StatusBarModule = require('../StatusBarHeight');
    const isIPhone12 =
      StatusBarModule.isIPhone12 ?? StatusBarModule.default?.isIPhone12;
    const getStatusBarHeight =
      StatusBarModule.getStatusBarHeight ??
      StatusBarModule.default?.getStatusBarHeight;

    expect(isIPhone12()).toBe(true);
    expect(getStatusBarHeight()).toBe(47);
  });

  it('detects iPhone 12 Max and returns matching height', () => {
    const Platform = require('react-native').Platform;
    const Dimensions = require('react-native').Dimensions;

    Platform.OS = 'ios';
    Platform.isPad = false;
    Platform.isTV = false;
    Dimensions.get = jest.fn().mockReturnValue({ width: 428, height: 926 });

    const StatusBarModule = require('../StatusBarHeight');
    const isIPhone12Max =
      StatusBarModule.isIPhone12Max ?? StatusBarModule.default?.isIPhone12Max;
    const getStatusBarHeight =
      StatusBarModule.getStatusBarHeight ??
      StatusBarModule.default?.getStatusBarHeight;

    expect(isIPhone12Max()).toBe(true);
    expect(getStatusBarHeight()).toBe(47);
  });

  it('detects iPhone 14 Max and returns matching height', () => {
    const Platform = require('react-native').Platform;
    const Dimensions = require('react-native').Dimensions;

    Platform.OS = 'ios';
    Platform.isPad = false;
    Platform.isTV = false;
    Dimensions.get = jest.fn().mockReturnValue({ width: 430, height: 932 });

    const StatusBarModule = require('../StatusBarHeight');
    const isIPhone14Max =
      StatusBarModule.isIPhone14Max ?? StatusBarModule.default?.isIPhone14Max;
    const getStatusBarHeight =
      StatusBarModule.getStatusBarHeight ??
      StatusBarModule.default?.getStatusBarHeight;

    expect(isIPhone14Max()).toBe(true);
    expect(getStatusBarHeight()).toBe(59);
  });

  it('detects iPhone 16 Max and returns matching height', () => {
    const Platform = require('react-native').Platform;
    const Dimensions = require('react-native').Dimensions;

    Platform.OS = 'ios';
    Platform.isPad = false;
    Platform.isTV = false;
    Dimensions.get = jest.fn().mockReturnValue({ width: 440, height: 956 });

    const StatusBarModule = require('../StatusBarHeight');
    const isIPhone16Max =
      StatusBarModule.isIPhone16Max ?? StatusBarModule.default?.isIPhone16Max;
    const getStatusBarHeight =
      StatusBarModule.getStatusBarHeight ??
      StatusBarModule.default?.getStatusBarHeight;

    expect(isIPhone16Max()).toBe(true);
    expect(getStatusBarHeight()).toBe(62);
  });
});
