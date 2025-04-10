// External imports.
import * as React from 'react';

// Types imports.
import type SelectItem from '../../types/SelectItem';
import type { MD2Theme, MD3Theme } from 'react-native-paper';

export interface Props {
  items?: SelectItem[];
  selectedItems?: SelectItem[];
  allowMultiSelect?: boolean;
  onItemsSelected?: (selectedItems?: SelectItem[]) => void;
  visible?: boolean;
  onDismiss?: () => void;
  searchLabel?: string;
  searchComponent?: React.ReactElement;
  noDataMessage?: string;
  noDataComponent?: React.ReactElement;
  closeText?: string;
}

export interface PropsWithTheme extends Props {
  theme: MD2Theme | MD3Theme;
}

export interface SearchInputProps {
  searchLabel?: string;
  searchComponent?: React.ReactElement;
  theme: MD2Theme | MD3Theme;
  onChangeText: ((text: string) => void) & Function;
}

export interface NoDataProps {
  noDataMessage?: string;
  noDataComponent?: React.ReactElement;
}

export interface ListProps {
  items: SelectItem[];
  theme: MD2Theme | MD3Theme;
  onItemPressed: (item: SelectItem) => void;
  isItemSelected: (item: SelectItem) => boolean;
}
