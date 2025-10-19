// External imports.
import { StyleSheet } from 'react-native';

// Internal imports.
import ResponsiveDimensions from '../../utils/ResponsiveDimensions';

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRipple: {
    flex: 1,
    borderRadius: ResponsiveDimensions.ms(16),
    overflow: 'hidden',
  },
  measuringContainer: {
    position: 'absolute',
    opacity: 0,
  },
});

export default styles;
