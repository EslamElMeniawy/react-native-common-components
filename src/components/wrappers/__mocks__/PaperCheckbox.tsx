// Mock implementation of PaperCheckbox for testing
import * as React from 'react';
import { View } from 'react-native';

interface CheckboxProps {
  status: 'checked' | 'unchecked' | 'indeterminate';
  disabled?: boolean;
  onPress?: () => void;
  color?: string;
  uncheckedColor?: string;
  testID?: string;
}

const CheckboxAndroid: React.FC<CheckboxProps> = ({ testID, onPress }) => {
  return <View testID={testID} onTouchEnd={onPress} />;
};

export default {
  Android: CheckboxAndroid,
};
