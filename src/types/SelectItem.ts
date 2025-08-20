// Types import.
import type { FlatListItem } from './FlatListItem';

export type SelectItem<T = {}> = FlatListItem<
  {
    dropdownTitle?: string;
  } & T
>;
