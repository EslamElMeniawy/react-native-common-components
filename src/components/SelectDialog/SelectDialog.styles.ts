// External imports.
import { StyleSheet } from 'react-native';

// Internal imports.
import ResponsiveDimensions from '../../utils/ResponsiveDimensions';

const styles = StyleSheet.create({
  dialog: {
    width: '90%',
    height: '90%',
    borderRadius: 0,
    overflow: 'hidden',
    alignItems: 'center',
    padding: 0,
    backgroundColor: 'transparent',
  },
  container: { flex: 1, width: '100%', overflow: 'hidden' },
  noDataText: {
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: ResponsiveDimensions.vs(16),
  },
  list: { marginTop: ResponsiveDimensions.vs(8) },
  selectItem: { marginVertical: ResponsiveDimensions.vs(4) },
  closeButton: { width: '100%', marginTop: ResponsiveDimensions.vs(16) },
});

export default styles;
