import { StyleSheet } from 'react-native';
import { vs, s, ms } from 'react-native-size-matters';

const styles = StyleSheet.create({
  width90perc: {
    width: '90%',
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  marginVertical8vs: {
    marginVertical: vs(8),
  },
  paddingHorizontal16s: {
    paddingHorizontal: s(16),
  },
  paddingVertical4vs: {
    paddingVertical: vs(4),
  },
  padding8ms: {
    padding: ms(8),
  },
  borderRadius8ms: {
    borderRadius: ms(8),
  },
  marginHorizontal5perc: {
    marginHorizontal: '5%',
  },
  marginVertical16vs: {
    marginVertical: vs(16),
  },
  marginTop8vs: {
    marginTop: vs(8),
  },
  marginBottom8vs: {
    marginBottom: vs(8),
  },
  marginTop2vs: {
    marginTop: vs(2),
  },
});

export default styles;
