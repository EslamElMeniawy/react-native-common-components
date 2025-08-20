// External imports.
import * as React from 'react';
import { I18nManager } from 'react-native';

// Types imports.
import type { NoDataProps } from './SelectDialog.types';
import { Text } from '@src/components/Text';

// Internal imports.
import styles from './SelectDialog.styles';

const NoData = React.memo((props: NoDataProps): React.ReactElement => {
  const { noDataMessage, noDataComponent } = props;

  if (noDataComponent) {
    return noDataComponent;
  }

  const _isArabic =
    (I18nManager.getConstants().localeIdentifier?.indexOf('ar') ?? -1) > -1;

  return (
    <Text style={styles.noDataText} size={15}>
      {noDataMessage ?? (_isArabic ? 'لا تتوافر بيانات!' : 'No data available')}
    </Text>
  );
});

export default NoData;
