import { ScrollViewComponent } from '../ScrollView';
import { mockTheme } from '../../../test-utils/mockTheme';

// Mock ResponsiveDimensions
jest.mock('../../../utils/ResponsiveDimensions', () => ({
  __esModule: true,
  default: {
    vs: (size: number) => size,
  },
}));

// Mock react-native-keyboard-controller
jest.mock('react-native-keyboard-controller', () => ({
  KeyboardAwareScrollView: 'KeyboardAwareScrollView',
}));

describe('ScrollView Component', () => {
  it('should accept refreshing prop', () => {
    const component = (
      <ScrollViewComponent theme={mockTheme} refreshing={true} />
    );
    expect(component.props.refreshing).toBe(true);
  });

  it('should accept onRefresh handler', () => {
    const onRefresh = jest.fn();
    const component = (
      <ScrollViewComponent
        theme={mockTheme}
        refreshing={false}
        onRefresh={onRefresh}
      />
    );
    expect(component.props.onRefresh).toBe(onRefresh);
  });

  it('should accept refreshColor prop', () => {
    const component = (
      <ScrollViewComponent
        theme={mockTheme}
        refreshing={false}
        refreshColor="#ff0000"
      />
    );
    expect(component.props.refreshColor).toBe('#ff0000');
  });

  it('should accept showsHorizontalScrollIndicator prop', () => {
    const component = (
      <ScrollViewComponent
        theme={mockTheme}
        showsHorizontalScrollIndicator={true}
      />
    );
    expect(component.props.showsHorizontalScrollIndicator).toBe(true);
  });

  it('should accept showsVerticalScrollIndicator prop', () => {
    const component = (
      <ScrollViewComponent
        theme={mockTheme}
        showsVerticalScrollIndicator={true}
      />
    );
    expect(component.props.showsVerticalScrollIndicator).toBe(true);
  });

  it('should accept keyboardShouldPersistTaps prop', () => {
    const component = (
      <ScrollViewComponent
        theme={mockTheme}
        keyboardShouldPersistTaps="always"
      />
    );
    expect(component.props.keyboardShouldPersistTaps).toBe('always');
  });

  it('should accept keyboardDismissMode prop', () => {
    const component = (
      <ScrollViewComponent theme={mockTheme} keyboardDismissMode="on-drag" />
    );
    expect(component.props.keyboardDismissMode).toBe('on-drag');
  });

  it('should accept extraKeyboardSpace prop', () => {
    const component = (
      <ScrollViewComponent theme={mockTheme} extraKeyboardSpace={16} />
    );
    expect(component.props.extraKeyboardSpace).toBe(16);
  });

  it('should accept multiple props', () => {
    const onRefresh = jest.fn();
    const component = (
      <ScrollViewComponent
        theme={mockTheme}
        refreshing={true}
        onRefresh={onRefresh}
        refreshColor="#00ff00"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="never"
        keyboardDismissMode="interactive"
        extraKeyboardSpace={24}
      />
    );
    expect(component.props.refreshing).toBe(true);
    expect(component.props.onRefresh).toBe(onRefresh);
    expect(component.props.refreshColor).toBe('#00ff00');
    expect(component.props.showsHorizontalScrollIndicator).toBe(false);
    expect(component.props.showsVerticalScrollIndicator).toBe(false);
    expect(component.props.keyboardShouldPersistTaps).toBe('never');
    expect(component.props.keyboardDismissMode).toBe('interactive');
    expect(component.props.extraKeyboardSpace).toBe(24);
  });

  it('should handle default values', () => {
    const component = <ScrollViewComponent theme={mockTheme} />;
    expect(component.props.refreshing).toBeUndefined();
    expect(component.props.onRefresh).toBeUndefined();
    expect(component.props.refreshColor).toBeUndefined();
  });

  it('should accept children', () => {
    const component = (
      <ScrollViewComponent theme={mockTheme}>
        <div>Test Content</div>
      </ScrollViewComponent>
    );
    expect(component.props.children).toBeDefined();
  });

  it('should accept custom style prop', () => {
    const style = { flex: 1, backgroundColor: '#f0f0f0' };
    const component = <ScrollViewComponent theme={mockTheme} style={style} />;
    expect(component.props.style).toBe(style);
  });

  it('should accept contentContainerStyle prop', () => {
    const contentContainerStyle = { padding: 20 };
    const component = (
      <ScrollViewComponent
        theme={mockTheme}
        contentContainerStyle={contentContainerStyle}
      />
    );
    expect(component.props.contentContainerStyle).toBe(contentContainerStyle);
  });
});
