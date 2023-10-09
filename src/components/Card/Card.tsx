// External imports.
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { withTheme, Card as PaperCard } from 'react-native-paper';

// Types imports.
import type { PropsWithTheme } from './Card.types';

// Internal imports.
import styles from './Card.styles';

const Card = React.memo((props: PropsWithTheme): React.ReactElement => {
  const { style, ...other } = props;

  return (
    <PaperCard style={StyleSheet.compose(styles.card, style)} {...other} />
  );
});

export default withTheme(Card);
