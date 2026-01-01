import { SelectDialogComponent } from '../SelectDialog';
import { mockTheme } from '../../../test-utils/mockTheme';

// Mock SafeAreaView
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: any) => children,
}));

describe('SelectDialog Component', () => {
  it('should accept visible prop', () => {
    const component = (
      <SelectDialogComponent theme={mockTheme} visible={true} />
    );
    expect(component.props.visible).toBe(true);
  });

  it('should accept onDismiss handler', () => {
    const onDismiss = jest.fn();
    const component = (
      <SelectDialogComponent
        theme={mockTheme}
        visible={true}
        onDismiss={onDismiss}
      />
    );
    expect(component.props.onDismiss).toBe(onDismiss);
  });

  it('should accept items prop', () => {
    const items = [
      { key: '1', label: 'Item 1' },
      { key: '2', label: 'Item 2' },
    ];
    const component = (
      <SelectDialogComponent theme={mockTheme} visible={true} items={items} />
    );
    expect(component.props.items).toBe(items);
  });

  it('should accept selectedItems prop', () => {
    const selectedItems = [{ key: '1', label: 'Item 1' }];
    const component = (
      <SelectDialogComponent
        theme={mockTheme}
        visible={true}
        selectedItems={selectedItems}
      />
    );
    expect(component.props.selectedItems).toBe(selectedItems);
  });

  it('should accept allowMultiSelect prop', () => {
    const component = (
      <SelectDialogComponent
        theme={mockTheme}
        visible={true}
        allowMultiSelect={true}
      />
    );
    expect(component.props.allowMultiSelect).toBe(true);
  });

  it('should accept onItemsSelected handler', () => {
    const onItemsSelected = jest.fn();
    const component = (
      <SelectDialogComponent
        theme={mockTheme}
        visible={true}
        onItemsSelected={onItemsSelected}
      />
    );
    expect(component.props.onItemsSelected).toBe(onItemsSelected);
  });

  it('should accept searchLabel prop', () => {
    const component = (
      <SelectDialogComponent
        theme={mockTheme}
        visible={true}
        searchLabel="Search items"
      />
    );
    expect(component.props.searchLabel).toBe('Search items');
  });

  it('should accept noDataMessage prop', () => {
    const component = (
      <SelectDialogComponent
        theme={mockTheme}
        visible={true}
        noDataMessage="No items"
      />
    );
    expect(component.props.noDataMessage).toBe('No items');
  });

  it('should accept closeText prop', () => {
    const component = (
      <SelectDialogComponent
        theme={mockTheme}
        visible={true}
        closeText="Close"
      />
    );
    expect(component.props.closeText).toBe('Close');
  });

  it('should accept multiple props', () => {
    const onDismiss = jest.fn();
    const onItemsSelected = jest.fn();
    const items = [{ key: '1', label: 'Item 1' }];
    const component = (
      <SelectDialogComponent
        theme={mockTheme}
        visible={true}
        items={items}
        onDismiss={onDismiss}
        onItemsSelected={onItemsSelected}
        allowMultiSelect={false}
        searchLabel="Find"
        noDataMessage="Empty"
        closeText="Done"
      />
    );
    expect(component.props.visible).toBe(true);
    expect(component.props.items).toBe(items);
    expect(component.props.onDismiss).toBe(onDismiss);
    expect(component.props.onItemsSelected).toBe(onItemsSelected);
  });

  it('should work without optional props', () => {
    const component = <SelectDialogComponent theme={mockTheme} />;
    expect(component.props.theme).toBe(mockTheme);
  });
});
