// External imports.
import { StyleSheet } from 'react-native';
import { s } from 'react-native-size-matters';

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
  rippleView: {
    flexDirection: 'row',
    paddingHorizontal: s(8),
  },
  text: {
    marginStart: s(8),
    flex: 1,
  },
});

export default styles;
