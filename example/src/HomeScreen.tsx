import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  ScrollView,
  Button,
} from '@eslam-elmeniawy/react-native-common-components';
import styles from './styles';

export default function HomeScreen({
  navigation,
}: Readonly<{ navigation: any }>) {
  const _openScreen = (screenName: string) => navigation.navigate(screenName);

  const _buttonStyle = StyleSheet.flatten([
    styles.width90perc,
    styles.alignSelfCenter,
    styles.marginVertical8vs,
  ]);

  return (
    <ScrollView>
      <Button
        style={_buttonStyle}
        onPress={() => _openScreen('AlertDialog')}
        text="AlertDialog"
      />
      <Button
        style={_buttonStyle}
        onPress={() => _openScreen('Button')}
        text="Button"
      />
      <Button
        style={_buttonStyle}
        onPress={() => _openScreen('Card')}
        text="Card"
      />
      <Button
        style={_buttonStyle}
        onPress={() => _openScreen('Checkbox')}
        text="Checkbox"
      />
      <Button
        style={_buttonStyle}
        onPress={() => _openScreen('Dialog')}
        text="Dialog"
      />
      <Button
        style={_buttonStyle}
        onPress={() => _openScreen('IconButton')}
        text="IconButton"
      />
      <Button
        style={_buttonStyle}
        onPress={() => _openScreen('ImagePlaceholder')}
        text="ImagePlaceholder"
      />
      <Button
        style={_buttonStyle}
        onPress={() => _openScreen('LoadingDialog')}
        text="LoadingDialog"
      />
      <Button
        style={_buttonStyle}
        onPress={() => _openScreen('RadioButton')}
        text="RadioButton"
      />
      <Button
        style={_buttonStyle}
        onPress={() => _openScreen('SelectDialog')}
        text="SelectDialog"
      />
      <Button
        style={_buttonStyle}
        onPress={() => _openScreen('TextInput')}
        text="TextInput"
      />
      <Button
        style={_buttonStyle}
        onPress={() => _openScreen('Text')}
        text="Text"
      />
      <Button
        style={_buttonStyle}
        onPress={() => _openScreen('Utils')}
        text="Utils"
      />
    </ScrollView>
  );
}
