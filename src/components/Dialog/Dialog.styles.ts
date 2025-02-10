// External imports.
import { StyleSheet } from 'react-native';
import { vs } from 'react-native-size-matters';

const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
  },
  dialog: {
    width: '90%',
    marginVertical: vs(8),
    overflow: 'hidden',
    alignItems: 'center',
  },
});

export default styles;
