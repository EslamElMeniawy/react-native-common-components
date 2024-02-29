// External imports.
import { StyleSheet, I18nManager } from 'react-native';
import { ms } from 'react-native-size-matters';

const styles = StyleSheet.create({
  input: {
    textAlign: I18nManager.isRTL ? 'right' : 'left',
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
