jest.mock('react-native', () => {
  const React = require('react');
  const RN = jest.requireActual('react-native');

  const flatListMock = jest.fn((props: any) =>
    React.createElement('FlatList', props, props.children)
  );

  const refreshControlMock = jest.fn((props: any) =>
    React.createElement('RefreshControl', props, props.children)
  );

  return {
    ...RN,
    FlatList: flatListMock,
    RefreshControl: refreshControlMock,
    StyleSheet: {
      compose: (style1: any, style2: any) => [style1, style2],
      create: (s: any) => s,
    },
    __mock: { flatListMock, refreshControlMock },
  };
});

import React from 'react';
import { render } from '@testing-library/react-native';
import { FlatListComponent } from '../FlatList';
import styles from '../FlatList.styles';
import { mockTheme } from '../../../test-utils/mockTheme';

let flatListMock: jest.Mock;

const defaultData = [{ key: '1' }, { key: '2' }];
const defaultRenderItem = jest.fn();

beforeAll(() => {
  const {
    __mock: { flatListMock: extractedFlatListMock },
  } = require('react-native');

  flatListMock = extractedFlatListMock;
});

const renderFlatList = (props?: Record<string, unknown>) => {
  flatListMock.mockClear();

  render(
    <FlatListComponent
      data={defaultData}
      renderItem={defaultRenderItem}
      theme={mockTheme}
      testID="flat-list"
      {...props}
    />
  );

  return flatListMock.mock.calls[0][0];
};

describe('FlatList Component', () => {
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      expect(() => renderFlatList()).not.toThrow();
    });

    it('passes data and renderItem', () => {
      const props = renderFlatList();
      expect(props.data).toBe(defaultData);
      expect(props.renderItem).toBe(defaultRenderItem);
    });

    it('honors provided testID and other props', () => {
      const props = renderFlatList({ testID: 'custom-id' });
      expect(props.testID).toBe('custom-id');
    });
  });

  describe('Defaults', () => {
    it('applies indicator and keyboard defaults', () => {
      const props = renderFlatList();
      expect(props.showsHorizontalScrollIndicator).toBe(false);
      expect(props.showsVerticalScrollIndicator).toBe(false);
      expect(props.keyboardShouldPersistTaps).toBe('handled');
      expect(props.keyboardDismissMode).toBe('none');
      expect(props.onEndReachedThreshold).toBe(0.01);
    });

    it('uses default keyExtractor when none provided', () => {
      const props = renderFlatList();
      expect(props.keyExtractor({ key: 'abc' })).toBe('abc');
    });

    it('uses theme color for refresh control when onRefresh provided', () => {
      const onRefresh = jest.fn();
      const props = renderFlatList({ onRefresh, refreshing: true });
      const refreshControl = props.refreshControl;
      expect(refreshControl.props.colors).toEqual([mockTheme.colors.primary]);
      expect(refreshControl.props.tintColor).toBe(mockTheme.colors.primary);
      expect(refreshControl.props.refreshing).toBe(true);
      expect(refreshControl.props.onRefresh).toBe(onRefresh);
    });

    it('omits refreshControl when no onRefresh or refreshControl provided', () => {
      const props = renderFlatList({ onRefresh: undefined });
      expect(props.refreshControl).toBeUndefined();
    });
  });

  describe('Prop Overrides', () => {
    it('applies custom keyExtractor', () => {
      const keyExtractor = jest.fn((item) => `${item.key}-custom`);
      const props = renderFlatList({ keyExtractor });
      expect(props.keyExtractor).toBe(keyExtractor);
      expect(props.keyExtractor({ key: '1' })).toBe('1-custom');
    });

    it('applies custom keyboard props', () => {
      const props = renderFlatList({
        keyboardShouldPersistTaps: 'always',
        keyboardDismissMode: 'on-drag',
        onEndReachedThreshold: 0.5,
      });
      expect(props.keyboardShouldPersistTaps).toBe('always');
      expect(props.keyboardDismissMode).toBe('on-drag');
      expect(props.onEndReachedThreshold).toBe(0.5);
    });

    it('passes indicator props through', () => {
      const props = renderFlatList({
        showsHorizontalScrollIndicator: true,
        showsVerticalScrollIndicator: true,
        horizontal: true,
      });
      expect(props.showsHorizontalScrollIndicator).toBe(true);
      expect(props.showsVerticalScrollIndicator).toBe(true);
      expect(props.horizontal).toBe(true);
    });

    it('applies style composition', () => {
      const customStyle = { flex: 2 };
      const props = renderFlatList({ style: customStyle });
      expect(props.style).toEqual([styles.list, customStyle]);
    });

    it('uses contentContainerStyle as-is when vertical', () => {
      const containerStyle = { paddingHorizontal: 16 };
      const props = renderFlatList({ contentContainerStyle: containerStyle });
      expect(props.contentContainerStyle).toBe(containerStyle);
    });

    it('composes horizontal content container style when horizontal', () => {
      const containerStyle = { paddingHorizontal: 8 };
      const props = renderFlatList({
        horizontal: true,
        contentContainerStyle: containerStyle,
      });
      expect(props.contentContainerStyle).toEqual([
        styles.horizontalContainerStyle,
        containerStyle,
      ]);
    });

    it('honors refreshColor when provided', () => {
      const onRefresh = jest.fn();
      const refreshColor = '#0066cc';
      const props = renderFlatList({
        onRefresh,
        refreshing: false,
        refreshColor,
      });
      const refreshControl = props.refreshControl;
      expect(refreshControl.props.colors).toEqual([refreshColor]);
      expect(refreshControl.props.tintColor).toBe(refreshColor);
      expect(refreshControl.props.refreshing).toBe(false);
    });

    it('uses provided refreshControl prop when supplied', () => {
      const customRefreshControl = {
        id: 'custom-control',
      } as unknown as React.ReactElement;
      const props = renderFlatList({
        refreshControl: customRefreshControl,
        refreshing: true,
      });

      expect(props.refreshControl).toBeTruthy();
      expect(props.refreshControl.props.colors).toEqual([
        mockTheme.colors.primary,
      ]);
      expect(props.refreshControl.props.refreshing).toBe(true);
    });
  });
});
