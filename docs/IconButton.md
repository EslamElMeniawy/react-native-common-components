# IconButton

Icon button component that renders a clickable icon and supports normal images, `.svg` images using [`react-native-vector-image`](https://github.com/oblador/react-native-vector-image) and [`MaterialCommunityIcons`](https://materialdesignicons.com) using [`react-native-vector-icons`](https://github.com/oblador/react-native-vector-icons).

## Images

### Android

<p align="middle">
  <img src="/assets/images/icon-button/android/icon-button.png" width="30%" alt="Android IconButton">
</p>

### iOS

<p align="middle">
  <img src="/assets/images/icon-button/ios/icon-button.png" width="30%" alt="iOS IconButton">
</p>

## `.svg` support

If you intend using `.svg` images for component then make sure to add [`react-native-vector-image`](https://github.com/oblador/react-native-vector-image) to your project and follow the [installation steps](https://github.com/oblador/react-native-vector-image#installation) as well.

## Usage

```js
import React from 'react';
import { View } from 'react-native';
import { IconButton } from '@eslam-elmeniawy/react-native-common-components';

const MyComponent = () => {
  return (
    <View>
      {/* Normal image */}
      <IconButton image={require('./image.png')} />
      {/* .svg image */}
      <IconButton vector={require('./image.svg')} />
      {/* MaterialCommunityIcon */}
      <IconButton iconName="react" />
    </View>
  );
};
```

## Props

### image

Type: `number` - opaque type returned by something like `require('./image.jpg')`

The image to display for the icon button. Used for any [supported image formats](https://reactnative.dev/docs/image#source) by `ReactNative`.

### vector

Type: `number` - opaque type returned by something like `require('./image.svg')`

The image to display for the icon button. Used for `.svg` images.

### iconName

Type: `string` - one of the names available in [`MaterialCommunityIcons`](https://materialdesignicons.com)

The image to display for the icon button. Used for [`MaterialCommunityIcons`](https://materialdesignicons.com).

### size

Type: `number`

Default value: `36`

Determines the full icon button size including the padding if available.

### color

Type: `string`

Custom color for icon.

If not passed a default value from `react-native-paper` theme is used equivalent to `theme.colors.primary`.

### onPress

Type: `() => void`

Function to execute on press.

### onLongPress

Type: `() => void`

Function to execute on long press.

### onPressIn

Type: `() => void`

Function to execute as soon as the touchable element is pressed and invoked even before `onPress`.

### onPressOut

Type: `() => void`

Function to execute as soon as the touch is released even before `onPress`.

### disabled

Type: `boolean`

Default value: `false`

Determines whether icon button is disabled.

### iconPercent

Type: `number`

Default value: `60`

Determines the image size as percent from the `size` prop.

### noIconTint

Type: `boolean`

Default value: `false`

Determines whether not to apply tint color or not.

### [...View props](https://reactnative.dev/docs/view#props)
