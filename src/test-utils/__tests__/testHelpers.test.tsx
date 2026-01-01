import * as React from 'react';
import { Text } from 'react-native';

import {
  accessibility,
  createMockCallbacks,
  renderWithTheme,
  fireEvent,
  waitFor,
} from '../index';

describe('test-utils helpers', () => {
  it('renderWithTheme renders children and supports events', async () => {
    const callbacks = createMockCallbacks();
    const { getByText } = renderWithTheme(
      <Text onPress={callbacks.onPress}>Hello</Text>
    );

    fireEvent.press(getByText('Hello'));
    await waitFor(() => expect(callbacks.onPress).toHaveBeenCalled());
  });

  it('creates mock callbacks with callable jest fns', () => {
    const callbacks = createMockCallbacks();

    callbacks.onChange('value');
    callbacks.onItemsSelected(['item']);

    expect(callbacks.onChange).toHaveBeenCalledWith('value');
    expect(callbacks.onItemsSelected).toHaveBeenCalledWith(['item']);
    expect(typeof callbacks.onLongPress).toBe('function');
  });

  it('validates accessibility helpers', () => {
    const element = {
      props: {
        accessibilityLabel: 'Submit',
        accessibilityRole: 'button',
        accessibilityState: { disabled: true },
        style: { minWidth: 50, minHeight: 50 },
      },
    } as unknown as React.ReactElement;

    accessibility.hasLabel(element, 'Submit');
    accessibility.hasRole(element, 'button');
    accessibility.hasState(element, { disabled: true });
    accessibility.hasMinimumTouchTarget(element);
  });
});
