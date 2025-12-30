const React = require('react');
const RN = require('react-native');

const mockTheme = {
  colors: {
    primary: '#6200ee',
    surface: '#ffffff',
    background: '#f6f6f6',
  },
  isV3: true,
  fonts: {
    bodyMedium: { fontSize: 14, lineHeight: 20 },
    bodySmall: { fontSize: 12, lineHeight: 16 },
    titleLarge: { fontSize: 22, lineHeight: 28 },
  },
};

module.exports = {
  withTheme: (Component) => (props) =>
    React.createElement(Component, { ...props, theme: mockTheme }),
  Text: (props) => React.createElement(RN.Text, props, props.children),
  ActivityIndicator: (props) =>
    React.createElement(RN.ActivityIndicator, props),
  TouchableRipple: ({ children, ...props }) =>
    React.createElement(RN.TouchableOpacity, props, children),
  Portal: ({ children }) => children,
  Modal: ({ children, visible }) => (visible ? children : null),
  Provider: ({ children }) => children,
};
