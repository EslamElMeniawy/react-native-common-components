// Mock implementation of PaperRadioButton for testing
import * as React from 'react';
import { View } from 'react-native';

interface RadioButtonProps {
  value: string;
  status?: 'checked' | 'unchecked';
  disabled?: boolean;
  onPress?: () => void;
  color?: string;
  uncheckedColor?: string;
  testID?: string;
}

const RadioButtonAndroid: React.FC<RadioButtonProps> = ({
  testID,
  onPress,
}) => {
  return <View testID={testID} onTouchEnd={onPress} />;
};

export default {
  Android: RadioButtonAndroid,
};
