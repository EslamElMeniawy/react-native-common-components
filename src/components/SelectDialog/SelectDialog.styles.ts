// External imports.
import { StyleSheet } from 'react-native';
import { vs } from 'react-native-size-matters';

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
  container: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },
  noDataText: {
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: vs(16),
  },
  list: {
    marginTop: vs(8),
  },
  selectItem: {
    marginVertical: vs(4),
  },
  closeButton: {
    width: '100%',
    marginTop: vs(16),
  },
});

export default styles;
