describe('ResponsiveDimensions - Edge Cases', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
    jest.unmock('../ResponsiveDimensions');
  });

  it('should use fallback when Dimensions.get is not a function', () => {
    const Dimensions = require('react-native').Dimensions;
    Dimensions.get = undefined;

    const ResponsiveDimensionsModule = require('../ResponsiveDimensions');
    const ResponsiveDimensions =
      ResponsiveDimensionsModule.default ??
      ResponsiveDimensionsModule.ResponsiveDimensions ??
      ResponsiveDimensionsModule;

    expect(ResponsiveDimensions.windowWidth).toBe(350);
    expect(ResponsiveDimensions.windowHeight).toBe(680);
  });

  it('should use short method aliases', () => {
    const Dimensions = require('react-native').Dimensions;
    Dimensions.get = jest.fn().mockReturnValue({ width: 400, height: 800 });

    const ResponsiveDimensionsModule = require('../ResponsiveDimensions');
    const ResponsiveDimensions =
      ResponsiveDimensionsModule.default ??
      ResponsiveDimensionsModule.ResponsiveDimensions ??
      ResponsiveDimensionsModule;

    ResponsiveDimensions.setBaseDimensions({ width: 200, height: 400 });

    expect(ResponsiveDimensions.s(100)).toBeCloseTo(200);
    expect(ResponsiveDimensions.vs(100)).toBeCloseTo(200);
    expect(ResponsiveDimensions.ms(100)).toBeCloseTo(150);
    expect(ResponsiveDimensions.mvs(100)).toBeCloseTo(150);
    expect(ResponsiveDimensions.pw(50)).toBeCloseTo(200);
    expect(ResponsiveDimensions.ph(50)).toBeCloseTo(400);
  });

  it('should handle custom factor in moderate scaling', () => {
    const Dimensions = require('react-native').Dimensions;
    Dimensions.get = jest.fn().mockReturnValue({ width: 400, height: 800 });

    const ResponsiveDimensionsModule = require('../ResponsiveDimensions');
    const ResponsiveDimensions =
      ResponsiveDimensionsModule.default ??
      ResponsiveDimensionsModule.ResponsiveDimensions ??
      ResponsiveDimensionsModule;

    ResponsiveDimensions.setBaseDimensions({ width: 200, height: 400 });

    expect(ResponsiveDimensions.moderateScale(100, 0.25)).toBeCloseTo(125);
    expect(ResponsiveDimensions.moderateScale(100, 0.75)).toBeCloseTo(175);
    expect(ResponsiveDimensions.moderateVerticalScale(100, 0.25)).toBeCloseTo(
      125
    );
    expect(ResponsiveDimensions.moderateVerticalScale(100, 0.75)).toBeCloseTo(
      175
    );
  });

  it('should handle zero and boundary percent values', () => {
    const Dimensions = require('react-native').Dimensions;
    Dimensions.get = jest.fn().mockReturnValue({ width: 360, height: 720 });

    const ResponsiveDimensionsModule = require('../ResponsiveDimensions');
    const ResponsiveDimensions =
      ResponsiveDimensionsModule.default ??
      ResponsiveDimensionsModule.ResponsiveDimensions ??
      ResponsiveDimensionsModule;

    expect(ResponsiveDimensions.percentWidth(0)).toBe(0);
    expect(ResponsiveDimensions.percentWidth(100)).toBeCloseTo(360);
    expect(ResponsiveDimensions.percentHeight(0)).toBe(0);
    expect(ResponsiveDimensions.percentHeight(100)).toBeCloseTo(720);
  });

  it('should only update provided base dimensions', () => {
    const Dimensions = require('react-native').Dimensions;
    Dimensions.get = jest.fn().mockReturnValue({ width: 400, height: 800 });

    const ResponsiveDimensionsModule = require('../ResponsiveDimensions');
    const ResponsiveDimensions =
      ResponsiveDimensionsModule.default ??
      ResponsiveDimensionsModule.ResponsiveDimensions ??
      ResponsiveDimensionsModule;

    ResponsiveDimensions.setBaseDimensions({ width: 300 });
    expect(ResponsiveDimensions.scale(100)).toBeCloseTo(133.33, 1);

    ResponsiveDimensions.setBaseDimensions({ height: 600 });
    expect(ResponsiveDimensions.verticalScale(100)).toBeCloseTo(133.33, 1);
  });
});
