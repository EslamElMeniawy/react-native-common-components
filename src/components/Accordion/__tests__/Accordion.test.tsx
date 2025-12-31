import { render, fireEvent } from '@testing-library/react-native';
import { View } from 'react-native';
import { AccordionComponent } from '../Accordion';
import { mockTheme } from '../../../test-utils/mockTheme';

const mockSharedValues: Array<{ value: number }> = [];
const mockWithTiming = jest.fn((value: number) => value);

jest.mock('react-native-reanimated', () => {
  const ReactLib = require('react');
  return {
    __esModule: true,
    default: {
      View: (props: any) =>
        ReactLib.createElement('AnimatedView', props, props.children),
    },
    useSharedValue: (value: number) => {
      const ref = { value };
      mockSharedValues.push(ref);
      return ref;
    },
    useAnimatedStyle: (creator: () => Record<string, unknown>) => creator(),
    withTiming: mockWithTiming,
    Easing: {
      inOut: (fn: any) => fn,
      ease: {},
    },
    __mock: {
      sharedValues: mockSharedValues,
      withTiming: mockWithTiming,
    },
  };
});

jest.mock('react-native-paper', () => {
  const ReactNative = jest.requireActual('react-native');
  return {
    __esModule: true,
    TouchableRipple: ({
      onPress,
      children,
      testID = 'header-ripple',
      ...rest
    }: any) => (
      <ReactNative.TouchableOpacity onPress={onPress} testID={testID} {...rest}>
        {children}
      </ReactNative.TouchableOpacity>
    ),
    withTheme: (component: any) => component,
  };
});

jest.mock('../../IconButton', () => {
  const ReactLib = require('react');
  const IconButton = (props: any) =>
    ReactLib.createElement('IconButton', { testID: 'icon-button', ...props });
  return { IconButton, __esModule: true, default: IconButton };
});

const renderAccordion = (props?: Record<string, unknown>) =>
  render(
    <AccordionComponent
      theme={mockTheme}
      headerContent={<View testID="header-content" />}
      {...props}
    >
      <View testID="body-content" />
    </AccordionComponent>
  );

beforeEach(() => {
  mockSharedValues.length = 0;
  const { withTiming } = require('react-native-reanimated').__mock;
  withTiming.mockClear();
});

describe('Accordion Component', () => {
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      expect(() => renderAccordion()).not.toThrow();
    });

    it('renders header and body content', () => {
      const { getByTestId, getAllByTestId } = renderAccordion();
      expect(getByTestId('header-content')).toBeTruthy();
      expect(getAllByTestId('body-content').length).toBeGreaterThanOrEqual(1);
    });

    it('applies container background color from theme', () => {
      const { UNSAFE_getAllByType } = renderAccordion();
      const outer = UNSAFE_getAllByType(View)[0];
      expect(outer.props.style).toEqual(
        expect.objectContaining({
          backgroundColor: mockTheme.colors.background,
        })
      );
    });
  });

  describe('Icon Button', () => {
    it('renders default icon and color', () => {
      const { getByTestId } = renderAccordion();
      const iconButton = getByTestId('icon-button');
      expect(iconButton.props.iconName).toBe('chevron-down');
      expect(iconButton.props.color).toBe(mockTheme.colors.onBackground);
    });

    it('applies custom iconButtonProps', () => {
      const { getByTestId } = renderAccordion({
        iconButtonProps: { iconName: 'plus', color: '#123456', disabled: true },
      });
      const iconButton = getByTestId('icon-button');
      expect(iconButton.props.iconName).toBe('plus');
      expect(iconButton.props.color).toBe('#123456');
      expect(iconButton.props.disabled).toBe(true);
    });

    it('invokes iconButton onPress callback when toggled', () => {
      const onPress = jest.fn();
      const { getByTestId } = renderAccordion({ iconButtonProps: { onPress } });
      const iconButton = getByTestId('icon-button');
      fireEvent.press(iconButton);
      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('Toggle Behaviour', () => {
    it('expands to measured height on press', () => {
      const { getByTestId, UNSAFE_getAllByType } = renderAccordion();
      const measuringContainer = UNSAFE_getAllByType(View).find(
        (node) => typeof node.props.onLayout === 'function'
      );

      fireEvent(measuringContainer!, 'layout', {
        nativeEvent: { layout: { height: 120 } },
      });

      const ripple = getByTestId('header-ripple');
      fireEvent.press(ripple);

      const reanimatedMock = require('react-native-reanimated').__mock as {
        sharedValues: Array<{ value: number }>;
        withTiming: jest.Mock;
      };
      const { sharedValues, withTiming } = reanimatedMock;

      const heightValues = sharedValues
        .filter((_: unknown, index: number) => index % 2 === 0)
        .map(({ value }: { value: number }) => value);
      const rotationValues = sharedValues
        .filter((_: unknown, index: number) => index % 2 === 1)
        .map(({ value }: { value: number }) => value);

      expect(withTiming).toHaveBeenCalledWith(120, expect.anything());
      expect(withTiming).toHaveBeenCalledWith(180, expect.anything());
      expect(Math.max(...heightValues)).toBe(120);
      expect(Math.max(...rotationValues)).toBe(180);
    });

    it('collapses to zero on second press', () => {
      const { getByTestId, UNSAFE_getAllByType } = renderAccordion();
      const measuringContainer = UNSAFE_getAllByType(View).find(
        (node) => typeof node.props.onLayout === 'function'
      );

      fireEvent(measuringContainer!, 'layout', {
        nativeEvent: { layout: { height: 80 } },
      });

      const ripple = getByTestId('header-ripple');
      fireEvent.press(ripple);
      fireEvent.press(ripple);

      const { sharedValues } = require('react-native-reanimated').__mock;
      const [height, rotation] = sharedValues;

      expect(height.value).toBe(0);
      expect(rotation.value).toBe(0);
    });
  });

  describe('Style Props', () => {
    it('applies containerStyle and headerContainerStyle', () => {
      const containerStyle = { paddingHorizontal: 10 };
      const headerContainerStyle = { paddingVertical: 6 };
      const { getByTestId, UNSAFE_getAllByType } = renderAccordion({
        containerStyle,
        headerContainerStyle,
      });

      const rippleChildren = getByTestId('header-ripple').props.children as any;
      const headerWrapper = Array.isArray(rippleChildren)
        ? rippleChildren[0]
        : rippleChildren;

      expect(headerWrapper?.props?.style).toEqual(headerContainerStyle);

      const outer = UNSAFE_getAllByType(View)[0];
      expect(outer.props.style).toEqual(
        expect.objectContaining(containerStyle)
      );
    });
  });
});
