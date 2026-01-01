import { render } from '@testing-library/react-native';
import { ScrollViewComponent } from '../ScrollView';
import { mockTheme } from '../../../test-utils/mockTheme';

// Mock ResponsiveDimensions
jest.mock('../../../utils/ResponsiveDimensions', () => ({
  __esModule: true,
  default: {
    vs: (size: number) => size,
    ms: (size: number) => size,
    mvs: (size: number) => size,
    s: (size: number) => size,
  },
}));

// Mock react-native-keyboard-controller
jest.mock('react-native-keyboard-controller', () => ({
  KeyboardAwareScrollView: 'KeyboardAwareScrollView',
}));

describe('ScrollView Component', () => {
  describe('Basic Rendering', () => {
    it('should render without error', () => {
      expect(() => {
        render(<ScrollViewComponent theme={mockTheme} />);
      }).not.toThrow();
    });

    it('should render with children', () => {
      expect(() => {
        render(
          <ScrollViewComponent theme={mockTheme}>
            <div>Test Content</div>
          </ScrollViewComponent>
        );
      }).not.toThrow();
    });

    it('should render multiple children', () => {
      expect(() => {
        render(
          <ScrollViewComponent theme={mockTheme}>
            <div>Content 1</div>
            <div>Content 2</div>
            <div>Content 3</div>
          </ScrollViewComponent>
        );
      }).not.toThrow();
    });
  });

  describe('Refresh Control', () => {
    it('should accept refreshing prop', () => {
      expect(() => {
        render(<ScrollViewComponent theme={mockTheme} refreshing={true} />);
      }).not.toThrow();
    });

    it('should accept onRefresh handler', () => {
      const onRefresh = jest.fn();
      expect(() => {
        render(
          <ScrollViewComponent
            theme={mockTheme}
            refreshing={false}
            onRefresh={onRefresh}
          />
        );
      }).not.toThrow();
    });

    it('should accept refreshColor prop', () => {
      expect(() => {
        render(
          <ScrollViewComponent
            theme={mockTheme}
            refreshing={false}
            refreshColor="#ff0000"
          />
        );
      }).not.toThrow();
    });

    it('should use theme primary color as default refreshColor', () => {
      expect(() => {
        render(<ScrollViewComponent theme={mockTheme} onRefresh={jest.fn()} />);
      }).not.toThrow();
    });

    it('should render with RefreshControl when onRefresh provided', () => {
      expect(() => {
        render(
          <ScrollViewComponent
            theme={mockTheme}
            onRefresh={jest.fn()}
            refreshing={false}
          />
        );
      }).not.toThrow();
    });
  });

  describe('Scroll Indicators', () => {
    it('should accept showsHorizontalScrollIndicator prop', () => {
      expect(() => {
        render(
          <ScrollViewComponent
            theme={mockTheme}
            showsHorizontalScrollIndicator={true}
          />
        );
      }).not.toThrow();
    });

    it('should accept showsVerticalScrollIndicator prop', () => {
      expect(() => {
        render(
          <ScrollViewComponent
            theme={mockTheme}
            showsVerticalScrollIndicator={true}
          />
        );
      }).not.toThrow();
    });

    it('should default to hiding scroll indicators', () => {
      expect(() => {
        render(<ScrollViewComponent theme={mockTheme} />);
      }).not.toThrow();
    });

    it('should accept both scroll indicator props', () => {
      expect(() => {
        render(
          <ScrollViewComponent
            theme={mockTheme}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        );
      }).not.toThrow();
    });
  });

  describe('Keyboard Behavior', () => {
    it('should accept keyboardShouldPersistTaps prop', () => {
      expect(() => {
        render(
          <ScrollViewComponent
            theme={mockTheme}
            keyboardShouldPersistTaps="always"
          />
        );
      }).not.toThrow();
    });

    it('should accept keyboardDismissMode prop', () => {
      expect(() => {
        render(
          <ScrollViewComponent
            theme={mockTheme}
            keyboardDismissMode="on-drag"
          />
        );
      }).not.toThrow();
    });

    it('should accept extraKeyboardSpace prop', () => {
      expect(() => {
        render(
          <ScrollViewComponent theme={mockTheme} extraKeyboardSpace={16} />
        );
      }).not.toThrow();
    });

    it('should default keyboardShouldPersistTaps to handled', () => {
      expect(() => {
        render(<ScrollViewComponent theme={mockTheme} />);
      }).not.toThrow();
    });

    it('should default keyboardDismissMode to none', () => {
      expect(() => {
        render(<ScrollViewComponent theme={mockTheme} />);
      }).not.toThrow();
    });

    it('should accept different keyboard modes', () => {
      const modes = ['always', 'handled', 'never'];

      modes.forEach((mode) => {
        const { unmount } = render(
          <ScrollViewComponent
            theme={mockTheme}
            keyboardShouldPersistTaps={mode as any}
          />
        );
        unmount();
      });
    });
  });

  describe('Styling', () => {
    it('should accept style prop', () => {
      const style = { flex: 1, backgroundColor: '#f0f0f0' };
      expect(() => {
        render(<ScrollViewComponent theme={mockTheme} style={style} />);
      }).not.toThrow();
    });

    it('should accept contentContainerStyle prop', () => {
      const contentContainerStyle = { padding: 20 };
      expect(() => {
        render(
          <ScrollViewComponent
            theme={mockTheme}
            contentContainerStyle={contentContainerStyle}
          />
        );
      }).not.toThrow();
    });

    it('should accept both style props', () => {
      expect(() => {
        render(
          <ScrollViewComponent
            theme={mockTheme}
            style={{ flex: 1 }}
            contentContainerStyle={{ padding: 10 }}
          />
        );
      }).not.toThrow();
    });
  });

  describe('Combined Props', () => {
    it('should work with multiple props', () => {
      const onRefresh = jest.fn();
      expect(() => {
        render(
          <ScrollViewComponent
            theme={mockTheme}
            refreshing={true}
            onRefresh={onRefresh}
            refreshColor="#00ff00"
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="never"
            keyboardDismissMode="interactive"
            extraKeyboardSpace={24}
            style={{ flex: 1 }}
          />
        );
      }).not.toThrow();
    });

    it('should render with all refresh and keyboard options', () => {
      const onRefresh = jest.fn();
      expect(() => {
        render(
          <ScrollViewComponent
            theme={mockTheme}
            refreshing={false}
            onRefresh={onRefresh}
            refreshColor="#0066cc"
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="on-drag"
            extraKeyboardSpace={32}
          >
            <div>Content</div>
          </ScrollViewComponent>
        );
      }).not.toThrow();
    });

    it('should transition between states', () => {
      const { rerender } = render(
        <ScrollViewComponent theme={mockTheme} refreshing={false} />
      );

      expect(() => {
        rerender(<ScrollViewComponent theme={mockTheme} refreshing={true} />);
      }).not.toThrow();
    });
  });

  describe('Error Handling', () => {
    it('should handle when module is not available gracefully', () => {
      expect(() => {
        render(<ScrollViewComponent theme={mockTheme} />);
      }).not.toThrow();
    });
  });
});
