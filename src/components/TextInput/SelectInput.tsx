// External imports.
import * as React from 'react';

// Types imports.
import type { PropsWithTheme, SelectInputState } from './TextInput.types';

// Internal imports.
// import DefaultInput from './DefaultInput';
// import SelectInput from './SelectInput';

class SelectInput extends React.PureComponent<
  PropsWithTheme,
  SelectInputState
> {
  // Variable for mount state.
  _isComponentMounted: boolean = false;

  constructor(props: PropsWithTheme) {
    super(props);

    this.state = {
      isSelectVisible: false,
      value: props.value || '',
      selectedItems: props.selectProps?.selectedItems,
    };
  }
}

export default SelectInput;
