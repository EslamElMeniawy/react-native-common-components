// External imports.
import { StyleSheet } from 'react-native';
import { vs } from 'react-native-size-matters';

const styles = StyleSheet.create({
  list: {
    flex: 1,
    width: '100%',
    marginVertical: vs(4),
  },
  horizontalContainerStyle: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: '10%',
  },
});

export default styles;
