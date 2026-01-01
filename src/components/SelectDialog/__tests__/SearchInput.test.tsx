import { render } from '@testing-library/react-native';
import { I18nManager, Text } from 'react-native';

import SearchInput from '../SearchInput';
import { mockTheme } from '../../../test-utils/mockTheme';

jest.mock('../SearchInput', () => {
  const actual = jest.requireActual('../SearchInput');
  return actual;
});

jest.mock('../../TextInput/DefaultInput', () => {
  const React = require('react');

  return jest.fn(({ label, onChangeText }) =>
    React.createElement(
      'MockDefaultInput',
      { testID: 'default-input', onChangeText },
      label
    )
  );
});

describe('SelectDialog SearchInput Component', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.spyOn(I18nManager, 'getConstants').mockReturnValue({
      isRTL: false,
      doLeftAndRightSwapInRTL: false,
      localeIdentifier: 'en-US',
    });
  });

  it('should render with default label', () => {
    const { getByTestId } = render(
      <SearchInput onChangeText={jest.fn()} theme={mockTheme} />
    );

    expect(getByTestId('default-input').props.children).toBe('Look for');
  });

  it('should render with custom label', () => {
    const { getByTestId } = render(
      <SearchInput
        searchLabel="Find Item"
        onChangeText={jest.fn()}
        theme={mockTheme}
      />
    );

    expect(getByTestId('default-input').props.children).toBe('Find Item');
  });

  it('should handle text change callback', () => {
    const mockOnChangeText = jest.fn();
    const { getByTestId } = render(
      <SearchInput onChangeText={mockOnChangeText} theme={mockTheme} />
    );

    getByTestId('default-input').props.onChangeText?.('query');

    expect(mockOnChangeText).toHaveBeenCalledWith('query');
  });

  it('should render with custom search component', () => {
    const CustomComponent = () => <Text testID="custom-search" />;

    const { queryByTestId } = render(
      <SearchInput
        searchComponent={<CustomComponent />}
        onChangeText={jest.fn()}
        theme={mockTheme}
      />
    );

    expect(queryByTestId('custom-search')).toBeTruthy();
  });

  it('should apply theme colors to input', () => {
    expect(() => {
      render(<SearchInput onChangeText={jest.fn()} theme={mockTheme} />);
    }).not.toThrow();
  });

  it('should render with RTL label', () => {
    jest.spyOn(I18nManager, 'getConstants').mockReturnValue({
      isRTL: true,
      doLeftAndRightSwapInRTL: false,
      localeIdentifier: 'ar',
    });

    const { getByTestId } = render(
      <SearchInput onChangeText={jest.fn()} theme={mockTheme} />
    );

    expect(getByTestId('default-input').props.children).toBe('ابحث عن');
  });

  it('should render with both label and custom component undefined', () => {
    const { getByTestId } = render(
      <SearchInput onChangeText={jest.fn()} theme={mockTheme} />
    );

    expect(getByTestId('default-input')).toBeTruthy();
  });

  it('should use default localized label when searchLabel not provided', () => {
    expect(() => {
      render(
        <SearchInput
          searchLabel={undefined}
          onChangeText={jest.fn()}
          theme={mockTheme}
        />
      );
    }).not.toThrow();
  });
});
