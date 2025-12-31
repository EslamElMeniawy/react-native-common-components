import renderer, { act } from 'react-test-renderer';
import type { ReactTestInstance, ReactTestRenderer } from 'react-test-renderer';
import { TouchableRipple } from 'react-native-paper';

import { CheckboxComponent } from '../Checkbox';
import { RadioButtonComponent } from '../RadioButton';
import {
  Checkbox as PaperCheckbox,
  RadioButton as PaperRadioButton,
} from '../../wrappers';
import { Text } from '../../Text';
import { mockTheme } from '../../../test-utils/mockTheme';

describe('CompoundButton - CheckboxComponent render', () => {
  it('renders checked checkbox with text and propagates props', () => {
    const onPress = jest.fn();

    let tree: ReactTestRenderer;
    act(() => {
      tree = renderer.create(
        <CheckboxComponent
          theme={mockTheme}
          text="Accept"
          checked
          checkedColor="#123456"
          uncheckedColor="#aaaaaa"
          onPress={onPress}
          style={{ padding: 8 }}
        />
      );
    });

    const checkboxControl = tree!.root.findByType(PaperCheckbox.Android);
    expect(checkboxControl.props.status).toBe('checked');
    expect(checkboxControl.props.color).toBe('#123456');
    expect(checkboxControl.props.uncheckedColor).toBe('#aaaaaa');
    act(() => {
      checkboxControl.props.onPress?.();
    });
    expect(onPress).toHaveBeenCalled();

    const ripple = tree!.root.findByType(TouchableRipple);
    expect(ripple.props.disabled ?? false).toBe(false);
    expect(ripple.props.rippleColor).toBe('#123456');

    const textNode = tree!.root
      .findAllByType(Text)
      .find((node: ReactTestInstance) => node.props.children === 'Accept');
    expect(textNode).toBeTruthy();
  });

  it('does not render text when empty and remains unchecked', () => {
    let tree: ReactTestRenderer;
    act(() => {
      tree = renderer.create(
        <CheckboxComponent theme={mockTheme} text="" checked={false} />
      );
    });

    const checkboxControl = tree!.root.findByType(PaperCheckbox.Android);
    expect(checkboxControl.props.status).toBe('unchecked');

    const textNodes = tree!.root.findAllByType(Text);
    expect(textNodes.length).toBe(0);
  });
});

describe('CompoundButton - RadioButtonComponent render', () => {
  it('renders radio button with label and propagates props', () => {
    const onPress = jest.fn();

    let tree: ReactTestRenderer;
    act(() => {
      tree = renderer.create(
        <RadioButtonComponent
          theme={mockTheme}
          text="Option A"
          checked
          checkedColor="#654321"
          uncheckedColor="#bbbbbb"
          onPress={onPress}
        />
      );
    });

    const radioControl = tree!.root.findByType(PaperRadioButton.Android);
    expect(radioControl.props.value).toBe('Option A');
    expect(radioControl.props.status).toBe('checked');
    expect(radioControl.props.color).toBe('#654321');
    expect(radioControl.props.uncheckedColor).toBe('#bbbbbb');
    act(() => {
      radioControl.props.onPress?.();
    });
    expect(onPress).toHaveBeenCalled();

    const ripple = tree!.root.findByType(TouchableRipple);
    expect(ripple.props.disabled ?? false).toBe(false);
    expect(ripple.props.rippleColor).toBe('#654321');

    const textNode = tree!.root
      .findAllByType(Text)
      .find((node: ReactTestInstance) => node.props.children === 'Option A');
    expect(textNode).toBeTruthy();
  });

  it('falls back to default value and hides text when not provided', () => {
    let tree: ReactTestRenderer;
    act(() => {
      tree = renderer.create(
        <RadioButtonComponent theme={mockTheme} checked={false} />
      );
    });

    const radioControl = tree!.root.findByType(PaperRadioButton.Android);
    expect(radioControl.props.value).toBe('radio');
    expect(radioControl.props.status).toBe('unchecked');

    const textNodes = tree!.root.findAllByType(Text);
    expect(textNodes.length).toBe(0);
  });
});
