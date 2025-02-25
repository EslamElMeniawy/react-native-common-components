// External imports.
import { StyleSheet } from 'react-native';

// Internal imports.
import ResponsiveDimensions from '../../utils/ResponsiveDimensions';

const styles = StyleSheet.create({
  container: { overflow: 'hidden' },
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { resizeMode: 'contain' },
  text: { marginHorizontal: ResponsiveDimensions.s(4) },
});

export default styles;
