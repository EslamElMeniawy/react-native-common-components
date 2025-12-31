import { render } from '@testing-library/react-native';
import { ImagePlaceholderComponent } from '../ImagePlaceholder';
import { mockTheme } from '../../../test-utils/mockTheme';

jest.mock('../../../utils/ResponsiveDimensions', () => ({
  __esModule: true,
  default: {
    ms: (size: number) => size,
  },
}));

jest.mock('../Image', () => {
  const ReactLib = require('react');
  return function MockImage(props: any) {
    return ReactLib.createElement('Image', { testID: 'image', ...props });
  };
});

const renderImagePlaceholder = (props?: Record<string, unknown>) =>
  render(
    <ImagePlaceholderComponent
      theme={mockTheme}
      testID="placeholder"
      {...props}
    />
  );

describe('ImagePlaceholder Component', () => {
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      expect(() => renderImagePlaceholder()).not.toThrow();
    });

    it('renders container View with testID', () => {
      const { getByTestId } = renderImagePlaceholder();
      expect(getByTestId('placeholder')).toBeTruthy();
    });

    it('renders Image component', () => {
      const { getByTestId } = renderImagePlaceholder();
      expect(getByTestId('image')).toBeTruthy();
    });
  });

  describe('Size Handling', () => {
    it('applies size to container width and height', () => {
      const { getByTestId } = renderImagePlaceholder({ size: 100 });
      const container = getByTestId('placeholder');
      expect(container.props.style).toMatchObject({
        width: 100,
        height: 100,
      });
    });

    it('handles no size prop with undefined dimensions', () => {
      const { getByTestId } = renderImagePlaceholder();
      const container = getByTestId('placeholder');
      expect(container.props.style).toMatchObject({
        width: undefined,
        height: undefined,
      });
    });

    it('scales size using ResponsiveDimensions', () => {
      const { getByTestId } = renderImagePlaceholder({ size: 150 });
      const container = getByTestId('placeholder');
      expect(container.props.style).toMatchObject({
        width: 150,
        height: 150,
      });
    });
  });

  describe('Image Props Passthrough', () => {
    it('passes source to Image component', () => {
      const source = 'https://example.com/image.png';
      const { getByTestId } = renderImagePlaceholder({ source });
      const image = getByTestId('image');
      expect(image.props.source).toBe(source);
    });

    it('passes placeholder to Image component', () => {
      const { getByTestId } = renderImagePlaceholder({ placeholder: 123 });
      const image = getByTestId('image');
      expect(image.props.placeholder).toBe(123);
    });

    it('passes vectorPlaceholder to Image component', () => {
      const { getByTestId } = renderImagePlaceholder({
        vectorPlaceholder: 456,
      });
      const image = getByTestId('image');
      expect(image.props.vectorPlaceholder).toBe(456);
    });

    it('passes resizeMode to Image component', () => {
      const { getByTestId } = renderImagePlaceholder({ resizeMode: 'cover' });
      const image = getByTestId('image');
      expect(image.props.resizeMode).toBe('cover');
    });

    it('passes priority to Image component', () => {
      const { getByTestId } = renderImagePlaceholder({ priority: 'high' });
      const image = getByTestId('image');
      expect(image.props.priority).toBe('high');
    });

    it('passes cache to Image component', () => {
      const { getByTestId } = renderImagePlaceholder({ cache: 'immutable' });
      const image = getByTestId('image');
      expect(image.props.cache).toBe('immutable');
    });

    it('passes loadingProps to Image component', () => {
      const loadingProps = { showLoading: true, color: '#0066cc' };
      const { getByTestId } = renderImagePlaceholder({ loadingProps });
      const image = getByTestId('image');
      expect(image.props.loadingProps).toBe(loadingProps);
    });

    it('passes theme to Image component', () => {
      const { getByTestId } = renderImagePlaceholder();
      const image = getByTestId('image');
      expect(image.props.theme).toBe(mockTheme);
    });
  });

  describe('State Management', () => {
    it('provides state setters to Image component', () => {
      const { getByTestId } = renderImagePlaceholder();
      const image = getByTestId('image');
      expect(typeof image.props.setLoadingState).toBe('function');
      expect(typeof image.props.setErrorState).toBe('function');
      expect(typeof image.props.setProgressState).toBe('function');
      expect(typeof image.props.setProgressSizeState).toBe('function');
    });

    it('initializes state values passed to Image', () => {
      const { getByTestId } = renderImagePlaceholder();
      const image = getByTestId('image');
      expect(image.props.isLoading).toBe(false);
      expect(image.props.isError).toBe(false);
      expect(image.props.progress).toBe(0);
      expect(image.props.progressSize).toBe(0);
    });
  });

  describe('Style Composition', () => {
    it('applies custom style prop', () => {
      const customStyle = { borderRadius: 8, margin: 10 };
      const { getByTestId } = renderImagePlaceholder({ style: customStyle });
      const container = getByTestId('placeholder');
      expect(container.props.style).toMatchObject(customStyle);
    });

    it('merges custom style with size', () => {
      const customStyle = { borderRadius: 12 };
      const { getByTestId } = renderImagePlaceholder({
        size: 200,
        style: customStyle,
      });
      const container = getByTestId('placeholder');
      expect(container.props.style).toMatchObject({
        width: 200,
        height: 200,
        borderRadius: 12,
      });
    });
  });

  describe('Combined Props', () => {
    it('handles all props together', () => {
      const source = 'https://example.com/image.png';
      const loadingProps = { showLoading: true, color: '#999999' };
      const customStyle = { borderRadius: 12 };

      const { getByTestId } = renderImagePlaceholder({
        size: 150,
        source,
        placeholder: 789,
        vectorPlaceholder: 456,
        resizeMode: 'contain',
        priority: 'high',
        cache: 'web',
        loadingProps,
        style: customStyle,
      });

      const container = getByTestId('placeholder');
      const image = getByTestId('image');

      expect(container.props.style).toMatchObject({
        width: 150,
        height: 150,
        borderRadius: 12,
      });

      expect(image.props).toMatchObject({
        source,
        placeholder: 789,
        vectorPlaceholder: 456,
        resizeMode: 'contain',
        priority: 'high',
        cache: 'web',
        loadingProps,
      });
    });
  });
});
