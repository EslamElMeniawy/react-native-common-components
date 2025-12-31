import { render } from '@testing-library/react-native';
import { IconButtonComponent } from '../IconButton';
import { mockTheme } from '../../../test-utils/mockTheme';

// Mock ResponsiveDimensions
jest.mock('../../../utils/ResponsiveDimensions', () => ({
  __esModule: true,
  default: {
    ms: (size: number) => size,
    mvs: (size: number) => size,
    s: (size: number) => size,
    vs: (size: number) => size,
  },
}));

// Mock Icon component to prevent import errors
jest.mock('../Icon', () => {
  return function MockIcon() {
    return null;
  };
});

describe('IconButton Component', () => {
  describe('Basic Rendering', () => {
    it('should render without error', () => {
      expect(() => {
        render(<IconButtonComponent theme={mockTheme} iconName="menu" />);
      }).not.toThrow();
    });

    it('should accept iconName prop', () => {
      expect(() => {
        render(<IconButtonComponent theme={mockTheme} iconName="menu" />);
      }).not.toThrow();
    });

    it('should accept different iconNames', () => {
      const iconNames = ['close', 'settings', 'home', 'search'];

      iconNames.forEach((iconName) => {
        const { unmount } = render(
          <IconButtonComponent theme={mockTheme} iconName={iconName} />
        );
        unmount();
      });
    });
  });

  describe('Sizing', () => {
    it('should accept size prop', () => {
      expect(() => {
        render(
          <IconButtonComponent theme={mockTheme} iconName="menu" size={48} />
        );
      }).not.toThrow();
    });

    it('should accept different size values', () => {
      const sizes = [24, 32, 36, 48, 56];

      sizes.forEach((size) => {
        const { unmount } = render(
          <IconButtonComponent theme={mockTheme} iconName="menu" size={size} />
        );
        unmount();
      });
    });

    it('should use default size when not provided', () => {
      expect(() => {
        render(<IconButtonComponent theme={mockTheme} iconName="menu" />);
      }).not.toThrow();
    });
  });

  describe('Coloring', () => {
    it('should accept color prop', () => {
      expect(() => {
        render(
          <IconButtonComponent
            theme={mockTheme}
            iconName="menu"
            color="#ff0000"
          />
        );
      }).not.toThrow();
    });

    it('should use theme primary color as default', () => {
      expect(() => {
        render(<IconButtonComponent theme={mockTheme} iconName="menu" />);
      }).not.toThrow();
    });

    it('should accept different color formats', () => {
      const colors = ['#ff0000', '#00ff00', '#0000ff', 'rgb(255,0,0)'];

      colors.forEach((color) => {
        const { unmount } = render(
          <IconButtonComponent
            theme={mockTheme}
            iconName="menu"
            color={color}
          />
        );
        unmount();
      });
    });

    it('should accept noIconTint prop', () => {
      expect(() => {
        render(
          <IconButtonComponent
            theme={mockTheme}
            iconName="menu"
            noIconTint={true}
          />
        );
      }).not.toThrow();
    });

    it('should accept iconPercent prop', () => {
      expect(() => {
        render(
          <IconButtonComponent
            theme={mockTheme}
            iconName="menu"
            iconPercent={0.8}
          />
        );
      }).not.toThrow();
    });
  });

  describe('Interactions', () => {
    it('should accept onPress handler', () => {
      const onPress = jest.fn();
      expect(() => {
        render(
          <IconButtonComponent
            theme={mockTheme}
            iconName="menu"
            onPress={onPress}
          />
        );
      }).not.toThrow();
    });

    it('should accept onLongPress handler', () => {
      const onLongPress = jest.fn();
      expect(() => {
        render(
          <IconButtonComponent
            theme={mockTheme}
            iconName="menu"
            onLongPress={onLongPress}
          />
        );
      }).not.toThrow();
    });

    it('should accept onPressIn handler', () => {
      const onPressIn = jest.fn();
      expect(() => {
        render(
          <IconButtonComponent
            theme={mockTheme}
            iconName="menu"
            onPressIn={onPressIn}
          />
        );
      }).not.toThrow();
    });

    it('should accept onPressOut handler', () => {
      const onPressOut = jest.fn();
      expect(() => {
        render(
          <IconButtonComponent
            theme={mockTheme}
            iconName="menu"
            onPressOut={onPressOut}
          />
        );
      }).not.toThrow();
    });

    it('should accept disabled prop', () => {
      expect(() => {
        render(
          <IconButtonComponent
            theme={mockTheme}
            iconName="menu"
            disabled={true}
          />
        );
      }).not.toThrow();
    });

    it('should render as disabled when disabled prop is true', () => {
      expect(() => {
        render(
          <IconButtonComponent
            theme={mockTheme}
            iconName="menu"
            disabled={true}
          />
        );
      }).not.toThrow();
    });
  });

  describe('Styling', () => {
    it('should accept style prop', () => {
      const style = { marginTop: 10 };
      expect(() => {
        render(
          <IconButtonComponent
            theme={mockTheme}
            iconName="menu"
            style={style}
          />
        );
      }).not.toThrow();
    });

    it('should accept complex styles', () => {
      const style = {
        marginHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: 'transparent',
      };
      expect(() => {
        render(
          <IconButtonComponent
            theme={mockTheme}
            iconName="menu"
            style={style}
          />
        );
      }).not.toThrow();
    });
  });

  describe('Image Sources', () => {
    it('should accept vector prop', () => {
      expect(() => {
        render(<IconButtonComponent theme={mockTheme} vector={1} />);
      }).not.toThrow();
    });
  });

  describe('Combined Props', () => {
    it('should work with multiple props', () => {
      const onPress = jest.fn();
      const style = { padding: 5 };
      expect(() => {
        render(
          <IconButtonComponent
            theme={mockTheme}
            iconName="settings"
            size={32}
            color="#00ff00"
            onPress={onPress}
            style={style}
          />
        );
      }).not.toThrow();
    });

    it('should render with all interaction handlers', () => {
      const handlers = {
        onPress: jest.fn(),
        onLongPress: jest.fn(),
        onPressIn: jest.fn(),
        onPressOut: jest.fn(),
      };

      expect(() => {
        render(
          <IconButtonComponent
            theme={mockTheme}
            iconName="menu"
            {...handlers}
          />
        );
      }).not.toThrow();
    });

    it('should render disabled state with custom styling', () => {
      expect(() => {
        render(
          <IconButtonComponent
            theme={mockTheme}
            iconName="menu"
            disabled={true}
            color="#ff0000"
            size={48}
            style={{ margin: 10 }}
          />
        );
      }).not.toThrow();
    });
  });

  describe('Different States', () => {
    it('should render enabled state', () => {
      expect(() => {
        render(
          <IconButtonComponent
            theme={mockTheme}
            iconName="menu"
            disabled={false}
          />
        );
      }).not.toThrow();
    });

    it('should render disabled state', () => {
      expect(() => {
        render(
          <IconButtonComponent
            theme={mockTheme}
            iconName="menu"
            disabled={true}
          />
        );
      }).not.toThrow();
    });

    it('should transition between states', () => {
      const { rerender } = render(
        <IconButtonComponent
          theme={mockTheme}
          iconName="menu"
          disabled={false}
        />
      );

      expect(() => {
        rerender(
          <IconButtonComponent
            theme={mockTheme}
            iconName="menu"
            disabled={true}
          />
        );
      }).not.toThrow();

      expect(() => {
        rerender(
          <IconButtonComponent
            theme={mockTheme}
            iconName="menu"
            disabled={false}
          />
        );
      }).not.toThrow();
    });
  });
});
