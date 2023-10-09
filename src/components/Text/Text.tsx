// External imports.
import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  withTheme,
  Text as PaperText,
  Title,
  Caption,
} from 'react-native-paper';
import { ms } from 'react-native-size-matters';

// Types imports.
import type { PropsWithTheme } from './Text.types';

const Text = React.memo((props: PropsWithTheme): React.ReactElement => {
  const { size, type, variant, style, children, theme, ...other } = props;
  let _textSize: number = 13;

  switch (type) {
    case 'caption':
      _textSize = 11;
      break;

    case 'bold':
      _textSize = 15;
      break;

    default:
      _textSize = 13;
      break;
  }

  const _textStyle = StyleSheet.flatten([
    {
      fontSize:
        (size == null || size === undefined) &&
        (variant == null || variant === undefined)
          ? ms(_textSize)
          : size
          ? ms(size)
          : variant && theme.isV3
          ? theme.fonts[variant].fontSize
          : undefined,
      lineHeight:
        (size == null || size === undefined) &&
        (variant == null || variant === undefined)
          ? ms(_textSize) * 2
          : size
          ? ms(size) * 2
          : variant && theme.isV3
          ? theme.fonts[variant].lineHeight
          : undefined,
    },
    style,
  ]);

  if (variant) {
    return (
      <PaperText style={_textStyle} variant={variant} {...other}>
        {children}
      </PaperText>
    );
  }

  switch (type) {
    case 'caption':
      return theme.isV3 ? (
        <PaperText style={_textStyle} variant="bodySmall" {...other}>
          {children}
        </PaperText>
      ) : (
        <Caption style={_textStyle} {...other}>
          {children}
        </Caption>
      );

    case 'bold':
      return theme.isV3 ? (
        <PaperText style={_textStyle} variant="titleMedium" {...other}>
          {children}
        </PaperText>
      ) : (
        <Title style={_textStyle} {...other}>
          {children}
        </Title>
      );

    default:
      return (
        <PaperText style={_textStyle} variant="bodyMedium" {...other}>
          {children}
        </PaperText>
      );
  }
});

export default withTheme(Text);
