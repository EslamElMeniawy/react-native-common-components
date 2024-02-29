// External imports.
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { omit } from 'lodash';
import { ms } from 'react-native-size-matters';

// Types imports.
import type { Props } from './TextInput.types';

// Internal imports.
import styles from './TextInput.styles';

const getLabel = (props: Props): undefined | string | React.ReactElement => {
  const { topLabelProps, isRequired, label } = props;

  if (topLabelProps) {
    return undefined;
  }

  if (label && typeof label === 'string') {
    return isRequired ? `${label} *` : label;
  }

  return label;
};

const getPlaceholder = (props: Props): undefined | string => {
  const { isRequired, placeholder } = props;
  return placeholder && isRequired ? `${placeholder} *` : placeholder;
};

const DefaultInput = React.memo((props: Props): React.ReactElement => {
  const {
    dense,
    autoCapitalize,
    autoCorrect,
    error,
    errorProps,
    multiline,
    numberOfLines,
    returnKeyType,
    style,
    keyboardType,
    onChangeText,
    secureTextEntry,
    positiveNumbersOnly,
    hasPasswordToggle,
    ...other
  } = props;

  const _newProps = omit(other, [
    'topLabelProps',
    'isRequired',
    'label',
    'placeholder',
    'blurOnSubmit',
    'scrollEnabled',
  ]);

  const _label = getLabel(props);
  let _height;

  if (!multiline) {
    if (_label) {
      if (props.mode === 'outlined') {
        _height = ms(35);
      } else {
        _height = ms(45);
      }
    } else {
      _height = ms(35);
    }
  }

  const _isPassword = secureTextEntry === true || hasPasswordToggle === true;
  const _defaultNumberOfLines = multiline ? 0 : 1;

  const _handleTextChange: ((text: string) => void) & Function = (
    text: string
  ) => {
    let editedText = text;

    if (
      keyboardType === 'decimal-pad' ||
      keyboardType === 'number-pad' ||
      keyboardType === 'name-phone-pad' ||
      keyboardType === 'numbers-and-punctuation' ||
      keyboardType === 'numeric' ||
      keyboardType === 'phone-pad'
    ) {
      editedText = editedText
        .replaceAll('٠', '0')
        .replaceAll('١', '1')
        .replaceAll('٢', '2')
        .replaceAll('٣', '3')
        .replaceAll('٤', '4')
        .replaceAll('٥', '5')
        .replaceAll('٦', '6')
        .replaceAll('٧', '7')
        .replaceAll('٨', '8')
        .replaceAll('٩', '9');
    }

    if (positiveNumbersOnly) {
      editedText = editedText.replace(/[^0-9]/g, '');
    }

    onChangeText?.(editedText);
  };

  return (
    <TextInput
      dense={dense ?? true}
      autoCapitalize={autoCapitalize ?? 'none'}
      autoCorrect={autoCorrect ?? false}
      error={errorProps?.errorMessage ? true : error}
      label={_label}
      placeholder={getPlaceholder(props)}
      multiline={!_isPassword}
      numberOfLines={_isPassword ? 1 : numberOfLines ?? _defaultNumberOfLines}
      blurOnSubmit={!multiline}
      returnKeyType={returnKeyType ?? 'done'}
      style={StyleSheet.flatten([
        styles.input,
        { height: _height, minHeight: multiline ? ms(70) : undefined },
        style,
      ])}
      keyboardType={keyboardType}
      onChangeText={_handleTextChange}
      secureTextEntry={secureTextEntry}
      scrollEnabled={_isPassword ? false : Boolean(multiline)}
      {..._newProps}
    />
  );
});

export default DefaultInput;
