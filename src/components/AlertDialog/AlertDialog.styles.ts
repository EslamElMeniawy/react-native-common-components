// External imports.
import { StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';

const styles = StyleSheet.create({
  dialog: {
    alignItems: 'stretch',
  },
  actionsContainer: {
    marginTop: ms(32),
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
    paddingHorizontal: ms(8),
    maxWidth: '80%',
    marginTop: ms(8),
  },
  actionRow: {
    marginStart: ms(8),
  },
});

export default styles;
