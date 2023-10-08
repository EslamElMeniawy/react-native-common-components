// External imports.
import { StyleSheet } from 'react-native';
import { vs, ms } from 'react-native-size-matters';

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
    borderRadius: ms(10),
    overflow: 'hidden',
    alignItems: 'center',
    padding: ms(10),
  },
});

export default styles;
