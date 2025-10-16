// External imports.
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { withTheme } from 'react-native-paper';

// Types imports.
import type { PropsWithTheme } from './Accordion.types';
import type { LayoutChangeEvent } from 'react-native';

// Internal imports.
import styles from './Accordion.styles';
import { IconButton } from '../IconButton';

const SafeAccordion = React.memo<PropsWithTheme>(
  (props: PropsWithTheme): React.ReactElement => {
    const {
      containerStyle,
      headerContainerStyle,
      headerContent,
      iconButtonProps,
      children,
      theme,
    } = props;

    const {
      iconName,
      color,
      onPress: onIconPress,
      ...restIconProps
    } = iconButtonProps ?? {};

    const Animated = require('react-native-reanimated').default;
    const useSharedValue = require('react-native-reanimated').useSharedValue;

    const useAnimatedStyle =
      require('react-native-reanimated').useAnimatedStyle;

    const withTiming = require('react-native-reanimated').withTiming;
    const Easing = require('react-native-reanimated').Easing;
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [measuredHeight, setMeasuredHeight] = React.useState(0);
    const height = useSharedValue(0);
    const rotation = useSharedValue(0);

    const onTogglePress = React.useCallback(() => {
      setIsExpanded(!isExpanded);

      if (!isExpanded) {
        height.value = withTiming(measuredHeight, {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        });

        rotation.value = withTiming(180, {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        });
      } else {
        height.value = withTiming(0, {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        });

        rotation.value = withTiming(0, {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        });
      }

      onIconPress?.();
    }, [
      Easing,
      height,
      isExpanded,
      measuredHeight,
      onIconPress,
      rotation,
      withTiming,
    ]);

    const onLayout = React.useCallback(
      (event: LayoutChangeEvent) => {
        if (measuredHeight === 0) {
          setMeasuredHeight(event.nativeEvent.layout.height);
        }
      },
      [measuredHeight]
    );

    const animatedHeightStyle = useAnimatedStyle(() => ({
      height: height.value,
      overflow: 'hidden',
    }));

    const animatedArrowStyle = useAnimatedStyle(() => ({
      transform: [{ rotateZ: `${rotation.value}deg` }],
    }));

    return (
      <View
        style={StyleSheet.flatten([
          { backgroundColor: theme.colors.background },
          containerStyle,
        ])}
      >
        <View style={styles.headerRow}>
          <View
            style={StyleSheet.flatten([
              styles.headerContainer,
              headerContainerStyle,
            ])}
          >
            {headerContent}
          </View>
          <Animated.View style={animatedArrowStyle}>
            <IconButton
              iconName={iconName ?? 'chevron-down'}
              color={
                color ??
                (theme.isV3 ? theme.colors.onBackground : theme.colors.text)
              }
              onPress={onTogglePress}
              {...restIconProps}
            />
          </Animated.View>
        </View>
        <Animated.View style={animatedHeightStyle}>
          <View style={styles.measuringContainer} onLayout={onLayout}>
            {children}
          </View>
          <View>{children}</View>
        </Animated.View>
      </View>
    );
  }
);

const Accordion = React.memo<PropsWithTheme>(
  (props: PropsWithTheme): React.ReactElement | null => {
    try {
      require('react-native-reanimated');
      return <SafeAccordion {...props} />;
    } catch (error) {
      console.warn('Error loading `react-native-reanimated`:', error);
      return null;
    }
  }
);

export default withTheme(Accordion);
