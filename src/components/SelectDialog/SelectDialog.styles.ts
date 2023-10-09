// External imports.
import { StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';

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
    borderRadius: ms(10),
    overflow: 'hidden',
    padding: ms(16),
  },
  noDataText: {
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: ms(16),
  },
  list: {
    marginTop: ms(8),
  },
  selectItem: {
    marginVertical: ms(4),
  },
  closeButton: {
    width: '100%',
    marginTop: ms(16),
    borderRadius: ms(10),
  },
});

export default styles;
