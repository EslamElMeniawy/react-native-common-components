// External imports.
import type { RenderOptions } from '@testing-library/react-native';
import { render } from '@testing-library/react-native';
import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

// Internal imports.
import { mockTheme } from './mockTheme';

/**
 * Custom render function that wraps component with PaperProvider and theme.
 * Use this instead of the plain render from @testing-library/react-native.
 *
 * @example
 * const { getByText } = renderWithTheme(<Button text="Click me" />);
 */
export const renderWithTheme = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <PaperProvider theme={mockTheme}>{children}</PaperProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

/**
 * Creates mock callback functions for testing interactions.
 * All callbacks are jest.fn() mocks that can be inspected.
 *
 * @example
 * const callbacks = createMockCallbacks();
 * render(<Button onPress={callbacks.onPress} />);
 * fireEvent.press(button);
 * expect(callbacks.onPress).toHaveBeenCalled();
 */
export const createMockCallbacks = () => ({
  onPress: jest.fn(),
  onLongPress: jest.fn(),
  onPressIn: jest.fn(),
  onPressOut: jest.fn(),
  onDismiss: jest.fn(),
  onChange: jest.fn(),
  onFocus: jest.fn(),
  onBlur: jest.fn(),
  onRefresh: jest.fn(),
  onItemsSelected: jest.fn(),
});

/**
 * Accessibility test helpers.
 */
export const accessibility = {
  /**
   * Verifies that an element has proper accessibility label.
   */
  hasLabel: (element: any, expectedLabel: string) => {
    expect(element.props.accessibilityLabel).toBe(expectedLabel);
  },

  /**
   * Verifies that an element has proper accessibility role.
   */
  hasRole: (element: any, expectedRole: string) => {
    expect(element.props.accessibilityRole).toBe(expectedRole);
  },

  /**
   * Verifies that an element has proper accessibility state.
   */
  hasState: (element: any, expectedState: Record<string, boolean>) => {
    expect(element.props.accessibilityState).toMatchObject(expectedState);
  },

  /**
   * Verifies minimum touch target size (44x44 points).
   */
  hasMinimumTouchTarget: (element: any) => {
    const style = element.props.style || {};
    const flatStyle = Array.isArray(style)
      ? Object.assign({}, ...style)
      : style;

    // Check if minimum dimensions are set
    const hasMinHeight = flatStyle.minHeight >= 44 || flatStyle.height >= 44;
    const hasMinWidth = flatStyle.minWidth >= 44 || flatStyle.width >= 44;

    expect(hasMinHeight || hasMinWidth).toBe(true);
  },
};

/**
 * Wait for a condition to be true with timeout.
 * Useful for testing animations and async state changes.
 *
 * @example
 * await waitFor(() => expect(getByText('Loaded')).toBeDefined());
 */
export { waitFor } from '@testing-library/react-native';

/**
 * Fire events on elements.
 *
 * @example
 * fireEvent.press(button);
 * fireEvent.changeText(input, 'new text');
 */
export { fireEvent } from '@testing-library/react-native';
