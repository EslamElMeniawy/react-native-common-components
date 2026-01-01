// External imports.
import * as React from 'react';
import { Checkbox as PaperCheckbox } from 'react-native-paper';

// Types imports.
interface CheckboxProps {
  status: 'checked' | 'unchecked' | 'indeterminate';
  disabled?: boolean;
  onPress?: () => void;
  color?: string;
  uncheckedColor?: string;
  testID?: string;
}

/**
 * Wrapper around react-native-paper Checkbox for testability.
 * This can be mocked in tests while maintaining the same API.
 */
const CheckboxAndroid: React.FC<CheckboxProps> = (props) => {
  return <PaperCheckbox.Android {...props} />;
};

export default {
  Android: CheckboxAndroid,
};
