import { TextComponent } from '../Text';
import { mockTheme } from '../../../test-utils/mockTheme';

// Mock ResponsiveDimensions
jest.mock('../../../utils/ResponsiveDimensions', () => ({
  __esModule: true,
  default: {
    ms: (size: number) => size,
  },
}));

describe('Text Component', () => {
  it('should accept children prop', () => {
    const component = (
      <TextComponent theme={mockTheme}>Hello World</TextComponent>
    );
    expect(component.props.children).toBe('Hello World');
  });

  it('should have default type', () => {
    const component = (
      <TextComponent theme={mockTheme}>Default Text</TextComponent>
    );
    expect(component.props.type).toBeUndefined();
  });

  it('should accept type caption', () => {
    const component = (
      <TextComponent theme={mockTheme} type="caption">
        Caption Text
      </TextComponent>
    );
    expect(component.props.type).toBe('caption');
  });

  it('should accept type bold', () => {
    const component = (
      <TextComponent theme={mockTheme} type="bold">
        Bold Text
      </TextComponent>
    );
    expect(component.props.type).toBe('bold');
  });

  it('should accept custom size', () => {
    const component = (
      <TextComponent theme={mockTheme} size={20}>
        Custom Size
      </TextComponent>
    );
    expect(component.props.size).toBe(20);
  });

  it('should accept variant', () => {
    const component = (
      <TextComponent theme={mockTheme} variant="bodyMedium">
        Variant Text
      </TextComponent>
    );
    expect(component.props.variant).toBe('bodyMedium');
  });

  it('applies custom style', () => {
    const style = [{ fontWeight: 'bold' as const }];
    const component = (
      <TextComponent theme={mockTheme} style={style}>
        Styled Text
      </TextComponent>
    );
    expect(component.props.style).toBe(style);
  });

  it('handles empty children', () => {
    const component = <TextComponent theme={mockTheme}>{''}</TextComponent>;
    expect(component.props.children).toBe('');
  });

  it('handles number children', () => {
    const component = <TextComponent theme={mockTheme}>{123}</TextComponent>;
    expect(component.props.children).toBe(123);
  });

  it('handles variant and size together', () => {
    const component = (
      <TextComponent theme={mockTheme} variant="bodySmall" size={18}>
        Combined
      </TextComponent>
    );
    expect(component.props.variant).toBe('bodySmall');
    expect(component.props.size).toBe(18);
  });

  it('handles multiple props', () => {
    const style = [{ fontWeight: 'bold' as const }];
    const component = (
      <TextComponent theme={mockTheme} type="bold" size={16} style={style}>
        Combined Props
      </TextComponent>
    );
    expect(component.props.type).toBe('bold');
    expect(component.props.size).toBe(16);
    expect(component.props.style).toBe(style);
  });

  it('accepts theme prop', () => {
    const component = (
      <TextComponent theme={mockTheme}>Themed Text</TextComponent>
    );
    expect(component.props.theme).toBeDefined();
    expect(component.props.theme.isV3).toBe(true);
  });
});
