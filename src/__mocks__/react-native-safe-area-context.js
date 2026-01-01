module.exports = {
  SafeAreaProvider: jest.fn(({ children }) => children),
  SafeAreaView: jest.fn(({ children }) => children),
  useSafeAreaInsets: jest.fn(() => ({
    top: 44,
    bottom: 34,
    left: 0,
    right: 0,
  })),
};
