import { render } from '@testing-library/react-native';
import { View } from 'react-native';

import Loading from '../Loading';
import { mockTheme } from '../../../test-utils/mockTheme';

describe('ImagePlaceholder Loading Component', () => {
  it('should render loading container with default colors', () => {
    const mockSetProgressSize = jest.fn();

    const { root } = render(
      <Loading
        theme={mockTheme}
        setProgressSizeState={mockSetProgressSize}
        progress={0}
        progressSize={50}
      />
    );

    expect(root).toBeTruthy();
  });

  it('should render with custom loading props colors', () => {
    const mockSetProgressSize = jest.fn();

    const { root } = render(
      <Loading
        theme={mockTheme}
        setProgressSizeState={mockSetProgressSize}
        progress={50}
        progressSize={40}
        loadingProps={{
          backgroundColor: '#ff0000',
          color: '#00ff00',
        }}
      />
    );

    expect(root).toBeTruthy();
  });

  it('should handle onLayout event for progress size calculation', () => {
    const mockSetProgressSize = jest.fn();

    const { UNSAFE_getByType } = render(
      <Loading
        theme={mockTheme}
        setProgressSizeState={mockSetProgressSize}
        progress={25}
        progressSize={50}
      />
    );

    const viewComponent = UNSAFE_getByType(View);
    const onLayout = viewComponent.props.onLayout;

    onLayout({
      nativeEvent: {
        layout: { width: 200, height: 100 },
      },
    });

    expect(mockSetProgressSize).toHaveBeenCalledWith(50);
  });

  it('should calculate progress size using smaller dimension', () => {
    const mockSetProgressSize = jest.fn();

    const { UNSAFE_getByType } = render(
      <Loading
        theme={mockTheme}
        setProgressSizeState={mockSetProgressSize}
        progress={75}
        progressSize={60}
      />
    );

    const viewComponent = UNSAFE_getByType(View);
    viewComponent.props.onLayout({
      nativeEvent: {
        layout: { width: 100, height: 200 },
      },
    });

    expect(mockSetProgressSize).toHaveBeenCalledWith(50);
  });

  it('should render with indeterminate progress when progress is 0 or negative', () => {
    expect(() => {
      render(
        <Loading
          theme={mockTheme}
          setProgressSizeState={jest.fn()}
          progress={0}
          progressSize={50}
        />
      );
    }).not.toThrow();

    expect(() => {
      render(
        <Loading
          theme={mockTheme}
          setProgressSizeState={jest.fn()}
          progress={-5}
          progressSize={50}
        />
      );
    }).not.toThrow();
  });

  it('should handle undefined loadingProps gracefully', () => {
    const { root } = render(
      <Loading
        theme={mockTheme}
        setProgressSizeState={jest.fn()}
        progress={50}
        progressSize={50}
        loadingProps={undefined}
      />
    );

    expect(root).toBeTruthy();
  });

  it('should handle undefined backgroundColor in loadingProps', () => {
    const { root } = render(
      <Loading
        theme={mockTheme}
        setProgressSizeState={jest.fn()}
        progress={50}
        progressSize={50}
        loadingProps={{ backgroundColor: undefined }}
      />
    );

    expect(root).toBeTruthy();
  });
});
