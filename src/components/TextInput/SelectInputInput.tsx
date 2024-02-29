// External imports.
import * as React from 'react';
import { StyleSheet } from 'react-native';
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
        right={right ?? <TextInput.Icon icon="menu-down" />}
        style={StyleSheet.flatten([
          styles.noVerticalMargin,
          styles.selectInputInput,
          omit(style ?? {}, [
            'marginVertical',
            'marginTop',
            'marginBottom',
            'width',
          ]),
        ])}
        {..._inputProps}
      />
    );
  }
);

export default SelectInputInput;
