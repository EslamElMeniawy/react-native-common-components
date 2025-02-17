import { Dimensions } from 'react-native';

class ResponsiveDimension {
  private static _baseWidth = 350;
  private static _baseHeight = 680;

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

  static scale(size: number) {
    return (this.windowWidth / this._baseWidth) * size;
  }

  static verticalScale(size: number) {
    return (this.windowHeight / this._baseHeight) * size;
  }

  static moderateScale(size: number, factor: number = 0.5) {
    return size + (this.scale(size) - size) * factor;
  }

  static moderateVerticalScale(size: number, factor: number = 0.5) {
    return size + (this.verticalScale(size) - size) * factor;
  }

  static readonly s = this.scale;

  static readonly vs = this.verticalScale;

  static readonly ms = this.moderateScale;

  static readonly mvs = this.moderateVerticalScale;
}

export default ResponsiveDimension;
