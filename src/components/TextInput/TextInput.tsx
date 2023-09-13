// External imports.
import * as React from 'react';
import { withTheme } from 'react-native-paper';
import { set, omit } from 'lodash';

// Types imports.
import type { PropsWithTheme } from './TextInput.types';

// Internal imports.
import styles from './TextInput.styles';
import TopLabel from './TopLabel';
import Input from './Input';
import Error from './Error';

const TextInput = React.memo((props: PropsWithTheme): React.ReactElement => {
  const { topLabelProps, errorProps } = props;
  const { marginVertical, marginTop, marginBottom } = props.style ?? {};

  let inputStyle;

  if (topLabelProps && errorProps) {
    inputStyle = [
      styles.noVerticalMargin,
      omit(props.style ?? {}, ['marginVertical', 'marginTop', 'marginBottom']),
    ];
  } else if (topLabelProps) {
    inputStyle = [
      styles.noVerticalMargin,
      omit(props.style ?? {}, ['marginVertical', 'marginTop', 'marginBottom']),
      { marginBottom: marginVertical ?? marginBottom },
    ];
  } else if (errorProps) {
    inputStyle = [
      styles.noVerticalMargin,
      omit(props.style ?? {}, ['marginVertical', 'marginTop', 'marginBottom']),
      { marginTop: marginVertical ?? marginTop },
    ];
  } else {
    inputStyle = props.style;
  }

  return (
    <>
      <TopLabel {...props} />
      <Input {...set(props, 'style', inputStyle)} />
      <Error {...props} />
    </>
  );
});

export default withTheme(TextInput);
