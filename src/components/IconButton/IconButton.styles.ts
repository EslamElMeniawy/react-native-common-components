// External imports.
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  noPadding: {
    padding: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingStart: 0,
    paddingEnd: 0,
    paddingRight: 0,
    paddingLeft: 0,
  },
  ripple: {
    flex: 1,
  },
  rippleView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    resizeMode: 'contain',
  },
});

export default styles;
