// External imports.
import * as React from 'react';
import { I18nManager } from 'react-native';

// Types imports.
import type { SearchInputProps } from './SelectDialog.types';
import DefaultInput from '../TextInput/DefaultInput';

const SearchInput = React.memo(
  (props: SearchInputProps): React.ReactElement => {
    const { searchComponent, searchLabel, theme, onChangeText } = props;

    if (searchComponent) {
      return searchComponent;
    }

    const _isArabic =
      (I18nManager.getConstants().localeIdentifier?.indexOf('ar') ?? -1) > -1;

    return (
      <DefaultInput
        mode="outlined"
        label={searchLabel ?? (_isArabic ? 'ابحث عن' : 'Look for')}
        onChangeText={onChangeText}
        style={{ backgroundColor: theme.colors.surface }}
      />
    );
  }
);

export default SearchInput;
