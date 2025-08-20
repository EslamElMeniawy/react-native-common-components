// External imports.
import { StyleSheet } from 'react-native';

// Internal imports.
import ResponsiveDimensions from '@src/utils/ResponsiveDimensions';

const styles = StyleSheet.create({
  overlay: { width: '100%', height: '100%' },
  safeArea: { flex: 1, alignItems: 'center' },
  dialog: {
    width: '90%',
    marginVertical: ResponsiveDimensions.vs(8),
    overflow: 'hidden',
    alignItems: 'center',
  },
});

export default styles;
