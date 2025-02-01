// External imports.
import { StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';

const styles = StyleSheet.create({
  input: {
    textAlign: 'auto',
    lineHeight: undefined,
    fontSize: ms(13),
    paddingHorizontal: ms(8),
  },
  noVerticalMargin: {
    marginVertical: 0,
    marginTop: 0,
    marginBottom: 0,
  },
  selectInputInput: {
    width: '100%',
  },
  selectItem: {
    marginVertical: ms(4),
  },
});

export default styles;
