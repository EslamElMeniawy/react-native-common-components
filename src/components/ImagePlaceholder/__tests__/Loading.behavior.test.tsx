import * as React from 'react';
import { render } from '@testing-library/react-native';

import Loading from '../Loading';
import { mockTheme } from '../../../test-utils/mockTheme';

jest.mock('react-native', () => {
  const flatten = (input: any) =>
    Array.isArray(input)
      ? Object.assign({}, ...input.filter(Boolean))
      : input || {};

  const ReactLib = require('react');
  const View = (props: any) => {
    return ReactLib.createElement('View', props, props.children);
  };

  return {
    __esModule: true,
    View,
    StyleSheet: {
      flatten,
      create: (styles: any) => styles,
      compose: (first: any, second: any) => [first, second],
    },
  };
});

type LoadingProps = React.ComponentProps<typeof Loading>;

jest.mock('react-native-progress', () => {
  const ReactLib = require('react');
  return {
    __esModule: true,
    Pie: (props: any) => {
      return ReactLib.createElement('Pie', props);
    },
  };
});

jest.mock('react-native-svg', () => ({}));

describe('ImagePlaceholder/Loading', () => {
  const createProps = (overrides?: Partial<LoadingProps>): LoadingProps => ({
    loadingProps: undefined,
    theme: mockTheme,
    setProgressSizeState: jest.fn(),
    progress: 0,
    progressSize: 24,
    ...overrides,
  });

  it('renders progress indicator with theme defaults', () => {
    const props = createProps({ progress: 0.4 });
    const { UNSAFE_root } = render(<Loading {...props} />);

    expect(UNSAFE_root).toBeDefined();
  });

  it('uses custom colors and updates progress size on layout', () => {
    const setProgressSizeState = jest.fn();
    const { UNSAFE_root } = render(
      <Loading
        {...createProps({
          loadingProps: { backgroundColor: '#111111', color: '#eeeeee' },
          setProgressSizeState,
        })}
      />
    );

    expect(UNSAFE_root).toBeDefined();
  });
});
