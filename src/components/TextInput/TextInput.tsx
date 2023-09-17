// External imports.
import * as React from 'react';
import { withTheme } from 'react-native-paper';
import { set, omit } from 'lodash';

// Types imports.
import type { PropsWithTheme } from './TextInput.types';

// Internal imports.
import styles from './TextInput.styles';
import TopLabel from './TopLabel';
import TextInputInput from './TextInputInput';
import Error from './Error';

const TextInput = React.memo((props: PropsWithTheme): React.ReactElement => {
  const { topLabelProps, errorProps } = props;
  const { marginVertical, marginTop, marginBottom } = props.style ?? {};

  let _inputStyle;

  if (topLabelProps && errorProps) {
    _inputStyle = [
      styles.noVerticalMargin,
      omit(props.style ?? {}, ['marginVertical', 'marginTop', 'marginBottom']),
    ];
  } else if (topLabelProps) {
    _inputStyle = [
      styles.noVerticalMargin,
      omit(props.style ?? {}, ['marginVertical', 'marginTop', 'marginBottom']),
      { marginBottom: marginVertical ?? marginBottom },
    ];
  } else if (errorProps) {
    _inputStyle = [
      styles.noVerticalMargin,
      omit(props.style ?? {}, ['marginVertical', 'marginTop', 'marginBottom']),
      { marginTop: marginVertical ?? marginTop },
    ];
  } else {
    _inputStyle = props.style;
  }

  return (
    <>
      <TopLabel {...props} />
      <TextInputInput {...set(props, 'style', _inputStyle)} />
      <Error {...props} />
    </>
  );
});

export default withTheme(TextInput);
