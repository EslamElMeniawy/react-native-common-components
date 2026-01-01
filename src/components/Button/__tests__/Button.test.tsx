import { ButtonComponent } from '../Button';
import { mockTheme } from '../../../test-utils/mockTheme';

// Mock ResponsiveDimensions
jest.mock('../../../utils/ResponsiveDimensions', () => ({
  __esModule: true,
  default: {
    ms: (size: number) => size,
    mvs: (size: number) => size,
    s: (size: number) => size,
    vs: (size: number) => size,
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

  // Additional comprehensive prop tests
  it('should accept startImage prop', () => {
    const component = (
      <ButtonComponent theme={mockTheme} text="Button" startImage={123} />
    );
    expect(component.props.startImage).toBe(123);
  });

  it('should accept startVector prop', () => {
    const component = (
      <ButtonComponent theme={mockTheme} text="Button" startVector={456} />
    );
    expect(component.props.startVector).toBe(456);
  });

  it('should accept startIconSize prop', () => {
    const component = (
      <ButtonComponent theme={mockTheme} text="Button" startIconSize={24} />
    );
    expect(component.props.startIconSize).toBe(24);
  });

  it('should accept startIconColor prop', () => {
    const component = (
      <ButtonComponent
        theme={mockTheme}
        text="Button"
        startIconColor="#FF0000"
      />
    );
    expect(component.props.startIconColor).toBe('#FF0000');
  });

  it('should accept noStartIconTint prop', () => {
    const component = (
      <ButtonComponent theme={mockTheme} text="Button" noStartIconTint={true} />
    );
    expect(component.props.noStartIconTint).toBe(true);
  });

  it('should accept endImage prop', () => {
    const component = (
      <ButtonComponent theme={mockTheme} text="Button" endImage={789} />
    );
    expect(component.props.endImage).toBe(789);
  });

  it('should accept endVector prop', () => {
    const component = (
      <ButtonComponent theme={mockTheme} text="Button" endVector={101112} />
    );
    expect(component.props.endVector).toBe(101112);
  });

  it('should accept endIconSize prop', () => {
    const component = (
      <ButtonComponent theme={mockTheme} text="Button" endIconSize={28} />
    );
    expect(component.props.endIconSize).toBe(28);
  });

  it('should accept endIconColor prop', () => {
    const component = (
      <ButtonComponent theme={mockTheme} text="Button" endIconColor="#00FF00" />
    );
    expect(component.props.endIconColor).toBe('#00FF00');
  });

  it('should accept noEndIconTint prop', () => {
    const component = (
      <ButtonComponent theme={mockTheme} text="Button" noEndIconTint={true} />
    );
    expect(component.props.noEndIconTint).toBe(true);
  });

  it('should accept onPressIn handler', () => {
    const onPressIn = jest.fn();
    const component = (
      <ButtonComponent theme={mockTheme} text="Button" onPressIn={onPressIn} />
    );
    expect(component.props.onPressIn).toBe(onPressIn);
  });

  it('should accept onPressOut handler', () => {
    const onPressOut = jest.fn();
    const component = (
      <ButtonComponent
        theme={mockTheme}
        text="Button"
        onPressOut={onPressOut}
      />
    );
    expect(component.props.onPressOut).toBe(onPressOut);
  });

  it('should accept iconSize prop', () => {
    const component = (
      <ButtonComponent theme={mockTheme} text="Button" iconSize={32} />
    );
    expect(component.props.iconSize).toBe(32);
  });

  it('should accept noIconTint prop', () => {
    const component = (
      <ButtonComponent theme={mockTheme} text="Button" noIconTint={true} />
    );
    expect(component.props.noIconTint).toBe(true);
  });

  it('should accept complex combination of start icon props', () => {
    const component = (
      <ButtonComponent
        theme={mockTheme}
        text="Button"
        startIconName="check"
        startIconSize={20}
        startIconColor="#0000FF"
        noStartIconTint={false}
      />
    );
    expect(component.props.startIconName).toBe('check');
    expect(component.props.startIconSize).toBe(20);
    expect(component.props.startIconColor).toBe('#0000FF');
    expect(component.props.noStartIconTint).toBe(false);
  });

  it('should accept complex combination of end icon props', () => {
    const component = (
      <ButtonComponent
        theme={mockTheme}
        text="Button"
        endIconName="arrow-right"
        endIconSize={22}
        endIconColor="#FF00FF"
        noEndIconTint={true}
      />
    );
    expect(component.props.endIconName).toBe('arrow-right');
    expect(component.props.endIconSize).toBe(22);
    expect(component.props.endIconColor).toBe('#FF00FF');
    expect(component.props.noEndIconTint).toBe(true);
  });

  it('should accept all event handlers together', () => {
    const onPress = jest.fn();
    const onLongPress = jest.fn();
    const onPressIn = jest.fn();
    const onPressOut = jest.fn();
    const component = (
      <ButtonComponent
        theme={mockTheme}
        text="Button"
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      />
    );
    expect(component.props.onPress).toBe(onPress);
    expect(component.props.onLongPress).toBe(onLongPress);
    expect(component.props.onPressIn).toBe(onPressIn);
    expect(component.props.onPressOut).toBe(onPressOut);
  });

  it('should accept button with only text', () => {
    const component = (
      <ButtonComponent theme={mockTheme} text="Simple Button" />
    );
    expect(component.props.text).toBe('Simple Button');
    expect(component.props.disabled).toBeUndefined();
    expect(component.props.onPress).toBeUndefined();
  });

  it('should accept button with text and style', () => {
    const style = { backgroundColor: '#cccccc', padding: 10 };
    const component = (
      <ButtonComponent theme={mockTheme} text="Styled Button" style={style} />
    );
    expect(component.props.text).toBe('Styled Button');
    expect(component.props.style).toBe(style);
  });

  it('should handle disabled button with onPress', () => {
    const onPress = jest.fn();
    const component = (
      <ButtonComponent
        theme={mockTheme}
        text="Disabled"
        disabled={true}
        onPress={onPress}
      />
    );
    expect(component.props.disabled).toBe(true);
    expect(component.props.onPress).toBe(onPress);
  });
});
