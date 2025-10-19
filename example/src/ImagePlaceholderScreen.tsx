import { StyleSheet } from 'react-native';
import {
  ScrollView,
  ImagePlaceholder,
  Text,
} from '@eslam-elmeniawy/react-native-common-components';
import styles from './styles';

export default function ImagePlaceholderScreen() {
  const _textStyle = StyleSheet.flatten([
    styles.marginTop8vs,
    styles.alignSelfCenter,
  ]);

  const _imageStyle = StyleSheet.flatten([
    styles.marginBottom8vs,
    styles.alignSelfCenter,
  ]);

  return (
    <ScrollView contentContainerStyle={styles.paddingVertical4vs}>
      <Text style={_textStyle}>Invalid Url</Text>
      <ImagePlaceholder
        style={_imageStyle}
        size={100}
        source="https://invalid"
        placeholder={require('./placeholder.png')}
      />
      <Text style={_textStyle}>Valid Url</Text>
      <ImagePlaceholder
        style={_imageStyle}
        size={100}
        source="https://unsplash.it/500"
        placeholder={require('./placeholder.png')}
      />
    </ScrollView>
  );
}
