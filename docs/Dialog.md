# Dialog

Dialog component that is wrapped by `Portal` component from `react-native-paper` to render above other components with the handling of Android hardware back implemented to dismiss the dialog.

## Images

### Android

<p align="middle">
  <img src="/assets/images/dialog/android/simple.png" width="30%" alt="Android Simple Dialog">
  <img src="/assets/images/dialog/android/top.png" width="30%" alt="Android Top Dialog">
  <img src="/assets/images/dialog/android/bottom.png" width="30%" alt="Android Bottom Dialog">
</p>

### iOS

<p align="middle">
  <img src="/assets/images/dialog/ios/simple.png" width="30%" alt="iOS Simple Dialog">
  <img src="/assets/images/dialog/ios/top.png" width="30%" alt="iOS Top Dialog">
  <img src="/assets/images/dialog/ios/bottom.png" width="30%" alt="iOS Bottom Dialog">
</p>

## Usage

```js
import React from 'react';
import { View } from 'react-native';
import {
  Button,
  Dialog,
  Text,
} from '@eslam-elmeniawy/react-native-common-components';

const MyComponent = () => {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  return (
    <View>
      <Button text="Show Dialog" onPress={showDialog} />
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Text>This is simple dialog</Text>
      </Dialog>
    </View>
  );
};
```

## Props

### visible

Type: `boolean`

Default value: `false`

Determines whether the dialog is visible.

### position

Type: `'top' | 'bottom' | 'center'`

Default value: `'center'`

Determines the position of the dialog.

### onDismiss

Type: `() => void`

Callback that is called when the user dismisses the dialog.

### dismissable

Type: `boolean`

Default value: `true`

Determines whether clicking outside the dialog dismiss it.

Also affects the Android hardware back button click while the dialog is open.

### style

Type: `StyleProp<ViewStyle>`

### overlayColor

Type: `string`

The overlay color that displays behind the dialog.

If not passed a default value from `react-native-paper` theme is used equivalent to `theme.colors.onSurface` with alpha `70%`.

### children

Type: `React.ReactNode`

Content of the dialog.
