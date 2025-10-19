# @eslam-elmeniawy/react-native-common-components

<p>
  <a href="https://www.npmjs.com/package/@eslam-elmeniawy/react-native-common-components">
    <img alt="npm Version" src="https://img.shields.io/npm/v/@eslam-elmeniawy/react-native-common-components.svg" />
  </a>
  <a href="https://github.com/EslamElMeniawy/react-native-common-components#readme">
    <img alt="Documentation" src="https://img.shields.io/badge/Documented%3F-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/EslamElMeniawy/react-native-common-components/graphs/commit-activity">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/EslamElMeniawy/react-native-common-components/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Common [`ReactNative`](https://reactnative.dev) components packed in library for usage in projects.

## Installation

```sh
yarn add @eslam-elmeniawy/react-native-common-components
```

The package depends on some third party packages that needs to be installed on the project as well.

To install them you can use the following commands:

```sh
yarn add react-native-paper react-native-safe-area-context
```

As the package depends on `react-native-paper`, your root component must be wrapped with `Provider` from `react-native-paper`.

See [React Native Paper Getting Started](https://callstack.github.io/react-native-paper/docs/guides/getting-started) for more details about adding `react-native-paper` to your project.

As mentioned in [React Native Paper Getting Started](https://callstack.github.io/react-native-paper/docs/guides/getting-started), `react-native-paper` also depends on `@react-native-vector-icons/material-design-icons` so make sure to add it to your project as well.

### Using `.svg` props available in some components

If you intend using `.svg` images for components that support them then make sure to add [`react-native-vector-image`](https://github.com/oblador/react-native-vector-image) to your project and follow the [installation steps](https://github.com/oblador/react-native-vector-image#installation) as well.

### Using [`ImagePlaceholder`](docs/ImagePlaceholder.md) component

If you intend using [`ImagePlaceholder`](docs/ImagePlaceholder.md) component then make sure to add [`@d11/react-native-fast-image`](https://github.com/dream-sports-labs/react-native-fast-image), [`react-native-progress`](https://github.com/oblador/react-native-progress) and [`react-native-svg`](https://github.com/react-native-svg/react-native-svg) to your project.

### Using [`ScrollView`](docs/ScrollView.md) component

If you intend using [`ScrollView`](docs/ScrollView.md) component then make sure to add [`react-native-keyboard-controller`](https://github.com/kirillzyusko/react-native-keyboard-controller) to your project and follow the [installation steps](https://kirillzyusko.github.io/react-native-keyboard-controller/docs/installation) as well.

### Using [`LogUtils`](docs/LogUtils.md)

If you intend using [`LogUtils`](docs/LogUtils.md) then make sure to add [`reactotron-react-native`](https://github.com/infinitered/reactotron/blob/master/docs/quick-start-react-native.md) as a dev dependency and both [`@react-native-firebase/app`](https://rnfirebase.io) and [`@react-native-firebase/crashlytics`](https://rnfirebase.io/crashlytics/usage) as dependencies to your project and follow the instruction for them.

## Example

Example is available in [example folder](example).

To run the example run the following commands:

```sh
# setup project by installing dependencies.
yarn
# start the Metro server for the example app.
yarn example start
# run the example app on Android.
yarn example android
# run the example app on iOS.
yarn example ios
```

## Usage

Each component has its own usage part in the [documentation](docs).

## Components

- [Accordion](docs/Accordion.md)
- [AlertDialog](docs/AlertDialog.md)
- [Button](docs/Button.md)
- [Checkbox](docs/Checkbox.md)
- [Dialog](docs/Dialog.md)
- [FlatList](docs/FlatList.md)
- [IconButton](docs/IconButton.md)
- [ImagePlaceholder](docs/ImagePlaceholder.md)
- [LoadingDialog](docs/LoadingDialog.md)
- [RadioButton](docs/RadioButton.md)
- [ScrollView](docs/ScrollView.md)
- [SelectDialog](docs/SelectDialog.md)
- [Text](docs/Text.md)
- [TextInput](docs/TextInput.md)

## Utils

- [LogUtils](docs/LogUtils.md)
- [ResponsiveDimensionsUtils](docs/ResponsiveDimensionsUtils.md)
- [StatusBarUtils](docs/StatusBarUtils.md)
- [StringUtils](docs/StringUtils.md)
- [ValidationUtils](docs/ValidationUtils.md)

## Types

- [FlatListItem](docs/FlatListItem.md)
- [SelectItem](docs/SelectItem.md)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
