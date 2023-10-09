import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  ScrollView,
  RadioButton,
} from '@eslam-elmeniawy/react-native-common-components';
import styles from './styles';

export default function RadioButtonScreen() {
  const [checked, setChecked] = React.useState(false);

  const _onPress = () => setChecked(!checked);

  const _radioButtonStyle = StyleSheet.flatten([
    styles.width90perc,
    styles.alignSelfCenter,
    styles.marginVertical8vs,
  ]);

  return (
    <ScrollView>
      <RadioButton style={_radioButtonStyle} text="Unchecked" />
      <RadioButton style={_radioButtonStyle} text="Checked" checked />
      <RadioButton style={_radioButtonStyle} text="Disabled" disabled />
      <RadioButton
        style={_radioButtonStyle}
        text="Click Me"
        checked={checked}
        onPress={_onPress}
      />
    </ScrollView>
  );
}
