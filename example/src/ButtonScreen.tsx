import * as React from 'react';
import {
  ScrollView,
  Button,
} from '@eslam-elmeniawy/react-native-common-components';
import styles from './styles';

export default function ButtonScreen() {
  const _onPress = () => {};

  const _buttonStyle = {
    ...(styles.width90perc as object),
    ...(styles.alignSelfCenter as object),
    ...(styles.marginVertical8vs as object),
  };

  const _customButtonStyle = {
    ...(styles.alignSelfCenter as object),
    ...(styles.marginVertical8vs as object),
    ...(styles.paddingHorizontal16s as object),
    ...(styles.paddingVertical4vs as object),
    ...(styles.borderRadius8ms as object),
  };

  return (
    <ScrollView>
      <Button style={_buttonStyle} onPress={_onPress} text="Simple Button" />
      <Button
        style={_buttonStyle}
        startImage={require('./information.png')}
        onPress={_onPress}
        text="Button With Image"
      />
      <Button
        style={_buttonStyle}
        startVector={require('./information.svg')}
        onPress={_onPress}
        text="Button With Vector"
      />
      <Button
        style={_buttonStyle}
        startIconName="information"
        onPress={_onPress}
        text="Button With Icon"
      />
      <Button
        style={_customButtonStyle}
        endIconName="information"
        onPress={_onPress}
        text="Custom Button"
        iconSize={18}
      />
    </ScrollView>
  );
}
