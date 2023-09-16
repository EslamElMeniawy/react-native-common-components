// External imports.
import * as React from 'react';
import { TextInput } from 'react-native-paper';
import { omit } from 'lodash';

// Types imports.
import type { SelectInputInputProps } from './TextInput.types';

// Internal imports.
import styles from './TextInput.styles';
import DefaultInput from './DefaultInput';
import { trimStringToLength } from '../../utils';

const SelectInputInput = React.memo(
  (props: SelectInputInputProps): React.ReactElement => {
    const { value, selectProps, right, style, ...other } = props;
    const _inputProps = omit(other, ['editable', 'value']);

    return (
      <DefaultInput
        editable={false}
        value={trimStringToLength(value, selectProps?.trimLength)}
        right={
          right == null || right === undefined ? (
            <TextInput.Icon icon="menu-down" />
          ) : (
            right
          )
        }
        style={[
          styles.noVerticalMargin,
          omit(style ?? {}, [
            'marginVertical',
            'marginTop',
            'marginBottom',
            'width',
          ]),
        ]}
        {..._inputProps}
      />
    );
  }
);

export default SelectInputInput;
