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
import { trimStringToLength } from '../../utils/StringUtils';

const SelectInputInput = React.memo<SelectInputInputProps>(
  (props: SelectInputInputProps): React.ReactElement => {
    const { value, selectProps, right, onPress, style, ...other } = props;
    const _inputProps = omit(other, ['editable', 'value']);

    return (
      <DefaultInput
        onPress={onPress}
        editable={false}
        value={trimStringToLength(value, selectProps?.trimLength)}
        right={right ?? <TextInput.Icon icon="menu-down" onPress={onPress} />}
        style={
          StyleSheet.flatten([
            styles.noVerticalMargin,
            styles.selectInputInput,
            omit(style ?? {}, [
              'marginVertical',
              'marginTop',
              'marginBottom',
              'width',
            ]),
          ]) ?? undefined
        }
        {..._inputProps}
      />
    );
  }
);

export default SelectInputInput;
