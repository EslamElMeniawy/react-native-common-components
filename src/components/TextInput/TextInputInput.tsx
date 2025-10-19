// External imports.
import * as React from 'react';
import { omit } from 'lodash';

// Types imports.
import type { PropsWithTheme } from './TextInput.types';

// Internal imports.
import DefaultInput from './DefaultInput';
import SelectInput from './SelectInput';

const TextInputInput = React.memo(
  (props: PropsWithTheme): React.ReactElement => {
    const { selectProps, ...other } = props;

    if (selectProps) {
      return <SelectInput {...props} />;
    }

    return <DefaultInput {...omit(other, ['theme'])} />;
  }
);

export default TextInputInput;
