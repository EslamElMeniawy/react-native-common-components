# Log Utils

Helpers for `Log` that uses [`reactotron`](https://github.com/infinitered/reactotron/blob/master/docs/quick-start-react-native.md) and [`crashlytics`](https://rnfirebase.io/crashlytics/usage).

## Extra Installation

To use the component, you need to add [`reactotron-react-native`](https://github.com/infinitered/reactotron/blob/master/docs/quick-start-react-native.md) as a dev dependency and both [`@react-native-firebase/app`](https://rnfirebase.io) and [`@react-native-firebase/crashlytics`](https://rnfirebase.io/crashlytics/usage) as dependencies to your project and follow the instruction for them.

## Usage

```js
import React from 'react';
import { View } from 'react-native';
import {
  configureLog,
  Button,
} from '@eslam-elmeniawy/react-native-common-components';

const MyComponent = () => {
  React.useEffect(() => {
    configureLog?.({
      appName: '@eslam-elmeniawy/react-native-common-components',
      firebaseLogLevels: ['INFO', 'LOG', 'WARN', 'ERROR'],
      isLocalLogEnable: true,
    });
  });

  const onPress = () => console.log('Log message');

  return (
    <View>
      <Button text="Log" onPress={onPress} />
    </View>
  );
};
```

## Content

### configureLog

Type: `((options?: Options) => Reactotron<ReactotronReactNative> & ReactotronReactNative) | undefined`

#### Options.appName

Type: `string`

The app name to use when configuring `reactotron`.

#### Options.firebaseLogLevels

Type: `Array<'INFO' | 'LOG' | 'WARN' | 'ERROR'>`

Default value: `[]`

Log levels to add to firebase `crashlytics` logs.

#### Options.isLocalLogEnable

Type: `boolean`

Default value: `false`

Whether to enable local log or not.

#### Options.clientOptions

Type: `ClientOptions`

[`reactotron`](https://github.com/infinitered/reactotron/blob/master/docs/quick-start-react-native.md) client options.

#### Options.pluginCreators

Type: `((client: Reactotron<ReactotronReactNative> & ReactotronReactNative) => any)[]`

List of [`reactotron`](https://github.com/infinitered/reactotron/blob/master/docs/quick-start-react-native.md) plugin creator functions to add to add to [`reactotron`](https://github.com/infinitered/reactotron/blob/master/docs/quick-start-react-native.md) instance.
