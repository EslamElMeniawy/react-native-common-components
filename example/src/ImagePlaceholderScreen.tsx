import * as React from 'react';
import {
  ScrollView,
  ImagePlaceholder,
  Text,
} from '@eslam-elmeniawy/react-native-common-components';
import styles from './styles';

export default function ImagePlaceholderScreen() {
  const _textStyle = {
    ...(styles.marginTop8vs as object),
    ...(styles.alignSelfCenter as object),
  };

  const _imageStyle = {
    ...(styles.marginBottom8vs as object),
    ...(styles.alignSelfCenter as object),
  };

  return (
    <ScrollView>
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
