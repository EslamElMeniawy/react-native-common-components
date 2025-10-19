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
  isIPhone16Max,
  isIPhoneWithMonobrow,
  getStatusBarHeight,
  ResponsiveDimensions,
  Button,
} from '@eslam-elmeniawy/react-native-common-components';
import { getCrashlytics, crash } from '@react-native-firebase/crashlytics';
import styles from './styles';

export default function UtilsScreen() {
  const _onLogMessagePress = () => {
    console.log('Log message');
  };

  const _onLogErrorPress = () => {
    console.error('Log error');
    crash(getCrashlytics());
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
    <ScrollView contentContainerStyle={styles.paddingVertical4vs}>
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
          isIPhone16Max:
        </Text>
        {` ${isIPhone16Max()}`}
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
      <Text style={_textStyle}>
        <Text type="bold" size={13}>
          ResponsiveDimensions.s(24):
        </Text>
        {` ${ResponsiveDimensions.s(24)}`}
      </Text>
      <Text style={_textStyle}>
        <Text type="bold" size={13}>
          ResponsiveDimensions.vs(24):
        </Text>
        {` ${ResponsiveDimensions.vs(24)}`}
      </Text>
      <Text style={_textStyle}>
        <Text type="bold" size={13}>
          ResponsiveDimensions.ms(24):
        </Text>
        {` ${ResponsiveDimensions.ms(24)}`}
      </Text>
      <Text style={_textStyle}>
        <Text type="bold" size={13}>
          ResponsiveDimensions.mvs(24):
        </Text>
        {` ${ResponsiveDimensions.mvs(24)}`}
      </Text>
      <Text style={_textStyle}>
        <Text type="bold" size={13}>
          ResponsiveDimensions.pw(50):
        </Text>
        {` ${ResponsiveDimensions.pw(50)}`}
      </Text>
      <Text style={_textStyle}>
        <Text type="bold" size={13}>
          ResponsiveDimensions.ph(50):
        </Text>
        {` ${ResponsiveDimensions.ph(50)}`}
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
