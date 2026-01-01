import { RadioButtonComponent } from '../RadioButton';
import { mockTheme } from '../../../test-utils/mockTheme';

// Mock ResponsiveDimensions
jest.mock('../../../utils/ResponsiveDimensions', () => ({
  __esModule: true,
  default: {
    ms: (size: number) => size,
  },
}));

describe('RadioButton Component', () => {
  it('should accept text prop', () => {
    const component = (
      <RadioButtonComponent theme={mockTheme} text="Option 1" />
    );
    expect(component.props.text).toBe('Option 1');
  });

  it('should accept checked prop', () => {
    const component = (
      <RadioButtonComponent theme={mockTheme} text="Select me" checked={true} />
    );
    expect(component.props.checked).toBe(true);
  });

  it('should accept onPress handler', () => {
    const onPress = jest.fn();
    const component = (
      <RadioButtonComponent
        theme={mockTheme}
        text="Select me"
        onPress={onPress}
      />
    );
    expect(component.props.onPress).toBe(onPress);
  });

  it('should accept disabled prop', () => {
    const component = (
      <RadioButtonComponent
        theme={mockTheme}
        text="Disabled option"
        disabled={true}
      />
    );
    expect(component.props.disabled).toBe(true);
  });

  it('should accept checkedColor prop', () => {
    const component = (
      <RadioButtonComponent
        theme={mockTheme}
        text="Select"
        checkedColor="#0066ff"
      />
    );
    expect(component.props.checkedColor).toBe('#0066ff');
  });

  it('should accept uncheckedColor prop', () => {
    const component = (
      <RadioButtonComponent
        theme={mockTheme}
        text="Select"
        uncheckedColor="#dddddd"
      />
    );
    expect(component.props.uncheckedColor).toBe('#dddddd');
  });

  it('should accept textProps', () => {
    const textProps = { type: 'bold' as const };
    const component = (
      <RadioButtonComponent
        theme={mockTheme}
        text="Select me"
        textProps={textProps}
      />
    );
    expect(component.props.textProps).toBe(textProps);
  });

  it('should accept contentAlign prop', () => {
    const component = (
      <RadioButtonComponent
        theme={mockTheme}
        text="Select"
        contentAlign="flex-start"
      />
    );
    expect(component.props.contentAlign).toBe('flex-start');
  });

  it('should accept style prop', () => {
    const style = { marginVertical: 8 };
    const component = (
      <RadioButtonComponent theme={mockTheme} text="Select" style={style} />
    );
    expect(component.props.style).toBe(style);
  });

  it('should accept multiple props', () => {
    const onPress = jest.fn();
    const textProps = { type: 'bold' as const };
    const style = { padding: 12 };
    const component = (
      <RadioButtonComponent
        theme={mockTheme}
        text="Option A"
        checked={true}
        onPress={onPress}
        disabled={false}
        checkedColor="#0066ff"
        uncheckedColor="#999999"
        textProps={textProps}
        contentAlign="center"
        style={style}
      />
    );
    expect(component.props.text).toBe('Option A');
    expect(component.props.checked).toBe(true);
    expect(component.props.onPress).toBe(onPress);
    expect(component.props.disabled).toBe(false);
  });

  it('should work without optional props', () => {
    const component = <RadioButtonComponent theme={mockTheme} />;
    expect(component.props.theme).toBe(mockTheme);
  });
});
