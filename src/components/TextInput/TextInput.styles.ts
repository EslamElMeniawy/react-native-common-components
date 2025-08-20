// External imports.
import { StyleSheet } from 'react-native';

// Internal imports.
import ResponsiveDimensions from '@src/utils/ResponsiveDimensions';

const styles = StyleSheet.create({
  input: {
    textAlign: 'auto',
    lineHeight: undefined,
    fontSize: ResponsiveDimensions.ms(13),
    paddingHorizontal: ResponsiveDimensions.ms(8),
  },
  noVerticalMargin: { marginVertical: 0, marginTop: 0, marginBottom: 0 },
  selectInputInput: { width: '100%' },
  selectItem: { marginVertical: ResponsiveDimensions.ms(4) },
});

export default styles;
