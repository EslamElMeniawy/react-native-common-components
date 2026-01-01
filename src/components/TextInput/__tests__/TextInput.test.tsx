import { TextInputComponent } from '../TextInput';
import { mockTheme } from '../../../test-utils/mockTheme';

describe('TextInput Component', () => {
  it('should accept placeholder prop', () => {
    const component = (
      <TextInputComponent theme={mockTheme} placeholder="Enter text..." />
    );
    expect(component.props.placeholder).toBe('Enter text...');
  });

  it('should accept value prop', () => {
    const component = (
      <TextInputComponent theme={mockTheme} value="test value" />
    );
    expect(component.props.value).toBe('test value');
  });

  it('should accept onChangeText handler', () => {
    const onChangeText = jest.fn();
    const component = (
      <TextInputComponent theme={mockTheme} onChangeText={onChangeText} />
    );
    expect(component.props.onChangeText).toBe(onChangeText);
  });

  it('should accept error prop', () => {
    const component = <TextInputComponent theme={mockTheme} error={true} />;
    expect(component.props.error).toBe(true);
  });

  it('should accept errorProps prop', () => {
    const errorProps = { textProps: { type: 'bold' as const } };
    const component = (
      <TextInputComponent theme={mockTheme} errorProps={errorProps} />
    );
    expect(component.props.errorProps).toBe(errorProps);
  });

  it('should accept disabled prop', () => {
    const component = <TextInputComponent theme={mockTheme} disabled={true} />;
    expect(component.props.disabled).toBe(true);
  });

  it('should accept label prop', () => {
    const component = <TextInputComponent theme={mockTheme} label="Username" />;
    expect(component.props.label).toBe('Username');
  });

  it('should accept style prop', () => {
    const style = { marginBottom: 10 };
    const component = <TextInputComponent theme={mockTheme} style={style} />;
    expect(component.props.style).toBe(style);
  });

  it('should accept editable prop', () => {
    const component = <TextInputComponent theme={mockTheme} editable={false} />;
    expect(component.props.editable).toBe(false);
  });

  it('should accept multiple props', () => {
    const onChangeText = jest.fn();
    const style = { padding: 5 };
    const errorProps = { errorMessage: 'Required' };
    const component = (
      <TextInputComponent
        theme={mockTheme}
        placeholder="Enter username"
        value="john"
        onChangeText={onChangeText}
        error={false}
        label="Username"
        disabled={false}
        style={style}
        errorProps={errorProps}
      />
    );
    expect(component.props.placeholder).toBe('Enter username');
    expect(component.props.value).toBe('john');
    expect(component.props.onChangeText).toBe(onChangeText);
    expect(component.props.error).toBe(false);
    expect(component.props.label).toBe('Username');
    expect(component.props.disabled).toBe(false);
    expect(component.props.style).toBe(style);
    expect(component.props.errorProps).toBe(errorProps);
  });

  it('should work without optional props', () => {
    const component = <TextInputComponent theme={mockTheme} />;
    expect(component.props.theme).toBe(mockTheme);
  });

  it('should accept topLabelProps', () => {
    const topLabelProps = {
      label: 'Name',
      textProps: { type: 'bold' as const },
    };
    const component = (
      <TextInputComponent theme={mockTheme} topLabelProps={topLabelProps} />
    );
    expect(component.props.topLabelProps).toBe(topLabelProps);
  });
});
