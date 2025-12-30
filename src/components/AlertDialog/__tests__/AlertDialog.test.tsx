import { AlertDialogComponent } from '../AlertDialog';
import { mockTheme } from '../../../test-utils/mockTheme';

describe('AlertDialog Component', () => {
  it('should accept title prop', () => {
    const component = <AlertDialogComponent theme={mockTheme} title="Alert" />;
    expect(component.props.title).toBe('Alert');
  });

  it('should accept message prop', () => {
    const component = (
      <AlertDialogComponent theme={mockTheme} message="Are you sure?" />
    );
    expect(component.props.message).toBe('Are you sure?');
  });

  it('should accept titleProps', () => {
    const titleProps = { type: 'bold' as const };
    const component = (
      <AlertDialogComponent
        theme={mockTheme}
        title="Test"
        titleProps={titleProps}
      />
    );
    expect(component.props.titleProps).toBe(titleProps);
  });

  it('should accept messageProps', () => {
    const messageProps = { size: 14 };
    const component = (
      <AlertDialogComponent
        theme={mockTheme}
        message="Message"
        messageProps={messageProps}
      />
    );
    expect(component.props.messageProps).toBe(messageProps);
  });

  it('should accept actions prop', () => {
    const actions = [{ action: 'cancel' }, { action: 'ok' }];
    const component = (
      <AlertDialogComponent theme={mockTheme} title="Test" actions={actions} />
    );
    expect(component.props.actions).toBe(actions);
  });

  it('should accept dialogProps', () => {
    const dialogProps = { dismissable: false };
    const component = (
      <AlertDialogComponent
        theme={mockTheme}
        title="Test"
        dialogProps={dialogProps}
      />
    );
    expect(component.props.dialogProps).toBe(dialogProps);
  });

  it('should handle multiple props correctly', () => {
    const titleProps = { type: 'bold' as const };
    const messageProps = { size: 16 };
    const actions = [{ action: 'ok' }];
    const dialogProps = { dismissable: false, visible: true };
    const component = (
      <AlertDialogComponent
        theme={mockTheme}
        title="Confirm"
        message="Are you sure?"
        titleProps={titleProps}
        messageProps={messageProps}
        actions={actions}
        dialogProps={dialogProps}
      />
    );
    expect(component.props.title).toBe('Confirm');
    expect(component.props.message).toBe('Are you sure?');
    expect(component.props.dialogProps).toBe(dialogProps);
  });

  it('should work without optional props', () => {
    const component = <AlertDialogComponent theme={mockTheme} />;
    expect(component.props.theme).toBe(mockTheme);
  });

  it('should accept all props combined', () => {
    const titleProps = { type: 'bold' as const };
    const messageProps = { size: 16 };
    const actions = [{ action: 'cancel' }, { action: 'ok' }];
    const dialogProps = { visible: true, dismissable: true };
    const component = (
      <AlertDialogComponent
        theme={mockTheme}
        title="Delete Item?"
        message="This action cannot be undone."
        titleProps={titleProps}
        messageProps={messageProps}
        actions={actions}
        dialogProps={dialogProps}
      />
    );
    expect(component.props.theme).toBe(mockTheme);
    expect(component.props.title).toBe('Delete Item?');
    expect(component.props.message).toBe('This action cannot be undone.');
    expect(component.props.titleProps).toBe(titleProps);
  });
});
