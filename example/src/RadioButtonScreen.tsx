import * as React from 'react';
import {
  ScrollView,
  RadioButton,
} from '@eslam-elmeniawy/react-native-common-components';
import styles from './styles';

export default function RadioButtonScreen() {
  const [checked, setChecked] = React.useState(false);

  const _onPress = () => setChecked(!checked);

  const _radioButtonStyle = {
    ...(styles.width90perc as object),
    ...(styles.alignSelfCenter as object),
    ...(styles.marginVertical8vs as object),
  };

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
