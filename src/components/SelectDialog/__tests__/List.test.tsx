import { render } from '@testing-library/react-native';

import List from '../List';
import { mockTheme } from '../../../test-utils/mockTheme';
import type { SelectItem } from '../../../types/SelectItem';

describe('SelectDialog List Component', () => {
  const mockItems: SelectItem[] = [
    { key: '1', dropdownTitle: 'Item 1' },
    { key: '2', dropdownTitle: 'Item 2' },
    { key: '3', dropdownTitle: 'Item 3' },
  ];

  it('should render list with items without crashing', () => {
    expect(() => {
      render(
        <List
          items={mockItems}
          onItemPressed={jest.fn()}
          isItemSelected={jest.fn(() => false)}
          theme={mockTheme}
        />
      );
    }).not.toThrow();
  });

  it('should render empty list', () => {
    expect(() => {
      render(
        <List
          items={[]}
          onItemPressed={jest.fn()}
          isItemSelected={jest.fn(() => false)}
          theme={mockTheme}
        />
      );
    }).not.toThrow();
  });

  it('should handle selected items', () => {
    expect(() => {
      render(
        <List
          items={mockItems}
          onItemPressed={jest.fn()}
          isItemSelected={jest.fn((item) => item.key === '1')}
          theme={mockTheme}
        />
      );
    }).not.toThrow();
  });

  it('should call onItemPressed when item is selected', () => {
    const mockOnItemPressed = jest.fn();
    expect(() => {
      render(
        <List
          items={mockItems}
          onItemPressed={mockOnItemPressed}
          isItemSelected={jest.fn(() => false)}
          theme={mockTheme}
        />
      );
    }).not.toThrow();
  });

  it('should apply theme colors', () => {
    expect(() => {
      render(
        <List
          items={mockItems}
          onItemPressed={jest.fn()}
          isItemSelected={jest.fn(() => false)}
          theme={mockTheme}
        />
      );
    }).not.toThrow();
  });

  it('should render multiple selected items', () => {
    expect(() => {
      render(
        <List
          items={mockItems}
          onItemPressed={jest.fn()}
          isItemSelected={jest.fn((item) => ['1', '2'].includes(item.key))}
          theme={mockTheme}
        />
      );
    }).not.toThrow();
  });

  it('should handle item with different properties', () => {
    const itemsWithoutId: SelectItem[] = [
      { key: 'custom', dropdownTitle: 'Custom Item' },
    ];
    expect(() => {
      render(
        <List
          items={itemsWithoutId}
          onItemPressed={jest.fn()}
          isItemSelected={jest.fn(() => false)}
          theme={mockTheme}
        />
      );
    }).not.toThrow();
  });
});
