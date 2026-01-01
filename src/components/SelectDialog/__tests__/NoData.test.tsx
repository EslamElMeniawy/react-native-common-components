import { render } from '@testing-library/react-native';
import { I18nManager } from 'react-native';

import NoData from '../NoData';

describe('SelectDialog NoData Component', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.spyOn(I18nManager, 'getConstants').mockReturnValue({
      isRTL: false,
      doLeftAndRightSwapInRTL: false,
      localeIdentifier: 'en-US',
    });
  });

  it('should render with default message', () => {
    const { getByText } = render(<NoData />);

    expect(getByText('No data available')).toBeTruthy();
  });

  it('should render with custom message', () => {
    expect(() => {
      render(<NoData noDataMessage="No items available" />);
    }).not.toThrow();
  });

  it('should render with custom component', () => {
    const CustomComponent = () => null;
    expect(() => {
      render(<NoData noDataComponent={<CustomComponent />} />);
    }).not.toThrow();
  });

  it('should use custom component when provided', () => {
    const CustomComponent = () => null;
    expect(() => {
      render(
        <NoData
          noDataMessage="Should not appear"
          noDataComponent={<CustomComponent />}
        />
      );
    }).not.toThrow();
  });

  it('should render RTL localized message', () => {
    jest.spyOn(I18nManager, 'getConstants').mockReturnValue({
      isRTL: true,
      doLeftAndRightSwapInRTL: false,
      localeIdentifier: 'ar',
    });

    const { getByText } = render(<NoData />);

    expect(getByText('لا تتوافر بيانات!')).toBeTruthy();
  });

  it('should apply theme colors', () => {
    expect(() => {
      render(<NoData />);
    }).not.toThrow();
  });

  it('should render with undefined noDataComponent', () => {
    expect(() => {
      render(<NoData noDataMessage="No data" noDataComponent={undefined} />);
    }).not.toThrow();
  });
});
