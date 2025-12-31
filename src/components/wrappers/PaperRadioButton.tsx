// External imports.
import * as React from 'react';
import { RadioButton as PaperRadioButton } from 'react-native-paper';

// Types imports.
interface RadioButtonProps {
  value: string;
  status?: 'checked' | 'unchecked';
  disabled?: boolean;
  onPress?: () => void;
  color?: string;
  uncheckedColor?: string;
  testID?: string;
}

/**
 * Wrapper around react-native-paper RadioButton for testability.
 * This can be mocked in tests while maintaining the same API.
 */
const RadioButtonAndroid: React.FC<RadioButtonProps> = (props) => {
  return <PaperRadioButton.Android {...props} />;
};

export default {
  Android: RadioButtonAndroid,
};
