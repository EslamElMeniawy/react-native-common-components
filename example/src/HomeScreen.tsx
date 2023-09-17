import * as React from 'react';
import {
  ScrollView,
  Button,
} from '@eslam-elmeniawy/react-native-common-components';
import styles from './styles';

export default function HomeScreen({ navigation }: { navigation: any }) {
  const _openScreen = (screenName: string) => navigation.navigate(screenName);

  const _buttonStyle = {
    ...(styles.width90perc as object),
    ...(styles.alignSelfCenter as object),
    ...(styles.marginVertical8vs as object),
  };

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
