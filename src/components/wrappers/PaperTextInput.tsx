// External imports.
import * as React from 'react';
import { TextInput as PaperTextInput } from 'react-native-paper';
import type { TextInputProps as PaperTextInputProps } from 'react-native-paper';

/**
 * Wrapper around react-native-paper TextInput for testability.
 * This can be mocked in tests while maintaining the same API.
 */
const TextInput = React.forwardRef<any, PaperTextInputProps>((props, ref) => {
  return <PaperTextInput {...props} ref={ref} />;
});

TextInput.displayName = 'TextInput';

export default TextInput;
