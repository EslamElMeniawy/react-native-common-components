import { render } from '@testing-library/react-native';
import { IconButtonComponent } from '../IconButton';
import { mockTheme } from '../../../test-utils/mockTheme';

jest.mock('../../../utils/ResponsiveDimensions', () => ({
  __esModule: true,
  default: {
    ms: (size: number) => size,
    mvs: (size: number) => size,
    s: (size: number) => size,
    vs: (size: number) => size,
  },
}));

jest.mock('../Icon', () => {
  const ReactLib = require('react');
  return function MockIcon(props: any) {
    return ReactLib.createElement('Icon', { testID: 'icon', ...props });
  };
});

const renderIconButton = (props?: Record<string, unknown>) =>
  render(
    <IconButtonComponent
      theme={mockTheme}
      iconName="menu"
      testID="icon-button"
      {...props}
    />
  );

describe('IconButton Component', () => {
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      expect(() => renderIconButton()).not.toThrow();
    });

    it('renders container View with testID', () => {
      const { getByTestId } = renderIconButton();
      expect(getByTestId('icon-button')).toBeTruthy();
    });

    it('renders Icon component', () => {
      const { getByTestId } = renderIconButton();
      expect(getByTestId('icon')).toBeTruthy();
    });
  });

  describe('Size Handling', () => {
    it('uses default size of 36 when not provided', () => {
      const { getByTestId } = renderIconButton();
      const container = getByTestId('icon-button');
      expect(container.props.style).toMatchObject({
        width: 36,
        height: 36,
        borderRadius: 18,
      });
    });

    it('applies custom size prop', () => {
      const { getByTestId } = renderIconButton({ size: 48 });
      const container = getByTestId('icon-button');
      expect(container.props.style).toMatchObject({
        width: 48,
        height: 48,
        borderRadius: 24,
      });
    });

    it('passes size to Icon component', () => {
      const { getByTestId } = renderIconButton({ size: 56 });
      const icon = getByTestId('icon');
      expect(icon.props.size).toBe(56);
    });
  });

  describe('Color Handling', () => {
    it('uses theme primary color by default', () => {
      const { getByTestId } = renderIconButton();
      const icon = getByTestId('icon');
      expect(icon.props.color).toBe(mockTheme.colors.primary);
    });

    it('applies custom color prop', () => {
      const { getByTestId } = renderIconButton({ color: '#ff0000' });
      const icon = getByTestId('icon');
      expect(icon.props.color).toBe('#ff0000');
    });

    it('passes noIconTint to Icon', () => {
      const { getByTestId } = renderIconButton({ noIconTint: true });
      const icon = getByTestId('icon');
      expect(icon.props.noIconTint).toBe(true);
    });
  });

  describe('Icon Props', () => {
    it('passes iconName to Icon component', () => {
      const { getByTestId } = renderIconButton({ iconName: 'settings' });
      const icon = getByTestId('icon');
      expect(icon.props.iconName).toBe('settings');
    });

    it('passes image prop to Icon', () => {
      const imageSource = 123;
      const { getByTestId } = renderIconButton({ image: imageSource });
      const icon = getByTestId('icon');
      expect(icon.props.image).toBe(imageSource);
    });

    it('passes vector prop to Icon', () => {
      const vectorSource = 456;
      const { getByTestId } = renderIconButton({ vector: vectorSource });
      const icon = getByTestId('icon');
      expect(icon.props.vector).toBe(vectorSource);
    });

    it('passes iconPercent to Icon', () => {
      const { getByTestId } = renderIconButton({ iconPercent: 80 });
      const icon = getByTestId('icon');
      expect(icon.props.iconPercent).toBe(80);
    });
  });

  describe('Disabled State', () => {
    it('applies full opacity when enabled', () => {
      const { getByTestId } = renderIconButton({ disabled: false });
      const container = getByTestId('icon-button');
      expect(container.props.style).toMatchObject({ opacity: 1.0 });
    });

    it('applies reduced opacity when disabled', () => {
      const { getByTestId } = renderIconButton({ disabled: true });
      const container = getByTestId('icon-button');
      expect(container.props.style).toMatchObject({ opacity: 0.5 });
    });

    it('passes disabled to TouchableRipple', () => {
      const { UNSAFE_getByType } = renderIconButton({ disabled: true });
      const touchable = UNSAFE_getByType(
        require('react-native-paper').TouchableRipple
      );
      expect(touchable.props.disabled).toBe(true);
    });
  });

  describe('Press Handlers', () => {
    it('passes onPress to TouchableRipple', () => {
      const onPress = jest.fn();
      const { UNSAFE_getByType } = renderIconButton({ onPress });
      const touchable = UNSAFE_getByType(
        require('react-native-paper').TouchableRipple
      );
      expect(touchable.props.onPress).toBe(onPress);
    });

    it('passes onLongPress to TouchableRipple', () => {
      const onLongPress = jest.fn();
      const { UNSAFE_getByType } = renderIconButton({ onLongPress });
      const touchable = UNSAFE_getByType(
        require('react-native-paper').TouchableRipple
      );
      expect(touchable.props.onLongPress).toBe(onLongPress);
    });

    it('passes onPressIn to TouchableRipple', () => {
      const onPressIn = jest.fn();
      const { UNSAFE_getByType } = renderIconButton({ onPressIn });
      const touchable = UNSAFE_getByType(
        require('react-native-paper').TouchableRipple
      );
      expect(touchable.props.onPressIn).toBe(onPressIn);
    });

    it('passes onPressOut to TouchableRipple', () => {
      const onPressOut = jest.fn();
      const { UNSAFE_getByType } = renderIconButton({ onPressOut });
      const touchable = UNSAFE_getByType(
        require('react-native-paper').TouchableRipple
      );
      expect(touchable.props.onPressOut).toBe(onPressOut);
    });
  });

  describe('Style Composition', () => {
    it('applies custom style prop', () => {
      const customStyle = { marginTop: 10, backgroundColor: 'red' };
      const { getByTestId } = renderIconButton({ style: customStyle });
      const container = getByTestId('icon-button');
      expect(container.props.style).toMatchObject(customStyle);
    });

    it('merges custom style with default styles', () => {
      const customStyle = { marginHorizontal: 8 };
      const { getByTestId } = renderIconButton({
        style: customStyle,
        size: 40,
      });
      const container = getByTestId('icon-button');
      expect(container.props.style).toMatchObject({
        width: 40,
        height: 40,
        marginHorizontal: 8,
      });
    });
  });

  describe('Ripple Color', () => {
    it('generates ripple color with alpha from icon color', () => {
      const { UNSAFE_getByType } = renderIconButton({ color: '#ff0000' });
      const touchable = UNSAFE_getByType(
        require('react-native-paper').TouchableRipple
      );
      expect(touchable.props.rippleColor).toBeDefined();
      expect(typeof touchable.props.rippleColor).toBe('string');
    });

    it('generates ripple color from theme primary when no color provided', () => {
      const { UNSAFE_getByType } = renderIconButton();
      const touchable = UNSAFE_getByType(
        require('react-native-paper').TouchableRipple
      );
      expect(touchable.props.rippleColor).toBeDefined();
    });
  });
});
