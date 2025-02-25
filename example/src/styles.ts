import { StyleSheet } from 'react-native';
import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';

const styles = StyleSheet.create({
  width90perc: { width: '90%' },
  alignSelfCenter: { alignSelf: 'center' },
  marginVertical8vs: { marginVertical: ResponsiveDimensions.vs(8) },
  paddingHorizontal16s: { paddingHorizontal: ResponsiveDimensions.s(16) },
  paddingVertical4vs: { paddingVertical: ResponsiveDimensions.vs(4) },
  padding8ms: { padding: ResponsiveDimensions.ms(8) },
  borderRadius8ms: { borderRadius: ResponsiveDimensions.ms(8) },
  marginHorizontal5perc: { marginHorizontal: '5%' },
  marginVertical16vs: { marginVertical: ResponsiveDimensions.vs(16) },
  marginTop8vs: { marginTop: ResponsiveDimensions.vs(8) },
  marginBottom8vs: { marginBottom: ResponsiveDimensions.vs(8) },
  marginTop2vs: { marginTop: ResponsiveDimensions.vs(2) },
});

export default styles;
