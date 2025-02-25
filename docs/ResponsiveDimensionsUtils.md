# Responsive Dimensions Utils

Some helpers for adding responsiveness to dimensions.

## Usage

```js
import React, { useEffect } from 'react';
import { View } from 'react-native';
import {
  Text,
  ResponsiveDimensions,
} from '@eslam-elmeniawy/react-native-common-components';

const MyComponent = () => {
  useEffect(() => {
    ResponsiveDimensions.setBaseDimensions({ width: 375, height: 812 });
  }, []);

  return (
    <View>
      <Text>{`scale(24): ${ResponsiveDimensions.scale(24)}`}</Text>
      <Text>{`verticalScale(24): ${ResponsiveDimensions.verticalScale(24)}`}</Text>
      <Text>{`moderateScale(24): ${ResponsiveDimensions.moderateScale(24)}`}</Text>
      <Text>
        {`moderateVerticalScale(24): ${ResponsiveDimensions.moderateVerticalScale(24)}`}
      </Text>
      <Text>{`percentWidth(50): ${ResponsiveDimensions.percentWidth(50)}`}</Text>
      <Text>{`percentHeight(50): ${ResponsiveDimensions.percentHeight(50)}`}</Text>
    </View>
  );
};
```

## Content

### ResponsiveDimensions.setBaseDimensions

Type: `(baseDimensions: BaseDimensions) => void`

If `baseDimensions` not passed a default value is used equivalent to `{width: 350, height: 680}`.
This is the screen size on which the design is based.

Call this method on main application (`App.ts`) to set the base dimensions for scaling calculations.

### ResponsiveDimensions.scale

Type: `(size: number) => boolean`

Scales a given size based on the current window width relative to a predefined base width.

### ResponsiveDimensions.s

Type: `(size: number) => boolean`

This is just a short name for `ResponsiveDimensions.scale`.

### ResponsiveDimensions.verticalScale

Type: `(size: number) => boolean`

Scales a given size based on the current window height relative to a predefined base height.

### ResponsiveDimensions.vs

Type: `(size: number) => boolean`

This is just a short name for `ResponsiveDimensions.verticalScale`.

### ResponsiveDimensions.moderateScale

Type: `(size: number, factor: number) => boolean`

If `baseDimensions` not passed a default value is used equivalent to `0.5`.

Applies a moderate scaling to a given size, blending the original size with a scaled size based on the current window width. The blend is controlled by a factor, allowing for fine-tuning of the scaling effect.

### ResponsiveDimensions.ms

Type: `(size: number, factor: number) => boolean`

If `baseDimensions` not passed a default value is used equivalent to `0.5`.

This is just a short name for `ResponsiveDimensions.moderateScale`.

### ResponsiveDimensions.moderateVerticalScale

Type: `(size: number, factor: number) => boolean`

If `baseDimensions` not passed a default value is used equivalent to `0.5`.

Applies a moderate scaling to a given size, blending the original size with a scaled size based on the current window height. The blend is controlled by a factor, allowing for fine-tuning of the scaling effect.

### ResponsiveDimensions.mvs

Type: `(size: number, factor: number) => boolean`

If `baseDimensions` not passed a default value is used equivalent to `0.5`.

This is just a short name for `ResponsiveDimensions.moderateVerticalScale`.

### ResponsiveDimensions.percentWidth

Type: `(percent: number) => boolean`

Calculates the width as a percentage of the current window width.

### ResponsiveDimensions.pw

Type: `(percent: number) => boolean`

This is just a short name for `ResponsiveDimensions.percentWidth`.

### ResponsiveDimensions.percentHeight

Type: `(percent: number) => boolean`

Calculates the height as a percentage of the current window height.

### ResponsiveDimensions.ph

Type: `(percent: number) => boolean`

This is just a short name for `ResponsiveDimensions.percentHeight`.
