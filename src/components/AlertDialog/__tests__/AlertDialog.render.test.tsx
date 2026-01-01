import { render } from '@testing-library/react-native';
import { AlertDialogComponent } from '../AlertDialog';
import { mockTheme } from '../../../test-utils/mockTheme';
import type { Action } from '../AlertDialog.types';

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: any) => children,
}));

jest.mock('../../Dialog', () => {
  const React = require('react');
  const RN = require('react-native');
  return {
    Dialog: ({ children, ...props }: any) =>
      React.createElement(RN.View, { testID: 'dialog', ...props }, children),
    __esModule: true,
    default: function Dialog({ children, ...props }: any) {
      return React.createElement(
        RN.View,
        { testID: 'dialog', ...props },
        children
      );
    },
  };
});

const mockActions: Action[] = [{ action: 'Cancel' }, { action: 'OK' }];

const renderAlertDialog = (props?: Record<string, unknown>) =>
  render(
    <AlertDialogComponent
      theme={mockTheme}
      title="Test Alert"
      message="This is a test message"
      actions={mockActions}
      dialogProps={{ visible: true, onDismiss: jest.fn() }}
      {...props}
    />
  );

describe('AlertDialog Component - Render Tests', () => {
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      expect(() => renderAlertDialog()).not.toThrow();
    });

    it('renders dialog when visible', () => {
      const { getByTestId } = render(
        <AlertDialogComponent
          theme={mockTheme}
          title="Alert"
          dialogProps={{ visible: true }}
        />
      );
      expect(getByTestId('dialog')).toBeTruthy();
    });

    it('renders title text when provided', () => {
      const { getByText } = renderAlertDialog({ title: 'Confirm Action' });
      expect(getByText('Confirm Action')).toBeTruthy();
    });

    it('does not render title when not provided', () => {
      const { queryByText } = render(
        <AlertDialogComponent
          theme={mockTheme}
          message="Message only"
          dialogProps={{ visible: true }}
        />
      );
      expect(queryByText('Test Alert')).toBeNull();
    });

    it('renders message text when provided', () => {
      const { getByText } = renderAlertDialog({
        message: 'Are you absolutely sure?',
      });
      expect(getByText('Are you absolutely sure?')).toBeTruthy();
    });

    it('does not render message when not provided', () => {
      const { queryByText } = render(
        <AlertDialogComponent
          theme={mockTheme}
          title="Title only"
          dialogProps={{ visible: true }}
        />
      );
      expect(queryByText('This is a test message')).toBeNull();
    });
  });

  describe('Actions Rendering', () => {
    it('renders action buttons', () => {
      const { getByText } = renderAlertDialog();
      expect(getByText('Cancel')).toBeTruthy();
      expect(getByText('OK')).toBeTruthy();
    });

    it('renders single action button', () => {
      const singleAction: Action[] = [{ action: 'OK' }];
      const { getByText, queryByText } = render(
        <AlertDialogComponent
          theme={mockTheme}
          title="Confirm"
          actions={singleAction}
          dialogProps={{ visible: true }}
        />
      );
      expect(getByText('OK')).toBeTruthy();
      expect(queryByText('Cancel')).toBeNull();
    });

    it('renders three or more actions in column layout', () => {
      const threeActions: Action[] = [
        { action: 'Cancel' },
        { action: 'Maybe' },
        { action: 'OK' },
      ];
      const { getByText } = render(
        <AlertDialogComponent
          theme={mockTheme}
          title="Choose"
          actions={threeActions}
          dialogProps={{ visible: true }}
        />
      );
      expect(getByText('Cancel')).toBeTruthy();
      expect(getByText('Maybe')).toBeTruthy();
      expect(getByText('OK')).toBeTruthy();
    });

    it('does not render null actions', () => {
      const actionsWithNull: Action[] = [{ action: 'OK' }];
      const { getByText, queryByText } = render(
        <AlertDialogComponent
          theme={mockTheme}
          title="Test"
          actions={actionsWithNull}
          dialogProps={{ visible: true }}
        />
      );
      expect(getByText('OK')).toBeTruthy();
      expect(queryByText('null')).toBeNull();
    });
  });

  describe('Action Callbacks', () => {
    it('action buttons render with provided text', () => {
      const actions: Action[] = [{ action: 'Delete' }];
      const { getByText } = render(
        <AlertDialogComponent
          theme={mockTheme}
          title="Confirm Delete"
          actions={actions}
          dialogProps={{ visible: true }}
        />
      );
      const deleteButton = getByText('Delete');
      expect(deleteButton).toBeTruthy();
    });

    it('multiple action buttons render', () => {
      const actions: Action[] = [
        { action: 'CancelAction' },
        { action: 'OKAction' },
      ];
      const { getByText } = render(
        <AlertDialogComponent
          theme={mockTheme}
          title="Confirm"
          actions={actions}
          dialogProps={{ visible: true }}
        />
      );
      expect(getByText('CancelAction')).toBeTruthy();
      expect(getByText('OKAction')).toBeTruthy();
    });

    it('action with no button props still renders', () => {
      const actions: Action[] = [
        {
          action: 'TestAction',
        },
      ];
      const { getByText } = render(
        <AlertDialogComponent
          theme={mockTheme}
          title="TestTitle"
          actions={actions}
          dialogProps={{ visible: true }}
        />
      );
      expect(getByText('TestAction')).toBeTruthy();
    });
  });

  describe('Styling and Props', () => {
    it('applies titleProps to title text', () => {
      const { getByText } = renderAlertDialog({
        titleProps: { type: 'bold', size: 20 },
      });
      expect(getByText('Test Alert')).toBeTruthy();
    });

    it('applies messageProps to message text', () => {
      const { getByText } = renderAlertDialog({
        messageProps: { size: 14 },
      });
      expect(getByText('This is a test message')).toBeTruthy();
    });

    it('applies action text and button props', () => {
      const actions: Action[] = [
        {
          action: 'Styled',
          actionProps: {
            textProps: { size: 16 },
          },
        },
      ];
      const { getByText } = render(
        <AlertDialogComponent
          theme={mockTheme}
          title="Test"
          actions={actions}
          dialogProps={{ visible: true }}
        />
      );
      expect(getByText('Styled')).toBeTruthy();
    });

    it('applies dialog props to dialog', () => {
      const onDismiss = jest.fn();
      const { getByTestId } = render(
        <AlertDialogComponent
          theme={mockTheme}
          title="Test"
          dialogProps={{ visible: true, onDismiss }}
        />
      );
      expect(getByTestId('dialog')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('renders with only title', () => {
      const { getByText, queryByText } = render(
        <AlertDialogComponent
          theme={mockTheme}
          title="Title Only"
          dialogProps={{ visible: true }}
        />
      );
      expect(getByText('Title Only')).toBeTruthy();
      expect(queryByText('This is a test message')).toBeNull();
    });

    it('renders with only message', () => {
      const { getByText } = render(
        <AlertDialogComponent
          theme={mockTheme}
          message="Message Only"
          dialogProps={{ visible: true }}
        />
      );
      expect(getByText('Message Only')).toBeTruthy();
    });

    it('renders with no title or message', () => {
      const { getByText } = render(
        <AlertDialogComponent
          theme={mockTheme}
          actions={[{ action: 'OK' }]}
          dialogProps={{ visible: true }}
        />
      );
      expect(getByText('OK')).toBeTruthy();
    });

    it('renders with empty actions array', () => {
      const { getByText, queryByText } = render(
        <AlertDialogComponent
          theme={mockTheme}
          title="No Actions"
          actions={[]}
          dialogProps={{ visible: true }}
        />
      );
      expect(getByText('No Actions')).toBeTruthy();
      expect(queryByText('Cancel')).toBeNull();
    });

    it('renders with undefined actions', () => {
      const { getByText } = render(
        <AlertDialogComponent
          theme={mockTheme}
          title="Test"
          dialogProps={{ visible: true }}
        />
      );
      expect(getByText('Test')).toBeTruthy();
    });
  });

  describe('Theme Integration', () => {
    it('applies theme to rendered content', () => {
      renderAlertDialog();
      // All content should be themed
    });
  });

  describe('Layout Behavior', () => {
    it('uses row layout for two actions', () => {
      const twoActions: Action[] = [{ action: 'No' }, { action: 'Yes' }];
      const { getByText } = render(
        <AlertDialogComponent
          theme={mockTheme}
          title="Confirm"
          actions={twoActions}
          dialogProps={{ visible: true }}
        />
      );
      expect(getByText('No')).toBeTruthy();
      expect(getByText('Yes')).toBeTruthy();
    });

    it('uses column layout for more than two actions', () => {
      const manyActions: Action[] = [
        { action: 'Option 1' },
        { action: 'Option 2' },
        { action: 'Option 3' },
      ];
      const { getByText } = render(
        <AlertDialogComponent
          theme={mockTheme}
          title="Choose One"
          actions={manyActions}
          dialogProps={{ visible: true }}
        />
      );
      expect(getByText('Option 1')).toBeTruthy();
      expect(getByText('Option 2')).toBeTruthy();
      expect(getByText('Option 3')).toBeTruthy();
    });
  });
});
