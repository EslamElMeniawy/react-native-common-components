import type { FlatListItem, SelectItem } from '../..';

describe('Type Definitions', () => {
  describe('FlatListItem', () => {
    it('should define FlatListItem type', () => {
      type TestItem = FlatListItem<{ id: string; name: string }>;
      const item: TestItem = {
        key: 'test_key',
        id: '1',
        name: 'Test Item',
      };
      expect(item.key).toBe('test_key');
      expect(item.id).toBe('1');
      expect(item.name).toBe('Test Item');
    });

    it('should allow FlatListItem array', () => {
      type TestItem = FlatListItem<{ id: string; name: string }>;
      const items: TestItem[] = [
        { key: 'key1', id: '1', name: 'Item 1' },
        { key: 'key2', id: '2', name: 'Item 2' },
        { key: 'key3', id: '3', name: 'Item 3' },
      ];

      expect(items).toHaveLength(3);
      expect(items[0]?.id).toBe('1');
      expect(items[1]?.name).toBe('Item 2');
    });
  });

  describe('SelectItem', () => {
    it('should define SelectItem type', () => {
      type TestSelectItem = SelectItem<{ value: string; label: string }>;
      const item: TestSelectItem = {
        key: 'test_key',
        value: 'test_value',
        label: 'Test Label',
      };
      expect(item.key).toBe('test_key');
      expect(item.value).toBe('test_value');
      expect(item.label).toBe('Test Label');
    });

    it('should allow SelectItem with various value types', () => {
      type StringSelectItem = SelectItem<{ value: string; label: string }>;
      type NumberSelectItem = SelectItem<{ value: number; label: string }>;
      type BooleanSelectItem = SelectItem<{ value: boolean; label: string }>;

      const stringItem: StringSelectItem = {
        key: 'key1',
        value: 'string_value',
        label: 'String',
      };
      const numberItem: NumberSelectItem = {
        key: 'key2',
        value: 123,
        label: 'Number',
      };
      const booleanItem: BooleanSelectItem = {
        key: 'key3',
        value: true,
        label: 'Boolean',
      };

      expect(stringItem.value).toBe('string_value');
      expect(numberItem.value).toBe(123);
      expect(booleanItem.value).toBe(true);
    });

    it('should create array of SelectItems', () => {
      type TestSelectItem = SelectItem<{ value: string; label: string }>;
      const items: TestSelectItem[] = [
        { key: 'key1', value: 'option1', label: 'Option 1' },
        { key: 'key2', value: 'option2', label: 'Option 2' },
        { key: 'key3', value: 'option3', label: 'Option 3' },
      ];

      expect(items).toHaveLength(3);
      expect(items[0]?.label).toBe('Option 1');
      expect(items[2]?.value).toBe('option3');
    });

    it('should handle mixed value types in SelectItem array', () => {
      type TestSelectItem = SelectItem<{ value: any; label: string }>;
      const items: TestSelectItem[] = [
        { key: 'key1', value: 'text', label: 'Text' },
        { key: 'key2', value: 42, label: 'Number' },
        { key: 'key3', value: false, label: 'Boolean' },
        { key: 'key4', value: null, label: 'Null' },
      ];

      expect(items).toHaveLength(4);
      expect(items[1]?.value).toBe(42);
      expect(items[3]?.value).toBeNull();
    });
  });

  describe('Type Safety', () => {
    it('should ensure types are consistent', () => {
      type TestFlatListItem = FlatListItem<{ id: string; name: string }>;
      type TestSelectItem = SelectItem<{ value: string; label: string }>;

      const flatListItem: TestFlatListItem = {
        key: 'test_key',
        id: 'unique_id',
        name: 'Test Name',
      };

      const selectItem: TestSelectItem = {
        key: flatListItem.key,
        value: flatListItem.id,
        label: flatListItem.name,
      };

      expect(selectItem.value).toBe(flatListItem.id);
      expect(selectItem.label).toBe(flatListItem.name);
    });
  });
});
