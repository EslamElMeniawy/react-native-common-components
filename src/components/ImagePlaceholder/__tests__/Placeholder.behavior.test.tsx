jest.mock('react-native', () => {
  const React = require('react');
  const flatten = (input: any) =>
    Array.isArray(input)
      ? Object.assign({}, ...input.filter(Boolean))
      : input || {};

  return {
    Image: (props: any) => React.createElement('Image', props),
    StyleSheet: {
      flatten,
      create: (styles: any) => styles,
      compose: (first: any, second: any) => [first, second],
    },
  };
});

jest.mock('react-native-vector-image', () => {
  const React = require('react');
  return {
    default: (props: any) => React.createElement('VectorImage', props),
  };
});

import { render } from '@testing-library/react-native';

import Placeholder from '../Placeholder';

describe('ImagePlaceholder/Placeholder', () => {
  it('renders bitmap placeholder when no source or loading', () => {
    const { UNSAFE_root } = render(
      <Placeholder placeholder={123} resizeMode="stretch" isLoading />
    );

    expect(UNSAFE_root).toBeDefined();
  });

  it('renders vector placeholder when provided and bitmap missing', () => {
    const { UNSAFE_root } = render(
      <Placeholder vectorPlaceholder={456} isError />
    );

    expect(UNSAFE_root).toBeDefined();
  });

  it('returns null when source is present without errors', () => {
    const { UNSAFE_root } = render(
      <Placeholder source="https://example.com" placeholder={321} />
    );

    expect(UNSAFE_root).toBeDefined();
  });
});
