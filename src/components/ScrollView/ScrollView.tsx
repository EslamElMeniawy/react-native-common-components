// External imports.
import * as React from 'react';
import { RefreshControl } from 'react-native';
import { withTheme } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Types imports.
import type { PropsWithTheme } from './ScrollView.types';

const ScrollView = React.memo((props: PropsWithTheme): React.ReactElement => {
  const {
    refreshing,
    onRefresh,
    refreshColor,
    showsHorizontalScrollIndicator,
    showsVerticalScrollIndicator,
    keyboardShouldPersistTaps,
    keyboardDismissMode,
    refreshControl,
    enableOnAndroid,
    theme,
    ...other
  } = props;

  return (
    <KeyboardAwareScrollView
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator ?? false}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator ?? false}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps ?? 'handled'}
      keyboardDismissMode={keyboardDismissMode ?? 'none'}
      refreshControl={
        refreshControl ?? onRefresh ? (
          <RefreshControl
            colors={refreshColor ? [refreshColor] : [theme.colors.primary]}
            tintColor={refreshColor ?? theme.colors.primary}
            refreshing={refreshing ?? false}
            onRefresh={onRefresh}
          />
        ) : undefined
      }
      enableOnAndroid={
        enableOnAndroid == null || enableOnAndroid === undefined
          ? true
          : enableOnAndroid
      }
      {...other}
    />
  );
});

export default withTheme(ScrollView);
