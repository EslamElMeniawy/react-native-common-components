import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  ScrollView,
  Text,
  isIPhoneX,
  isIPhoneXMax,
  isIPhone12,
  isIPhone12Max,
  isIPhone14Pro,
  isIPhone14Max,
  isIPhoneWithMonobrow,
  getStatusBarHeight,
  Button,
} from '@eslam-elmeniawy/react-native-common-components';
import crashlytics from '@react-native-firebase/crashlytics';
import styles from './styles';

export default function UtilsScreen() {
  const _onLogMessagePress = () => {
    console.log('Log message');
  };

  const _onLogErrorPress = () => {
    console.error('Log error');
    crashlytics().crash();
  };

  const _textStyle = StyleSheet.flatten([
    styles.width90perc,
    styles.alignSelfCenter,
    styles.marginVertical8vs,
  ]);

  const _buttonStyle = StyleSheet.flatten([
    styles.width90perc,
    styles.alignSelfCenter,
    styles.marginVertical8vs,
  ]);

  return (
    <ScrollView>
      <Text style={_textStyle}>
        <Text type="bold" size={13}>
          isIPhoneX:
        </Text>
        {` ${isIPhoneX()}`}
      </Text>
      <Text style={_textStyle}>
        <Text type="bold" size={13}>
          isIPhoneXMax:
        </Text>
        {` ${isIPhoneXMax()}`}
      </Text>
      <Text style={_textStyle}>
        <Text type="bold" size={13}>
          isIPhone12:
        </Text>
        {` ${isIPhone12()}`}
      </Text>
      <Text style={_textStyle}>
        <Text type="bold" size={13}>
          isIPhone12Max:
        </Text>
        {` ${isIPhone12Max()}`}
      </Text>
      <Text style={_textStyle}>
        <Text type="bold" size={13}>
          isIPhone14Pro:
        </Text>
        {` ${isIPhone14Pro()}`}
      </Text>
      <Text style={_textStyle}>
        <Text type="bold" size={13}>
          isIPhone14Max:
        </Text>
        {` ${isIPhone14Max()}`}
      </Text>
      <Text style={_textStyle}>
        <Text type="bold" size={13}>
          isIPhoneWithMonobrow:
        </Text>
        {` ${isIPhoneWithMonobrow()}`}
      </Text>
      <Text style={_textStyle}>
        <Text type="bold" size={13}>
          getStatusBarHeight:
        </Text>
        {` ${getStatusBarHeight()}`}
      </Text>
      <Button
        text="Add Log Message"
        onPress={_onLogMessagePress}
        style={_buttonStyle}
      />
      <Button
        text="Add Log Error"
        onPress={_onLogErrorPress}
        style={_buttonStyle}
      />
    </ScrollView>
  );
}
