import { Dimensions } from 'react-native';

class ResponsiveDimension {
  private static _baseWidth = 350;
  private static _baseHeight = 680;

  /**
   * Sets the base dimensions for the responsive layout.
   * This is the screen size on which the design is based.
   *
   * @param width - The base width to be set.
   * @param height - The base height to be set.
   */
  static setBaseDimensions(width: number, height: number) {
    this._baseWidth = width;
    this._baseHeight = height;
  }

  static get windowWidth() {
    return Dimensions.get('window').width;
  }

  static get windowHeight() {
    return Dimensions.get('window').height;
  }

  /**
   * Scales a given size based on the current window width relative to a predefined base width.
   *
   * @param size - The size to be scaled.
   * @returns The scaled size adjusted for the current window width.
   */
  static scale(size: number) {
    return (this.windowWidth / this._baseWidth) * size;
  }

  /**
   * Scales a given size based on the current window height relative to a predefined base height.
   *
   * @param size - The size to be scaled.
   * @returns The scaled size adjusted for the current window height.
   */
  static verticalScale(size: number) {
    return (this.windowHeight / this._baseHeight) * size;
  }

  /**
   * Applies a moderate scaling to a given size, blending the original size
   * with a scaled size based on the current window width. The blend is
   * controlled by a factor, allowing for fine-tuning of the scaling effect.
   *
   * @param size - The original size to be scaled.
   * @param factor - The factor to adjust the scaling effect, defaulting to 0.5.
   * @returns The moderately scaled size.
   */
  static moderateScale(size: number, factor: number = 0.5) {
    return size + (this.scale(size) - size) * factor;
  }

  /**
   * Applies a moderate scaling to a given size, blending the original size
   * with a scaled size based on the current window height. The blend is
   * controlled by a factor, allowing for fine-tuning of the scaling effect.
   *
   * @param size - The original size to be scaled.
   * @param factor - The factor to adjust the scaling effect, defaulting to 0.5.
   * @returns The moderately scaled size.
   */
  static moderateVerticalScale(size: number, factor: number = 0.5) {
    return size + (this.verticalScale(size) - size) * factor;
  }

  static readonly s = this.scale;

  static readonly vs = this.verticalScale;

  static readonly ms = this.moderateScale;

  static readonly mvs = this.moderateVerticalScale;

  /**
   * Calculates the width as a percentage of the current window width.
   *
   * @param percent - The percentage of the window width to calculate. Must be between 0 and 100.
   * @returns The calculated width in pixels.
   * @throws Error if the percent is less than 0 or greater than 100.
   */
  static percentWidth(percent: number) {
    if (percent < 0) {
      throw new Error('percent must be positive numbers.');
    }

    if (percent > 100) {
      throw new Error('percent must be less than or equal to 100.');
    }

    return (this.windowWidth * percent) / 100;
  }

  /**
   * Calculates the height as a percentage of the current window height.
   *
   * @param percent - The percentage of the window height to calculate. Must be between 0 and 100.
   * @returns The calculated height in pixels.
   * @throws Error if the percent is less than 0 or greater than 100.
   */
  static percentHeight(percent: number) {
    if (percent < 0) {
      throw new Error('percent must be positive numbers.');
    }

    if (percent > 100) {
      throw new Error('percent must be less than or equal to 100.');
    }

    return (this.windowHeight * percent) / 100;
  }
}

export default ResponsiveDimension;
