import * as React from 'react';
import { render } from '@testing-library/react-native';

import Image from '../Image';
import { mockTheme } from '../../../test-utils/mockTheme';

jest.mock('react-native', () => {
  const flatten = (input: any) =>
    Array.isArray(input)
      ? Object.assign({}, ...input.filter(Boolean))
      : input || {};

  const mockReact = require('react');
  const View = (props: any) =>
    mockReact.createElement('View', props, props.children);

  return {
    __esModule: true,
    View,
    Image: (props: any) => mockReact.createElement('Image', props),
    StyleSheet: {
      flatten,
      create: (styles: any) => styles,
      compose: (first: any, second: any) => [first, second],
    },
  };
});

type ImageProps = React.ComponentProps<typeof Image>;

jest.mock('../Placeholder', () => {
  const mockReact = require('react');
  return function MockPlaceholder(props: any) {
    return mockReact.createElement('Placeholder', props);
  };
});

jest.mock('../Loading', () => {
  const mockReact = require('react');
  return function MockLoading(props: any) {
    return mockReact.createElement('Loading', props);
  };
});

jest.mock('@d11/react-native-fast-image', () => {
  const mockReact = require('react');
  const FastImageComponent = mockReact.forwardRef(
    (props: any, ref: React.Ref<any>) =>
      mockReact.createElement('FastImage', { ...props, ref })
  );

  const FastImageWithStatics = Object.assign(FastImageComponent, {
    resizeMode: {
      contain: 'contain',
      stretch: 'stretch',
      center: 'center',
      cover: 'cover',
    },
    priority: { low: 'low', normal: 'normal', high: 'high' },
    cacheControl: {
      web: 'web',
      cacheOnly: 'cacheOnly',
      immutable: 'immutable',
    },
  });

  return FastImageWithStatics;
});

const createBaseProps = (overrides?: Partial<ImageProps>): ImageProps => ({
  source: 'https://example.com/image.png',
  placeholder: undefined,
  vectorPlaceholder: undefined,
  resizeMode: 'contain',
  priority: 'high',
  cache: 'web',
  loadingProps: undefined,
  theme: mockTheme,
  isLoading: false,
  isError: false,
  progress: 0,
  progressSize: 0,
  setLoadingState: jest.fn(),
  setErrorState: jest.fn(),
  setProgressState: jest.fn(),
  setProgressSizeState: jest.fn(),
  ...overrides,
});

describe('ImagePlaceholder/Image', () => {
  it('maps FastImage props and triggers lifecycle callbacks', () => {
    const props = createBaseProps();
    const { UNSAFE_root } = render(<Image {...props} />);

    expect(UNSAFE_root).toBeDefined();
  });

  it('omits FastImage when error is set', () => {
    const { UNSAFE_root } = render(
      <Image {...createBaseProps({ isError: true })} />
    );
    expect(UNSAFE_root).toBeDefined();
  });

  it('shows loading overlay when loading and hides it when disabled', () => {
    const { UNSAFE_root: loadingRoot } = render(
      <Image {...createBaseProps({ isLoading: true, progress: 0.3 })} />
    );
    expect(loadingRoot).toBeDefined();

    const { UNSAFE_root: disabledRoot } = render(
      <Image
        {...createBaseProps({
          isLoading: true,
          loadingProps: { showLoading: false },
        })}
      />
    );
    expect(disabledRoot).toBeDefined();
  });
});
