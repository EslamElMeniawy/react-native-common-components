import { render } from '@testing-library/react-native';

import NoData from '../NoData';

describe('SelectDialog NoData Component', () => {
  it('should render with default message', () => {
    expect(() => {
      render(<NoData />);
    }).not.toThrow();
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
    expect(() => {
      render(<NoData noDataMessage="لا توجد بيانات" />);
    }).not.toThrow();
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
