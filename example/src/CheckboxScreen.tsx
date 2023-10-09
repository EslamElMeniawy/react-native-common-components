import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  ScrollView,
  Checkbox,
} from '@eslam-elmeniawy/react-native-common-components';
import styles from './styles';

export default function CheckboxScreen() {
  const [checked, setChecked] = React.useState(false);
  const _onPress = () => setChecked(!checked);

  const _checkboxStyle = StyleSheet.flatten([
    styles.width90perc,
    styles.alignSelfCenter,
    styles.marginVertical8vs,
  ]);

  return (
    <ScrollView>
      <Checkbox style={_checkboxStyle} text="Unchecked" />
      <Checkbox style={_checkboxStyle} text="Checked" checked />
      <Checkbox style={_checkboxStyle} text="Disabled" disabled />
      <Checkbox
        style={_checkboxStyle}
        text="Click Me"
        checked={checked}
        onPress={_onPress}
      />
    </ScrollView>
  );
}
