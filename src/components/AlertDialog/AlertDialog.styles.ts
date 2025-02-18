// External imports.
import { StyleSheet } from 'react-native';

// Internal imports.
import ResponsiveDimensions from '../../utils/ResponsiveDimensions';

const styles = StyleSheet.create({
  dialog: {
    alignItems: 'stretch',
  },
  actionsContainer: {
    marginTop: ResponsiveDimensions.ms(32),
  },
  actionsContainerRow: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  actionsContainerColumn: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  action: {
    backgroundColor: 'transparent',
    paddingHorizontal: ResponsiveDimensions.ms(8),
    maxWidth: '80%',
    marginTop: ResponsiveDimensions.ms(8),
  },
  actionRow: {
    marginStart: ResponsiveDimensions.ms(8),
  },
});

export default styles;
