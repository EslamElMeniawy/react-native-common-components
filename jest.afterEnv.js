/**
 * Setup file that runs AFTER test environment is created and modules are loading
 * Patches critical modules to ensure tests work
 */

// Force load and patch PixelRatio early
const Module = require('module');
const originalRequire = Module.prototype.require;

Module.prototype.require = function (id) {
  const module = originalRequire.apply(this, arguments);

  // Patch PixelRatio when it's loaded
  if (
    id === 'react-native/Libraries/Utilities/PixelRatio' ||
    id.includes('PixelRatio')
  ) {
    if (module && !module.roundToNearestPixel) {
      module.roundToNearestPixel = (layoutSize) => Math.round(layoutSize);
    }
    if (module && !module.get) {
      module.get = () => 2;
    }
    if (module && !module.getFontScale) {
      module.getFontScale = () => 1;
    }
  }

  return module;
};

// Also patch via react-native directly
try {
  const RN = require('react-native');
  if (RN && RN.StyleSheet && !RN.StyleSheet.flatten) {
    RN.StyleSheet.flatten = (style) => {
      if (Array.isArray(style)) {
        return Object.assign({}, ...style.filter(Boolean));
      }
      return style || {};
    };
  }
} catch {
  // ignore
}
