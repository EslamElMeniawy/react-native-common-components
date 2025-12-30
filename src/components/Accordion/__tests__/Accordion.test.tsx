import { AccordionComponent } from '../Accordion';
import { mockTheme } from '../../../test-utils/mockTheme';

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => ({
  __esModule: true,
  default: {
    View: () => null,
  },
  useSharedValue: (value: any) => ({ value }),
  useAnimatedStyle: () => ({}),
  withTiming: (value: number) => value,
  Easing: {
    inOut: () => ({}),
    ease: {},
  },
}));

describe('Accordion Component', () => {
  it('should accept containerStyle prop', () => {
    const style = { paddingHorizontal: 16 };
    const component = (
      <AccordionComponent theme={mockTheme} containerStyle={style} />
    );
    expect(component.props.containerStyle).toBe(style);
  });

  it('should accept headerContainerStyle prop', () => {
    const style = { paddingVertical: 12 };
    const component = (
      <AccordionComponent theme={mockTheme} headerContainerStyle={style} />
    );
    expect(component.props.headerContainerStyle).toBe(style);
  });

  it('should accept headerContent prop', () => {
    const content = <div>Header</div>;
    const component = (
      <AccordionComponent theme={mockTheme} headerContent={content} />
    );
    expect(component.props.headerContent).toBe(content);
  });

  it('should accept children prop', () => {
    const children = <div>Content</div>;
    const component = (
      <AccordionComponent theme={mockTheme}>{children}</AccordionComponent>
    );
    expect(component.props.children).toBe(children);
  });

  it('should accept iconButtonProps prop', () => {
    const iconButtonProps = { iconName: 'chevron-down', color: '#000' };
    const component = (
      <AccordionComponent theme={mockTheme} iconButtonProps={iconButtonProps} />
    );
    expect(component.props.iconButtonProps).toBe(iconButtonProps);
  });

  it('should work with multiple props', () => {
    const style = { paddingHorizontal: 16 };
    const headerStyle = { paddingVertical: 12 };
    const iconButtonProps = { iconName: 'chevron-down' };
    const component = (
      <AccordionComponent
        theme={mockTheme}
        containerStyle={style}
        headerContainerStyle={headerStyle}
        iconButtonProps={iconButtonProps}
      />
    );
    expect(component.props.containerStyle).toBe(style);
    expect(component.props.headerContainerStyle).toBe(headerStyle);
    expect(component.props.iconButtonProps).toBe(iconButtonProps);
  });

  it('should work without optional props', () => {
    const component = <AccordionComponent theme={mockTheme} />;
    expect(component.props.theme).toBe(mockTheme);
  });

  it('should accept multiple children', () => {
    const component = (
      <AccordionComponent theme={mockTheme}>
        <div>Child 1</div>
        <div>Child 2</div>
      </AccordionComponent>
    );
    expect(component.props.children).toBeTruthy();
  });

  it('should accept all props together', () => {
    const containerStyle = { padding: 10 };
    const headerContent = <div>Header</div>;
    const children = <div>Content</div>;
    const iconButtonProps = { disabled: false };
    const component = (
      <AccordionComponent
        theme={mockTheme}
        containerStyle={containerStyle}
        headerContent={headerContent}
        iconButtonProps={iconButtonProps}
      >
        {children}
      </AccordionComponent>
    );
    expect(component.props.theme).toBe(mockTheme);
    expect(component.props.containerStyle).toBe(containerStyle);
    expect(component.props.headerContent).toBe(headerContent);
  });
});
