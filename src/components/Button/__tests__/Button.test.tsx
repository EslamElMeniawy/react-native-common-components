import { ButtonComponent } from '../Button';
import { mockTheme } from '../../../test-utils/mockTheme';

// Mock ResponsiveDimensions
jest.mock('../../../utils/ResponsiveDimensions', () => ({
  __esModule: true,
  default: {
    ms: (size: number) => size,
  },
}));

describe('Button Component', () => {
  it('should accept text prop', () => {
    const component = <ButtonComponent theme={mockTheme} text="Press me" />;
    expect(component.props.text).toBe('Press me');
  });

  it('should accept disabled prop', () => {
    const component = (
      <ButtonComponent theme={mockTheme} text="Button" disabled={true} />
    );
    expect(component.props.disabled).toBe(true);
  });

  it('should accept onPress handler', () => {
    const onPress = jest.fn();
    const component = (
      <ButtonComponent theme={mockTheme} text="Button" onPress={onPress} />
    );
    expect(component.props.onPress).toBe(onPress);
  });

  it('should accept onLongPress handler', () => {
    const onLongPress = jest.fn();
    const component = (
      <ButtonComponent
        theme={mockTheme}
        text="Button"
        onLongPress={onLongPress}
      />
    );
    expect(component.props.onLongPress).toBe(onLongPress);
  });

  it('should accept startIconName prop', () => {
    const component = (
      <ButtonComponent theme={mockTheme} text="Button" startIconName="check" />
    );
    expect(component.props.startIconName).toBe('check');
  });

  it('should accept endIconName prop', () => {
    const component = (
      <ButtonComponent
        theme={mockTheme}
        text="Button"
        endIconName="arrow-right"
      />
    );
    expect(component.props.endIconName).toBe('arrow-right');
  });

  it('should accept style prop', () => {
    const style = { marginTop: 10 };
    const component = (
      <ButtonComponent theme={mockTheme} text="Button" style={style} />
    );
    expect(component.props.style).toBe(style);
  });

  it('should accept textProps', () => {
    const textProps = { type: 'bold' as const };
    const component = (
      <ButtonComponent theme={mockTheme} text="Button" textProps={textProps} />
    );
    expect(component.props.textProps).toBe(textProps);
  });

  it('should accept multiple props', () => {
    const onPress = jest.fn();
    const textProps = { type: 'bold' as const };
    const component = (
      <ButtonComponent
        theme={mockTheme}
        text="Click me"
        disabled={false}
        onPress={onPress}
        startIconName="plus"
        endIconName="arrow-right"
        textProps={textProps}
      />
    );
    expect(component.props.text).toBe('Click me');
    expect(component.props.disabled).toBe(false);
    expect(component.props.onPress).toBe(onPress);
    expect(component.props.startIconName).toBe('plus');
    expect(component.props.endIconName).toBe('arrow-right');
    expect(component.props.textProps).toBe(textProps);
  });
});
