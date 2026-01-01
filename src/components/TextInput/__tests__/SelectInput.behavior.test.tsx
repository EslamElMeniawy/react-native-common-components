import { render, waitFor } from '@testing-library/react-native';
import { act } from 'react-test-renderer';

import SelectInput from '../SelectInput';
import { mockTheme } from '../../../test-utils/mockTheme';

jest.mock('../SelectInputMenu', () => {
  const ReactLib = require('react');
  const mock = jest.fn((props: any) =>
    ReactLib.createElement('SelectInputMenu', props)
  );
  return { __esModule: true, default: mock };
});

jest.mock('../SelectInputInput', () => {
  const ReactLib = require('react');
  const mock = jest.fn((props: any) =>
    ReactLib.createElement('SelectInputInput', props)
  );
  return { __esModule: true, default: mock };
});

jest.mock('../../SelectDialog', () => {
  const ReactLib = require('react');
  const mock = jest.fn((props: any) =>
    ReactLib.createElement('SelectDialog', props)
  );
  return { __esModule: true, SelectDialog: mock };
});

const mockSelectInputMenu =
  (jest.requireMock('../SelectInputMenu').default as jest.Mock) ?? jest.fn();
const mockSelectInputInput =
  (jest.requireMock('../SelectInputInput').default as jest.Mock) ?? jest.fn();
const mockSelectDialog =
  (jest.requireMock('../../SelectDialog').SelectDialog as jest.Mock) ??
  jest.fn();

type SelectItem = { key: string; dropdownTitle?: string };

describe('TextInput/SelectInput behavior', () => {
  beforeEach(() => {
    mockSelectInputMenu.mockClear();
    mockSelectInputInput.mockClear();
    mockSelectDialog.mockClear();
  });

  const items: SelectItem[] = [
    { key: '1', dropdownTitle: 'First' },
    { key: '2', dropdownTitle: 'Second' },
  ];

  const getLastMenuProps = () => {
    const lastCallIndex = mockSelectInputMenu.mock.calls.length - 1;
    return mockSelectInputMenu.mock.calls[lastCallIndex]?.[0];
  };

  it('derives value from provided selected items', async () => {
    render(
      <SelectInput
        theme={mockTheme}
        selectProps={{ mode: 'dropdown', items, selectedItems: items }}
      />
    );

    await waitFor(() => {
      expect(getLastMenuProps().value).toBe('First - Second');
    });
  });

  it('updates selected items for multi-select and keeps menu open', async () => {
    const onItemsSelected = jest.fn();
    render(
      <SelectInput
        theme={mockTheme}
        selectProps={{
          mode: 'dropdown',
          items,
          allowMultiSelect: true,
          onItemsSelected,
        }}
      />
    );

    await act(async () => getLastMenuProps().onItemPressed(items[0]));
    await waitFor(() => {
      expect(onItemsSelected).toHaveBeenLastCalledWith([items[0]]);
      expect(getLastMenuProps().value).toBe('First');
    });

    await act(async () => getLastMenuProps().onItemPressed(items[1]));
    await waitFor(() => {
      expect(onItemsSelected).toHaveBeenLastCalledWith([items[0], items[1]]);
      expect(getLastMenuProps().value).toBe('First - Second');
    });

    await act(async () => getLastMenuProps().onItemPressed(items[0]));
    await waitFor(() => {
      expect(onItemsSelected).toHaveBeenLastCalledWith([items[1]]);
      expect(getLastMenuProps().value).toBe('Second');
    });
  });

  it('toggles visibility on press and closes after single selection', async () => {
    render(
      <SelectInput
        theme={mockTheme}
        selectProps={{ mode: 'dropdown', items }}
      />
    );

    await act(async () => getLastMenuProps().onPress());
    await waitFor(() => expect(getLastMenuProps().isSelectVisible).toBe(true));

    await act(async () => getLastMenuProps().onItemPressed(items[0]));
    await waitFor(() => expect(getLastMenuProps().isSelectVisible).toBe(false));
  });

  it('passes updated value to SelectInputInput when dialog selection changes', async () => {
    render(
      <SelectInput theme={mockTheme} value="initial" selectProps={{ items }} />
    );

    const dialogProps = mockSelectDialog?.mock.calls[0]?.[0];
    await act(async () => dialogProps?.onItemsSelected?.([]));

    await waitFor(() => {
      const inputProps = mockSelectInputInput.mock.calls.pop()?.[0];
      expect(inputProps?.value).toBe('initial');
    });
  });
});
