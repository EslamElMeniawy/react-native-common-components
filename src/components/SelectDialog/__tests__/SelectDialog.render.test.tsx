import * as React from 'react';
import renderer, { act } from 'react-test-renderer';
import type { ReactTestInstance, ReactTestRenderer } from 'react-test-renderer';

// Provide lightweight wrappers implementations for consistent rendering
jest.mock('../../wrappers', () => {
  const ReactLib = require('react');

  return {
    Portal: ({ children }: any) =>
      ReactLib.createElement(ReactLib.Fragment, null, children),
    TextInput: ReactLib.forwardRef((props: any, ref: any) =>
      ReactLib.createElement('TextInput', { ...props, ref }, props.children)
    ),
    Checkbox: {
      Android: (props: any) =>
        ReactLib.createElement('Checkbox', props, props.children),
    },
    RadioButton: {
      Android: (props: any) =>
        ReactLib.createElement('RadioButton', props, props.children),
    },
  };
});

// Simplify Dialog wrapper to avoid Pressable/back handler complexity
jest.mock('../../Dialog', () => {
  const ReactLib = require('react');

  const Dialog = ({ children, visible }: any) =>
    visible ? ReactLib.createElement(ReactLib.Fragment, null, children) : null;

  return { __esModule: true, Dialog, default: Dialog };
});

// Simplify List to render pressable list items
jest.mock('../List', () => {
  const ReactLib = require('react');

  const List = ({ items, onItemPressed }: any) => (
    <ReactLib.Fragment>
      {items?.map((item: any) =>
        ReactLib.createElement(
          'ListItem',
          {
            key: item.key,
            title: item.dropdownTitle,
            onPress: () => onItemPressed(item),
          },
          item.dropdownTitle
        )
      )}
    </ReactLib.Fragment>
  );

  return { __esModule: true, default: List };
});

// Stub SearchInput to avoid TextInput complexities
jest.mock('../SearchInput', () => {
  const ReactLib = require('react');
  const SearchInput = ({ searchLabel }: any) =>
    ReactLib.createElement('SearchInputMock', { label: searchLabel }, 'Search');
  return { __esModule: true, default: SearchInput };
});

// Simplify Button rendering
jest.mock('../../Button', () => {
  const ReactLib = require('react');
  const Button = ({ text, onPress }: any) =>
    ReactLib.createElement('DialogButton', { onPress }, text);
  return { __esModule: true, Button, default: Button };
});

// Render FlatList items synchronously for easier assertions
jest.mock('../../FlatList', () => {
  const ReactLib = require('react');

  return ({ data, renderItem, ...props }: any) => (
    <ReactLib.Fragment {...props}>
      {data?.map((item: any, index: number) => renderItem({ item, index }))}
    </ReactLib.Fragment>
  );
});

// Ensure BackHandler is mocked for Dialog usage
const rn = require('react-native');
rn.BackHandler = {
  addEventListener: jest.fn(() => ({ remove: jest.fn() })),
  removeEventListener: jest.fn(),
};
rn.Pressable =
  rn.Pressable ||
  React.forwardRef((props: any, ref: any) =>
    React.createElement('Pressable', { ...props, ref }, props.children)
  );

import { SelectDialogComponent } from '../SelectDialog';
import { mockTheme } from '../../../test-utils/mockTheme';

// Mock SafeAreaView
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: any) => children,
}));

describe('SelectDialog - Render', () => {
  const items = [
    { key: '1', dropdownTitle: 'First' },
    { key: '2', dropdownTitle: 'Second' },
  ];

  it('renders items and default close button text', () => {
    let tree: ReactTestRenderer;
    act(() => {
      tree = renderer.create(
        <SelectDialogComponent
          theme={mockTheme}
          visible
          items={items}
          onDismiss={jest.fn()}
          onItemsSelected={jest.fn()}
        />
      );
    });

    const textNodes = tree!.root.findAll(
      (node: ReactTestInstance) =>
        typeof node.props.children === 'string' &&
        (node.props.children === 'First' ||
          node.props.children === 'Second' ||
          node.props.children === 'Done')
    );

    const sortedValues = textNodes
      .map((n: ReactTestInstance) => n.props.children)
      .sort();

    expect(sortedValues).toEqual(['Done', 'First', 'Second']);
  });

  it('shows no data message when list is empty', () => {
    let tree: ReactTestRenderer;
    act(() => {
      tree = renderer.create(
        <SelectDialogComponent
          theme={mockTheme}
          visible
          items={[]}
          noDataMessage="Nothing here"
          onDismiss={jest.fn()}
        />
      );
    });

    const noDataNode = tree!.root.find(
      (node: ReactTestInstance) => node.props.children === 'Nothing here'
    );
    expect(noDataNode).toBeTruthy();
  });

  it('selects item and dismisses for single select', () => {
    const onDismiss = jest.fn();
    const onItemsSelected = jest.fn();

    let tree: ReactTestRenderer;
    act(() => {
      tree = renderer.create(
        <SelectDialogComponent
          theme={mockTheme}
          visible
          items={items}
          allowMultiSelect={false}
          onDismiss={onDismiss}
          onItemsSelected={onItemsSelected}
        />
      );
    });

    const itemsNodes = tree!.root.findAllByType('ListItem');
    expect(itemsNodes.length).toBeGreaterThan(0);
    // First item corresponds to first list entry
    act(() => {
      itemsNodes[0]!.props.onPress?.();
    });

    expect(onItemsSelected).toHaveBeenCalledWith([items[0]]);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('selects multiple items without dismiss when multi-select enabled', () => {
    const onDismiss = jest.fn();
    const onItemsSelected = jest.fn();

    let tree: ReactTestRenderer;
    act(() => {
      tree = renderer.create(
        <SelectDialogComponent
          theme={mockTheme}
          visible
          items={items}
          allowMultiSelect
          onDismiss={onDismiss}
          onItemsSelected={onItemsSelected}
        />
      );
    });

    const itemsNodes = tree!.root.findAllByType('ListItem');
    expect(itemsNodes.length).toBeGreaterThan(1);

    act(() => {
      itemsNodes[0]!.props.onPress?.();
    });
    expect(onItemsSelected).toHaveBeenLastCalledWith([items[0]]);
    expect(onDismiss).not.toHaveBeenCalled();

    act(() => {
      itemsNodes[1]!.props.onPress?.();
    });
    expect(onItemsSelected).toHaveBeenLastCalledWith(items);
    expect(onDismiss).not.toHaveBeenCalled();
  });
});
