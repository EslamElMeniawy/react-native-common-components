// Mock implementation of PaperTextInput for testing
import * as React from 'react';
import { TextInput as RNTextInput } from 'react-native';

const TextInput = React.forwardRef<any, any>((props, ref) => {
  return <RNTextInput {...props} ref={ref} />;
});

TextInput.displayName = 'TextInput';

export default TextInput;
