import * as React from 'react';
import {
  ScrollView,
  Checkbox,
} from '@eslam-elmeniawy/react-native-common-components';
import styles from './styles';

export default function CheckboxScreen() {
  const [checked, setChecked] = React.useState(false);
  const _onPress = () => setChecked(!checked);

  const _checkboxStyle = {
    ...(styles.width90perc as object),
    ...(styles.alignSelfCenter as object),
    ...(styles.marginVertical8vs as object),
  };

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
