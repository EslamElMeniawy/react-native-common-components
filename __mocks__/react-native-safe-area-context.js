const React = require('react');
const RN = require('react-native');

module.exports = {
  SafeAreaProvider: ({ children }) => children,
  SafeAreaView: ({ children, ...props }) =>
    React.createElement(RN.View, props, children),
  useSafeAreaInsets: jest.fn(() => ({
    top: 44,
    bottom: 34,
    left: 0,
    right: 0,
  })),
};
