import { CheckboxComponent } from '../Checkbox';
import { mockTheme } from '../../../test-utils/mockTheme';

// Mock ResponsiveDimensions
jest.mock('../../../utils/ResponsiveDimensions', () => ({
  __esModule: true,
  default: {
    ms: (size: number) => size,
  },
}));

describe('Checkbox Component', () => {
  it('should accept text prop', () => {
    const component = <CheckboxComponent theme={mockTheme} text="Accept" />;
    expect(component.props.text).toBe('Accept');
  });

  it('should accept checked prop', () => {
    const component = (
      <CheckboxComponent theme={mockTheme} text="Check me" checked={true} />
    );
    expect(component.props.checked).toBe(true);
  });

  it('should accept onPress handler', () => {
    const onPress = jest.fn();
    const component = (
      <CheckboxComponent theme={mockTheme} text="Check me" onPress={onPress} />
    );
    expect(component.props.onPress).toBe(onPress);
  });

  it('should accept disabled prop', () => {
    const component = (
      <CheckboxComponent theme={mockTheme} text="Disabled" disabled={true} />
    );
    expect(component.props.disabled).toBe(true);
  });

  it('should accept checkedColor prop', () => {
    const component = (
      <CheckboxComponent
        theme={mockTheme}
        text="Check"
        checkedColor="#ff0000"
      />
    );
    expect(component.props.checkedColor).toBe('#ff0000');
  });

  it('should accept uncheckedColor prop', () => {
    const component = (
      <CheckboxComponent
        theme={mockTheme}
        text="Check"
        uncheckedColor="#cccccc"
      />
    );
    expect(component.props.uncheckedColor).toBe('#cccccc');
  });

  it('should accept textProps', () => {
    const textProps = { type: 'bold' as const };
    const component = (
      <CheckboxComponent
        theme={mockTheme}
        text="Check me"
        textProps={textProps}
      />
    );
    expect(component.props.textProps).toBe(textProps);
  });

  it('should accept contentAlign prop', () => {
    const component = (
      <CheckboxComponent theme={mockTheme} text="Check" contentAlign="center" />
    );
    expect(component.props.contentAlign).toBe('center');
  });

  it('should accept style prop', () => {
    const style = { marginBottom: 12 };
    const component = (
      <CheckboxComponent theme={mockTheme} text="Check" style={style} />
    );
    expect(component.props.style).toBe(style);
  });

  it('should accept multiple props', () => {
    const onPress = jest.fn();
    const textProps = { type: 'bold' as const };
    const style = { padding: 8 };
    const component = (
      <CheckboxComponent
        theme={mockTheme}
        text="Agree to terms"
        checked={false}
        onPress={onPress}
        disabled={false}
        checkedColor="#0066cc"
        uncheckedColor="#999999"
        textProps={textProps}
        contentAlign="flex-start"
        style={style}
      />
    );
    expect(component.props.text).toBe('Agree to terms');
    expect(component.props.checked).toBe(false);
    expect(component.props.onPress).toBe(onPress);
    expect(component.props.disabled).toBe(false);
    expect(component.props.checkedColor).toBe('#0066cc');
    expect(component.props.uncheckedColor).toBe('#999999');
  });

  it('should work without optional props', () => {
    const component = <CheckboxComponent theme={mockTheme} />;
    expect(component.props.theme).toBe(mockTheme);
  });
});
