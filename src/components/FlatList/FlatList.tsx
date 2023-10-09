// External imports.
import * as React from 'react';
import {
  FlatList as NativeFlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { withTheme } from 'react-native-paper';

// Types imports.
import type { PropsWithTheme } from './FlatList.types';

// Internal imports.
import styles from './FlatList.styles';

const FlatList = React.memo((props: PropsWithTheme): React.ReactElement => {
  const {
    refreshing,
    onRefresh,
    refreshColor,
    showsHorizontalScrollIndicator,
    showsVerticalScrollIndicator,
    horizontal,
    keyboardShouldPersistTaps,
    keyboardDismissMode,
    keyExtractor,
    onEndReachedThreshold,
    style,
    contentContainerStyle,
    refreshControl,
    theme,
    ...other
  } = props;

  return (
    <NativeFlatList
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator ?? false}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator ?? false}
      horizontal={horizontal}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps ?? 'handled'}
      keyboardDismissMode={keyboardDismissMode ?? 'none'}
      keyExtractor={
        keyExtractor === undefined ? (item) => item.key : keyExtractor
      }
      onEndReachedThreshold={
        onEndReachedThreshold == null || onEndReachedThreshold === undefined
          ? 0.01
          : onEndReachedThreshold
      }
      style={StyleSheet.compose(styles.list, style)}
      contentContainerStyle={
        horizontal
          ? StyleSheet.compose(
              styles.horizontalContainerStyle,
              contentContainerStyle
            )
          : contentContainerStyle
      }
      refreshing={refreshing}
      refreshControl={
        refreshControl ?? onRefresh ? (
          <RefreshControl
            colors={refreshColor ? [refreshColor] : [theme.colors.primary]}
            tintColor={refreshColor ?? theme.colors.primary}
            refreshing={refreshing ?? false}
            onRefresh={onRefresh ?? undefined}
          />
        ) : undefined
      }
      {...other}
    />
  );
});

export default withTheme(FlatList);
