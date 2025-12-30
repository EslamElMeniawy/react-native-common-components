import { LoadingDialogComponent } from '../LoadingDialog';
import { mockTheme } from '../../../test-utils/mockTheme';

// Mock Dialog component
jest.mock('../../Dialog', () => ({
  Dialog: ({ children }: any) => children,
}));

describe('LoadingDialog Component', () => {
  it('should accept visible prop', () => {
    const component = (
      <LoadingDialogComponent visible={true} theme={mockTheme} />
    );
    expect(component).toBeTruthy();
    expect(component.props.visible).toBe(true);
  });

  it('should accept visible false', () => {
    const component = (
      <LoadingDialogComponent visible={false} theme={mockTheme} />
    );
    expect(component).toBeTruthy();
    expect(component.props.visible).toBe(false);
  });

  it('should accept custom loader', () => {
    const CustomLoader = () => null;
    const component = (
      <LoadingDialogComponent
        visible={true}
        theme={mockTheme}
        loader={<CustomLoader />}
      />
    );
    expect(component.props.loader).toBeTruthy();
  });

  it('should accept dialogProps', () => {
    const dialogProps = { dismissable: false };
    const component = (
      <LoadingDialogComponent
        visible={true}
        theme={mockTheme}
        dialogProps={dialogProps}
      />
    );
    expect(component.props.dialogProps).toBe(dialogProps);
  });

  it('should accept activityIndicatorProps with size', () => {
    const activityIndicatorProps = { size: 'large' as const };
    const component = (
      <LoadingDialogComponent
        visible={true}
        theme={mockTheme}
        activityIndicatorProps={activityIndicatorProps}
      />
    );
    expect(component.props.activityIndicatorProps).toBe(activityIndicatorProps);
  });

  it('should accept activityIndicatorProps with color', () => {
    const activityIndicatorProps = { color: '#ff0000' };
    const component = (
      <LoadingDialogComponent
        visible={true}
        theme={mockTheme}
        activityIndicatorProps={activityIndicatorProps}
      />
    );
    expect(component.props.activityIndicatorProps).toBe(activityIndicatorProps);
  });
});
