import * as React from 'react';
import {
  ScrollView,
  Text,
  IconButton,
} from '@eslam-elmeniawy/react-native-common-components';
import styles from './styles';

export default function IconButtonScreen() {
  const _onPress = () => {};

  const _textStyle = {
    ...(styles.marginTop8vs as object),
    ...(styles.alignSelfCenter as object),
  };

  const _iconStyle = {
    ...(styles.marginBottom8vs as object),
    ...(styles.alignSelfCenter as object),
  };

  return (
    <ScrollView>
      <Text style={_textStyle}>Image</Text>
      <IconButton
        style={_iconStyle}
        image={require('./information.png')}
        onPress={_onPress}
      />
      <Text style={_textStyle}>Vector</Text>
      <IconButton
        style={_iconStyle}
        vector={require('./information.svg')}
        onPress={_onPress}
      />
      <Text style={_textStyle}>Icon</Text>
      <IconButton
        style={_iconStyle}
        iconName="information"
        onPress={_onPress}
      />
    </ScrollView>
  );
}
