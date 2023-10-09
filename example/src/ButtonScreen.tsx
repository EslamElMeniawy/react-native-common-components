import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  ScrollView,
  Button,
} from '@eslam-elmeniawy/react-native-common-components';
import styles from './styles';

export default function ButtonScreen() {
  const _onPress = () => {};

  const _buttonStyle = StyleSheet.flatten([
    styles.width90perc,
    styles.alignSelfCenter,
    styles.marginVertical8vs,
  ]);

  const _customButtonStyle = StyleSheet.flatten([
    styles.alignSelfCenter,
    styles.marginVertical8vs,
    styles.paddingHorizontal16s,
    styles.paddingVertical4vs,
    styles.borderRadius8ms,
  ]);

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
