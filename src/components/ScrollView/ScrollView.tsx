// External imports.
import * as React from 'react';
import { RefreshControl } from 'react-native';
import { withTheme } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

// Types imports.
import type { PropsWithTheme } from './ScrollView.types';

// Internal imports.
import ResponsiveDimensions from '../../utils/ResponsiveDimensions';

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
    extraKeyboardSpace,
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
        (refreshControl ?? onRefresh) ? (
          <RefreshControl
            colors={refreshColor ? [refreshColor] : [theme.colors.primary]}
            tintColor={refreshColor ?? theme.colors.primary}
            refreshing={refreshing ?? false}
            onRefresh={onRefresh}
          />
        ) : undefined
      }
      extraKeyboardSpace={extraKeyboardSpace ?? ResponsiveDimensions.vs(8)}
      {...other}
    />
  );
});

export default withTheme(ScrollView);
