import { IconButtonComponent } from '../IconButton';
import { mockTheme } from '../../../test-utils/mockTheme';

// Mock ResponsiveDimensions
jest.mock('../../../utils/ResponsiveDimensions', () => ({
  __esModule: true,
  default: {
    ms: (size: number) => size,
  },
}));

describe('IconButton Component', () => {
  it('should accept iconName prop', () => {
    const component = <IconButtonComponent theme={mockTheme} iconName="menu" />;
    expect(component.props.iconName).toBe('menu');
  });

  it('should accept different iconName', () => {
    const component = (
      <IconButtonComponent theme={mockTheme} iconName="close" />
    );
    expect(component.props.iconName).toBe('close');
  });

  it('should accept size prop', () => {
    const component = (
      <IconButtonComponent theme={mockTheme} iconName="menu" size={48} />
    );
    expect(component.props.size).toBe(48);
  });

  it('should accept color prop', () => {
    const component = (
      <IconButtonComponent theme={mockTheme} iconName="menu" color="#ff0000" />
    );
    expect(component.props.color).toBe('#ff0000');
  });

  it('should accept disabled prop', () => {
    const component = (
      <IconButtonComponent theme={mockTheme} iconName="menu" disabled={true} />
    );
    expect(component.props.disabled).toBe(true);
  });

  it('should accept onPress handler', () => {
    const onPress = jest.fn();
    const component = (
      <IconButtonComponent
        theme={mockTheme}
        iconName="menu"
        onPress={onPress}
      />
    );
    expect(component.props.onPress).toBe(onPress);
  });

  it('should accept onLongPress handler', () => {
    const onLongPress = jest.fn();
    const component = (
      <IconButtonComponent
        theme={mockTheme}
        iconName="menu"
        onLongPress={onLongPress}
      />
    );
    expect(component.props.onLongPress).toBe(onLongPress);
  });

  it('should accept style prop', () => {
    const style = { marginTop: 10 };
    const component = (
      <IconButtonComponent theme={mockTheme} iconName="menu" style={style} />
    );
    expect(component.props.style).toBe(style);
  });

  it('should accept iconPercent prop', () => {
    const component = (
      <IconButtonComponent
        theme={mockTheme}
        iconName="menu"
        iconPercent={0.8}
      />
    );
    expect(component.props.iconPercent).toBe(0.8);
  });

  it('should accept noIconTint prop', () => {
    const component = (
      <IconButtonComponent
        theme={mockTheme}
        iconName="menu"
        noIconTint={true}
      />
    );
    expect(component.props.noIconTint).toBe(true);
  });

  it('should accept multiple props', () => {
    const onPress = jest.fn();
    const style = { padding: 5 };
    const component = (
      <IconButtonComponent
        theme={mockTheme}
        iconName="settings"
        size={32}
        color="#00ff00"
        onPress={onPress}
        style={style}
      />
    );
    expect(component.props.iconName).toBe('settings');
    expect(component.props.size).toBe(32);
    expect(component.props.color).toBe('#00ff00');
    expect(component.props.onPress).toBe(onPress);
    expect(component.props.style).toBe(style);
  });
});
