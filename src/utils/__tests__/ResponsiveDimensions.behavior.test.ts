describe('ResponsiveDimensions (actual implementation)', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
    jest.unmock('../ResponsiveDimensions');
  });

  it('scales sizes based on current window dimensions', () => {
    const Dimensions = require('react-native').Dimensions;
    Dimensions.get = jest.fn().mockReturnValue({ width: 400, height: 800 });
    const ResponsiveDimensionsModule = require('../ResponsiveDimensions');
    const ResponsiveDimensions =
      ResponsiveDimensionsModule.default ??
      ResponsiveDimensionsModule.ResponsiveDimensions ??
      ResponsiveDimensionsModule;

    ResponsiveDimensions.setBaseDimensions({ width: 200, height: 400 });

    expect(ResponsiveDimensions.scale(100)).toBeCloseTo(200);
    expect(ResponsiveDimensions.verticalScale(100)).toBeCloseTo(200);
    expect(ResponsiveDimensions.moderateScale(100)).toBeCloseTo(150);
    expect(ResponsiveDimensions.moderateVerticalScale(100)).toBeCloseTo(150);
  });

  it('calculates percentage widths and heights with validation', () => {
    const Dimensions = require('react-native').Dimensions;
    Dimensions.get = jest.fn().mockReturnValue({ width: 360, height: 720 });
    const ResponsiveDimensionsModule = require('../ResponsiveDimensions');
    const ResponsiveDimensions =
      ResponsiveDimensionsModule.default ??
      ResponsiveDimensionsModule.ResponsiveDimensions ??
      ResponsiveDimensionsModule;

    ResponsiveDimensions.setBaseDimensions({ width: 350, height: 700 });

    expect(ResponsiveDimensions.percentWidth(50)).toBeCloseTo(180);
    expect(ResponsiveDimensions.percentHeight(25)).toBeCloseTo(180);
    expect(() => ResponsiveDimensions.percentWidth(-1)).toThrow(
      'percent must be positive numbers.'
    );
    expect(() => ResponsiveDimensions.percentHeight(101)).toThrow(
      'percent must be less than or equal to 100.'
    );
  });
});
