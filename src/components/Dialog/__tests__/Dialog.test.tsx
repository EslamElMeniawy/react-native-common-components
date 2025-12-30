import { DialogComponent } from '../Dialog';
import { mockTheme } from '../../../test-utils/mockTheme';

// Mock SafeAreaView
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: any) => children,
}));

describe('Dialog Component', () => {
  it('should accept visible prop', () => {
    const component = <DialogComponent visible={true} theme={mockTheme} />;
    expect(component.props.visible).toBe(true);
  });

  it('should accept visible false', () => {
    const component = <DialogComponent visible={false} theme={mockTheme} />;
    expect(component.props.visible).toBe(false);
  });

  it('should accept onDismiss handler', () => {
    const onDismiss = jest.fn();
    const component = (
      <DialogComponent visible={true} theme={mockTheme} onDismiss={onDismiss} />
    );
    expect(component.props.onDismiss).toBe(onDismiss);
  });

  it('should accept dismissable prop', () => {
    const component = (
      <DialogComponent visible={true} theme={mockTheme} dismissable={false} />
    );
    expect(component.props.dismissable).toBe(false);
  });

  it('should accept overlayColor prop', () => {
    const component = (
      <DialogComponent
        visible={true}
        theme={mockTheme}
        overlayColor="rgba(0, 0, 0, 0.5)"
      />
    );
    expect(component.props.overlayColor).toBe('rgba(0, 0, 0, 0.5)');
  });

  it('should accept position prop', () => {
    const component = (
      <DialogComponent visible={true} theme={mockTheme} position="center" />
    );
    expect(component.props.position).toBe('center');
  });

  it('should accept style prop', () => {
    const style = { backgroundColor: '#fff' };
    const component = (
      <DialogComponent visible={true} theme={mockTheme} style={style} />
    );
    expect(component.props.style).toBe(style);
  });

  it('should accept children', () => {
    const children = <div>Dialog Content</div>;
    const component = (
      <DialogComponent visible={true} theme={mockTheme}>
        {children}
      </DialogComponent>
    );
    expect(component.props.children).toBe(children);
  });

  it('should accept multiple props', () => {
    const onDismiss = jest.fn();
    const style = { padding: 20 };
    const component = (
      <DialogComponent
        visible={true}
        theme={mockTheme}
        dismissable={true}
        onDismiss={onDismiss}
        position="center"
        overlayColor="rgba(0, 0, 0, 0.7)"
        style={style}
      />
    );
    expect(component.props.visible).toBe(true);
    expect(component.props.dismissable).toBe(true);
    expect(component.props.onDismiss).toBe(onDismiss);
    expect(component.props.position).toBe('center');
    expect(component.props.overlayColor).toBe('rgba(0, 0, 0, 0.7)');
    expect(component.props.style).toBe(style);
  });
});
