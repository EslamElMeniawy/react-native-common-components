import { ImagePlaceholderComponent } from '../ImagePlaceholder';
import { mockTheme } from '../../../test-utils/mockTheme';

// Mock ResponsiveDimensions
jest.mock('../../../utils/ResponsiveDimensions', () => ({
  __esModule: true,
  default: {
    ms: (size: number) => size,
  },
}));

describe('ImagePlaceholder Component', () => {
  it('should accept size prop', () => {
    const component = (
      <ImagePlaceholderComponent theme={mockTheme} size={100} />
    );
    expect(component.props.size).toBe(100);
  });

  it('should accept source prop', () => {
    const source = 'https://example.com/image.png';
    const component = (
      <ImagePlaceholderComponent theme={mockTheme} source={source} />
    );
    expect(component.props.source).toBe(source);
  });

  it('should accept placeholder prop', () => {
    const placeholder = 123;
    const component = (
      <ImagePlaceholderComponent theme={mockTheme} placeholder={placeholder} />
    );
    expect(component.props.placeholder).toBe(placeholder);
  });

  it('should accept vectorPlaceholder prop', () => {
    const component = (
      <ImagePlaceholderComponent theme={mockTheme} vectorPlaceholder={456} />
    );
    expect(component.props.vectorPlaceholder).toBe(456);
  });

  it('should accept resizeMode prop', () => {
    const component = (
      <ImagePlaceholderComponent theme={mockTheme} resizeMode="cover" />
    );
    expect(component.props.resizeMode).toBe('cover');
  });

  it('should accept priority prop', () => {
    const component = (
      <ImagePlaceholderComponent theme={mockTheme} priority="high" />
    );
    expect(component.props.priority).toBe('high');
  });

  it('should accept cache prop', () => {
    const component = (
      <ImagePlaceholderComponent theme={mockTheme} cache="immutable" />
    );
    expect(component.props.cache).toBe('immutable');
  });

  it('should accept loadingProps prop', () => {
    const loadingProps = { showLoading: true, color: '#0066cc' };
    const component = (
      <ImagePlaceholderComponent
        theme={mockTheme}
        loadingProps={loadingProps}
      />
    );
    expect(component.props.loadingProps).toBe(loadingProps);
  });

  it('should accept style prop', () => {
    const style = { borderRadius: 8 };
    const component = (
      <ImagePlaceholderComponent theme={mockTheme} style={style} />
    );
    expect(component.props.style).toBe(style);
  });

  it('should accept multiple props', () => {
    const source = 'https://example.com/image.png';
    const loadingProps = { showLoading: true, color: '#999999' };
    const style = { borderRadius: 12 };
    const component = (
      <ImagePlaceholderComponent
        theme={mockTheme}
        size={150}
        source={source}
        vectorPlaceholder={789}
        resizeMode="contain"
        priority="high"
        cache="web"
        loadingProps={loadingProps}
        style={style}
      />
    );
    expect(component.props.size).toBe(150);
    expect(component.props.source).toBe(source);
    expect(component.props.vectorPlaceholder).toBe(789);
    expect(component.props.resizeMode).toBe('contain');
  });

  it('should work without optional props', () => {
    const component = <ImagePlaceholderComponent theme={mockTheme} />;
    expect(component.props.theme).toBe(mockTheme);
  });
});
