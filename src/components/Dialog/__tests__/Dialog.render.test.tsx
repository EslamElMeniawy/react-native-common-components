import * as React from 'react';
import renderer, { act } from 'react-test-renderer';
import type { ReactTestInstance, ReactTestRenderer } from 'react-test-renderer';

import { DialogComponent } from '../Dialog';
import { mockTheme } from '../../../test-utils/mockTheme';

// Provide a lightweight Portal to avoid auto-mocking the wrappers module
jest.mock('../../wrappers', () => {
  const ReactLib = require('react');
  return {
    Portal: ({ children }: any) =>
      ReactLib.createElement(ReactLib.Fragment, null, children),
  };
});

const rn = require('react-native');
// Ensure BackHandler exists for the Dialog effect
rn.BackHandler =
  rn.BackHandler ||
  ({
    addEventListener: jest.fn(() => ({ remove: jest.fn() })),
    removeEventListener: jest.fn(),
  } as any);
// Ensure Pressable is available in the RN mock used by Dialog
if (!rn.Pressable) {
  rn.Pressable = React.forwardRef((props: any, ref) =>
    React.createElement('Pressable', { ...props, ref }, props.children)
  );
}

// SafeAreaView already mocked in jest.setup, keep it simple here as well
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: any) => children,
}));

describe('Dialog - Render', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children when visible and hides when not', () => {
    let treeVisible: ReactTestRenderer;
    act(() => {
      treeVisible = renderer.create(
        <DialogComponent theme={mockTheme} visible>
          <rn.Text>Content</rn.Text>
        </DialogComponent>
      );
    });

    expect(
      treeVisible!.root.findAll(
        (n: ReactTestInstance) => n.props?.children === 'Content'
      ).length > 0
    ).toBe(true);

    let treeHidden: ReactTestRenderer;
    act(() => {
      treeHidden = renderer.create(
        <DialogComponent theme={mockTheme} visible={false}>
          <rn.Text>Content</rn.Text>
        </DialogComponent>
      );
    });

    expect(treeHidden!.toJSON()).toBeNull();
  });

  it('calls onDismiss when overlay is pressed and dismissable', () => {
    const onDismiss = jest.fn();

    let tree: ReactTestRenderer;
    act(() => {
      tree = renderer.create(
        <DialogComponent theme={mockTheme} visible onDismiss={onDismiss} />
      );
    });

    const pressables = tree!.root.findAll((node: ReactTestInstance) => {
      const type = node.type as any;
      return (
        type === 'Pressable' ||
        type?.displayName === 'Pressable' ||
        type?.name === 'Pressable'
      );
    });

    const overlay = pressables.find(
      (node: ReactTestInstance) => !!node.props?.onPress
    );
    expect(overlay).toBeDefined();

    act(() => {
      overlay!.props.onPress?.();
    });

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('does not call onDismiss when dismissable is false', () => {
    const onDismiss = jest.fn();

    let tree: ReactTestRenderer;
    act(() => {
      tree = renderer.create(
        <DialogComponent
          theme={mockTheme}
          visible
          dismissable={false}
          onDismiss={onDismiss}
        />
      );
    });

    const pressables = tree!.root.findAll((node: ReactTestInstance) => {
      const type = node.type as any;
      return (
        type === 'Pressable' ||
        type?.displayName === 'Pressable' ||
        type?.name === 'Pressable'
      );
    });

    const overlay = pressables[0]!;
    expect(overlay.props.onPress).toBeUndefined();
    expect(onDismiss).not.toHaveBeenCalled();
  });

  it('handles hardware back press when visible and dismissable', () => {
    const onDismiss = jest.fn();

    act(() => {
      renderer.create(
        <DialogComponent theme={mockTheme} visible onDismiss={onDismiss} />
      );
    });

    const backHandler = rn.BackHandler as any;
    const handler = backHandler.addEventListener.mock.calls[0][1];

    act(() => {
      handler();
    });

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
