import { StyleSheet } from 'react-native';
import {
  ScrollView,
  Text,
} from '@eslam-elmeniawy/react-native-common-components';
import { Divider } from 'react-native-paper';
import styles from './styles';

export default function TextScreen() {
  const _textStyle = StyleSheet.flatten([
    styles.width90perc,
    styles.alignSelfCenter,
    styles.marginVertical8vs,
  ]);

  return (
    <ScrollView contentContainerStyle={styles.paddingVertical4vs}>
      <Text style={_textStyle}>Normal Text</Text>
      <Text style={_textStyle} type="bold">
        Bold Text
      </Text>
      <Text style={_textStyle} type="caption">
        Caption Text
      </Text>
      <Divider />
      <Text style={_textStyle} variant="displayLarge">
        Display Large
      </Text>
      <Text style={_textStyle} variant="displayMedium">
        Display Medium
      </Text>
      <Text style={_textStyle} variant="displaySmall">
        Display small
      </Text>
      <Text style={_textStyle} variant="headlineLarge">
        Headline Large
      </Text>
      <Text style={_textStyle} variant="headlineMedium">
        Headline Medium
      </Text>
      <Text style={_textStyle} variant="headlineSmall">
        Headline Small
      </Text>
      <Text style={_textStyle} variant="titleLarge">
        Title Large
      </Text>
      <Text style={_textStyle} variant="titleMedium">
        Title Medium
      </Text>
      <Text style={_textStyle} variant="titleSmall">
        Title Small
      </Text>
      <Text style={_textStyle} variant="bodyLarge">
        Body Large
      </Text>
      <Text style={_textStyle} variant="bodyMedium">
        Body Medium
      </Text>
      <Text style={_textStyle} variant="bodySmall">
        Body Small
      </Text>
      <Text style={_textStyle} variant="labelLarge">
        Label Large
      </Text>
      <Text style={_textStyle} variant="labelMedium">
        Label Medium
      </Text>
      <Text style={_textStyle} variant="labelSmall">
        Label Small
      </Text>
    </ScrollView>
  );
}
