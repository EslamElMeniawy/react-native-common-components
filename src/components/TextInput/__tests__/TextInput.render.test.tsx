import renderer, { act } from 'react-test-renderer';
import type { ReactTestInstance, ReactTestRenderer } from 'react-test-renderer';

import { TextInputComponent } from '../TextInput';
import { mockTheme } from '../../../test-utils/mockTheme';

// Provide simple wrapper mocks so Paper TextInput renders as a host component
jest.mock('../../wrappers', () => {
  const React = require('react');
  const TextInput = ({ onChangeText, ...props }: any) =>
    React.createElement('PaperTextInput', { ...props, onChangeText });

  return {
    TextInput,
    Portal: ({ children }: any) =>
      React.createElement(React.Fragment, null, children),
  };
});

describe('TextInput - Render', () => {
  it('adds required marker to inline label and placeholder when no top label', () => {
    let tree: ReactTestRenderer;
    act(() => {
      tree = renderer.create(
        <TextInputComponent
          theme={mockTheme}
          isRequired
          label="Name"
          placeholder="Enter"
        />
      );
    });

    const paperInput = tree!.root.findByType('PaperTextInput');
    expect(paperInput.props.label).toBe('Name *');
    expect(paperInput.props.placeholder).toBe('Enter *');
  });

  it('renders top label with required star and omits inline label when topLabelProps provided', () => {
    let tree: ReactTestRenderer;
    act(() => {
      tree = renderer.create(
        <TextInputComponent
          theme={mockTheme}
          isRequired
          topLabelProps={{ label: 'Full Name' }}
        />
      );
    });

    const paperInput = tree!.root.findByType('PaperTextInput');
    expect(paperInput.props.label).toBeUndefined();

    const labelNode = tree!.root.findAll((node: ReactTestInstance) => {
      const children = node.props?.children;
      if (typeof children === 'string') {
        return children.includes('Full Name');
      }
      if (Array.isArray(children)) {
        return children.some((child) => child === 'Full Name');
      }
      return false;
    })[0];
    expect(labelNode).toBeDefined();

    const requiredStar = tree!.root.findAll((node: ReactTestInstance) => {
      const children = node.props?.children;
      if (typeof children === 'string') {
        return children.includes('*');
      }
      if (Array.isArray(children)) {
        return children.some(
          (child) => typeof child === 'string' && child.includes('*')
        );
      }
      return false;
    })[0];
    expect(requiredStar).toBeDefined();
  });

  it('renders error message when errorProps are provided', () => {
    let tree: ReactTestRenderer;
    act(() => {
      tree = renderer.create(
        <TextInputComponent
          theme={mockTheme}
          errorProps={{ errorMessage: 'Required' }}
        />
      );
    });

    const errorText = tree!.root.findAll(
      (node: ReactTestInstance) => node.props?.children === 'Required'
    )[0];
    expect(errorText).toBeDefined();
  });

  it('sanitizes numeric input and strips non-digits when positiveNumbersOnly', () => {
    const onChangeText = jest.fn();

    let tree: ReactTestRenderer;
    act(() => {
      tree = renderer.create(
        <TextInputComponent
          theme={mockTheme}
          keyboardType="numeric"
          positiveNumbersOnly
          onChangeText={onChangeText}
        />
      );
    });

    const paperInput = tree!.root.findByType('PaperTextInput');

    act(() => {
      paperInput.props.onChangeText('١٢-3a');
    });

    expect(onChangeText).toHaveBeenCalledWith('123');
  });
});
