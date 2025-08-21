// External imports.
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { withTheme, Text as PaperText } from 'react-native-paper';

// Types imports.
import type { PropsWithTheme } from './Text.types';

// Internal imports.
import ResponsiveDimensions from '../../utils/ResponsiveDimensions';

const Text = React.memo((props: PropsWithTheme): React.ReactElement => {
  const { size, type, variant, style, children, theme, ...other } = props;

  const _calculateTextSize = () => {
    switch (type) {
      case 'caption':
        return ResponsiveDimensions.ms(11);
      case 'bold':
        return ResponsiveDimensions.ms(15);
      default:
        return ResponsiveDimensions.ms(13);
    }
  };

  const _calculateFontSize = () => {
    if (size) {
      return ResponsiveDimensions.ms(size);
    }

    if (variant && theme.isV3) {
      return theme.fonts[variant].fontSize;
    }

    return _calculateTextSize();
  };

  const _fontSize = _calculateFontSize();

  const _calculateLineHeight = () => {
    if (variant && theme.isV3) {
      return theme.fonts[variant].lineHeight;
    }

    return _fontSize * 2;
  };

  const _textStyle = StyleSheet.flatten([
    {
      fontSize: _fontSize,
      lineHeight: _calculateLineHeight(),
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
      return (
        <PaperText style={_textStyle} variant="bodySmall" {...other}>
          {children}
        </PaperText>
      );

    case 'bold':
      return (
        <PaperText style={_textStyle} variant="titleLarge" {...other}>
          {children}
        </PaperText>
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
