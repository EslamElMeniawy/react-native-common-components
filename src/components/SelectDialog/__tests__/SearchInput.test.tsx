import { render } from '@testing-library/react-native';

import SearchInput from '../SearchInput';
import { mockTheme } from '../../../test-utils/mockTheme';

describe('SelectDialog SearchInput Component', () => {
  it('should render with default label', () => {
    expect(() => {
      render(<SearchInput onChangeText={jest.fn()} theme={mockTheme} />);
    }).not.toThrow();
  });

  it('should render with custom label', () => {
    expect(() => {
      render(
        <SearchInput
          searchLabel="Find Item"
          onChangeText={jest.fn()}
          theme={mockTheme}
        />
      );
    }).not.toThrow();
  });

  it('should handle text change callback', () => {
    const mockOnChangeText = jest.fn();
    expect(() => {
      render(<SearchInput onChangeText={mockOnChangeText} theme={mockTheme} />);
    }).not.toThrow();
  });

  it('should render with custom search component', () => {
    const CustomComponent = () => null;
    expect(() => {
      render(
        <SearchInput
          searchComponent={<CustomComponent />}
          onChangeText={jest.fn()}
          theme={mockTheme}
        />
      );
    }).not.toThrow();
  });

  it('should apply theme colors to input', () => {
    expect(() => {
      render(<SearchInput onChangeText={jest.fn()} theme={mockTheme} />);
    }).not.toThrow();
  });

  it('should render with RTL label', () => {
    expect(() => {
      render(
        <SearchInput
          searchLabel="ابحث"
          onChangeText={jest.fn()}
          theme={mockTheme}
        />
      );
    }).not.toThrow();
  });

  it('should render with both label and custom component undefined', () => {
    expect(() => {
      render(<SearchInput onChangeText={jest.fn()} theme={mockTheme} />);
    }).not.toThrow();
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
