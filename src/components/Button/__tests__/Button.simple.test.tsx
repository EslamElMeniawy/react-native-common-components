import { render } from '@testing-library/react-native';
import { ButtonComponent } from '../Button';
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

// Mock MaterialDesignIcons
jest.mock('@react-native-vector-icons/material-design-icons', () => ({
  MaterialDesignIcons: 'MaterialDesignIcons',
}));

describe('Button Component - Rendering', () => {
  describe('Basic Rendering', () => {
    it('should render Button component without error', () => {
      expect(() => {
        render(<ButtonComponent theme={mockTheme} text="Test Button" />);
      }).not.toThrow();
    });

    it('should render with text prop', () => {
      const { getByText } = render(
        <ButtonComponent theme={mockTheme} text="Test Button" />
      );
      const text = getByText('Test Button');
      expect(text).toBeTruthy();
    });

    it('should render without text prop', () => {
      expect(() => {
        render(<ButtonComponent theme={mockTheme} />);
      }).not.toThrow();
    });
  });

  describe('Text Variants', () => {
    it('should render with long text', () => {
      const longText =
        'This is a very long button text that spans multiple lines';
      const { getByText } = render(
        <ButtonComponent theme={mockTheme} text={longText} />
      );
      expect(getByText(longText)).toBeTruthy();
    });

    it('should render with special characters in text', () => {
      const specialText = 'Button @#$%^&*()';
      const { getByText } = render(
        <ButtonComponent theme={mockTheme} text={specialText} />
      );
      expect(getByText(specialText)).toBeTruthy();
    });

    it('should render with empty string text', () => {
      expect(() => {
        render(<ButtonComponent theme={mockTheme} text="" />);
      }).not.toThrow();
    });
  });

  describe('Disabled State', () => {
    it('should render disabled button', () => {
      expect(() => {
        render(
          <ButtonComponent theme={mockTheme} text="Disabled" disabled={true} />
        );
      }).not.toThrow();
    });

    it('should render enabled button', () => {
      expect(() => {
        render(
          <ButtonComponent theme={mockTheme} text="Enabled" disabled={false} />
        );
      }).not.toThrow();
    });
  });

  describe('Icon Props', () => {
    it('should render with start icon name', () => {
      expect(() => {
        render(
          <ButtonComponent
            theme={mockTheme}
            text="With Icon"
            startIconName="home"
          />
        );
      }).not.toThrow();
    });

    it('should render with end icon name', () => {
      expect(() => {
        render(
          <ButtonComponent
            theme={mockTheme}
            text="With Icon"
            endIconName="arrow-right"
          />
        );
      }).not.toThrow();
    });

    it('should render with both start and end icons', () => {
      expect(() => {
        render(
          <ButtonComponent
            theme={mockTheme}
            text="With Icons"
            startIconName="home"
            endIconName="arrow-right"
          />
        );
      }).not.toThrow();
    });

    it('should render with custom icon size', () => {
      expect(() => {
        render(
          <ButtonComponent
            theme={mockTheme}
            text="Custom Icon Size"
            startIconName="home"
            startIconSize={32}
          />
        );
      }).not.toThrow();
    });

    it('should render with custom icon color', () => {
      expect(() => {
        render(
          <ButtonComponent
            theme={mockTheme}
            text="Custom Icon Color"
            startIconName="home"
            startIconColor="#FF5722"
          />
        );
      }).not.toThrow();
    });

    it('should render with noIconTint prop', () => {
      expect(() => {
        render(
          <ButtonComponent
            theme={mockTheme}
            text="No Tint"
            startIconName="home"
            noIconTint={true}
          />
        );
      }).not.toThrow();
    });

    it('should render with noStartIconTint prop', () => {
      expect(() => {
        render(
          <ButtonComponent
            theme={mockTheme}
            text="No Start Tint"
            startIconName="home"
            noStartIconTint={true}
          />
        );
      }).not.toThrow();
    });

    it('should render with noEndIconTint prop', () => {
      expect(() => {
        render(
          <ButtonComponent
            theme={mockTheme}
            text="No End Tint"
            endIconName="arrow-right"
            noEndIconTint={true}
          />
        );
      }).not.toThrow();
    });

    // Enhanced Icon Tests for Coverage
    it('should render with various start icon names', () => {
      const iconNames = ['menu', 'close', 'search', 'delete', 'edit', 'add'];
      iconNames.forEach((iconName) => {
        expect(() => {
          render(
            <ButtonComponent
              theme={mockTheme}
              text={`Icon: ${iconName}`}
              startIconName={iconName}
            />
          );
        }).not.toThrow();
      });
    });

    it('should render with various end icon names', () => {
      const iconNames = [
        'arrow-right',
        'arrow-left',
        'check',
        'close',
        'star',
        'heart',
      ];
      iconNames.forEach((iconName) => {
        expect(() => {
          render(
            <ButtonComponent
              theme={mockTheme}
              text={`Icon: ${iconName}`}
              endIconName={iconName}
            />
          );
        }).not.toThrow();
      });
    });

    it('should render with various icon sizes', () => {
      const sizes = [16, 20, 24, 28, 32, 40];
      sizes.forEach((size) => {
        expect(() => {
          render(
            <ButtonComponent
              theme={mockTheme}
              text={`Size: ${size}`}
              startIconName="home"
              startIconSize={size}
            />
          );
        }).not.toThrow();
      });
    });

    it('should render with various icon colors', () => {
      const colors = [
        '#FF0000',
        '#00FF00',
        '#0000FF',
        '#FFFF00',
        '#FF00FF',
        '#00FFFF',
      ];
      colors.forEach((color) => {
        expect(() => {
          render(
            <ButtonComponent
              theme={mockTheme}
              text="Icon Color"
              startIconName="home"
              startIconColor={color}
            />
          );
        }).not.toThrow();
      });
    });

    it('should render with start and end icons of different sizes', () => {
      expect(() => {
        render(
          <ButtonComponent
            theme={mockTheme}
            text="Different Sizes"
            startIconName="home"
            startIconSize={20}
            endIconName="arrow-right"
            endIconSize={32}
          />
        );
      }).not.toThrow();
    });

    it('should render with start and end icons of different colors', () => {
      expect(() => {
        render(
          <ButtonComponent
            theme={mockTheme}
            text="Different Colors"
            startIconName="home"
            startIconColor="#FF0000"
            endIconName="arrow-right"
            endIconColor="#00FF00"
          />
        );
      }).not.toThrow();
    });

    it('should render with iconSize prop', () => {
      expect(() => {
        render(
          <ButtonComponent
            theme={mockTheme}
            text="Icon Size"
            iconSize={28}
            startIconName="home"
            endIconName="arrow-right"
          />
        );
      }).not.toThrow();
    });

    it('should render with individual sizes overriding iconSize', () => {
      expect(() => {
        render(
          <ButtonComponent
            theme={mockTheme}
            text="Override Size"
            iconSize={24}
            startIconName="home"
            startIconSize={32}
            endIconName="arrow-right"
            endIconSize={28}
          />
        );
      }).not.toThrow();
    });

    it('should render with noIconTint and specific icon colors', () => {
      expect(() => {
        render(
          <ButtonComponent
            theme={mockTheme}
            text="No Tint with Color"
            noIconTint={true}
            startIconName="home"
            startIconColor="#FF0000"
          />
        );
      }).not.toThrow();
    });

    it('should render with mixed tint settings', () => {
      expect(() => {
        render(
          <ButtonComponent
            theme={mockTheme}
            text="Mixed Tint"
            noStartIconTint={true}
            startIconName="home"
            noEndIconTint={false}
            endIconName="arrow-right"
            endIconColor="#00FF00"
          />
        );
      }).not.toThrow();
    });

    it('should render icons without text', () => {
      expect(() => {
        render(
          <ButtonComponent
            theme={mockTheme}
            startIconName="home"
            endIconName="arrow-right"
          />
        );
      }).not.toThrow();
    });

    it('should render with start icon only, no text', () => {
      expect(() => {
        render(<ButtonComponent theme={mockTheme} startIconName="add" />);
      }).not.toThrow();
    });

    it('should render with end icon only, no text', () => {
      expect(() => {
        render(<ButtonComponent theme={mockTheme} endIconName="arrow-right" />);
      }).not.toThrow();
    });

    it('should render disabled button with icons', () => {
      expect(() => {
        render(
          <ButtonComponent
            theme={mockTheme}
            text="Disabled"
            disabled={true}
            startIconName="lock"
            endIconName="info"
          />
        );
      }).not.toThrow();
    });

    it('should render with icons and custom style', () => {
      const style = { marginVertical: 10, backgroundColor: '#CCCCCC' };
      expect(() => {
        render(
          <ButtonComponent
            theme={mockTheme}
            text="Styled Icons"
            startIconName="home"
            endIconName="arrow-right"
            style={style}
          />
        );
      }).not.toThrow();
    });
  });

  describe('Event Handlers', () => {
    it('should render with onPress handler', () => {
      const onPress = jest.fn();
      expect(() => {
        render(
          <ButtonComponent theme={mockTheme} text="Press" onPress={onPress} />
        );
      }).not.toThrow();
    });

    it('should render with onLongPress handler', () => {
      const onLongPress = jest.fn();
      expect(() => {
        render(
          <ButtonComponent
            theme={mockTheme}
            text="Long Press"
            onLongPress={onLongPress}
          />
        );
      }).not.toThrow();
    });

    it('should render with onPressIn handler', () => {
      const onPressIn = jest.fn();
      expect(() => {
        render(
          <ButtonComponent
            theme={mockTheme}
            text="Press In"
            onPressIn={onPressIn}
          />
        );
      }).not.toThrow();
    });

    it('should render with onPressOut handler', () => {
      const onPressOut = jest.fn();
      expect(() => {
        render(
          <ButtonComponent
            theme={mockTheme}
            text="Press Out"
            onPressOut={onPressOut}
          />
        );
      }).not.toThrow();
    });

    it('should render with all event handlers', () => {
      const onPress = jest.fn();
      const onLongPress = jest.fn();
      const onPressIn = jest.fn();
      const onPressOut = jest.fn();
      expect(() => {
        render(
          <ButtonComponent
            theme={mockTheme}
            text="All Handlers"
            onPress={onPress}
            onLongPress={onLongPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
          />
        );
      }).not.toThrow();
    });
  });

  describe('Styling Props', () => {
    it('should render with custom style', () => {
      expect(() => {
        render(
          <ButtonComponent
            theme={mockTheme}
            text="Styled"
            style={{ marginTop: 10 }}
          />
        );
      }).not.toThrow();
    });

    it('should render with multiple style variants', () => {
      expect(() => {
        render(
          <ButtonComponent
            theme={mockTheme}
            text="Multi Style"
            style={[{ marginTop: 10 }, { paddingHorizontal: 20 }]}
          />
        );
      }).not.toThrow();
    });
  });

  describe('Text Props', () => {
    it('should render with custom textProps', () => {
      expect(() => {
        render(
          <ButtonComponent
            theme={mockTheme}
            text="Custom Text"
            textProps={{ numberOfLines: 1 }}
          />
        );
      }).not.toThrow();
    });
  });

  describe('Complex Combinations', () => {
    it('should render with text, icons, and handlers', () => {
      const onPress = jest.fn();
      expect(() => {
        render(
          <ButtonComponent
            theme={mockTheme}
            text="Complete Button"
            startIconName="home"
            endIconName="arrow-right"
            onPress={onPress}
            startIconColor="#FF5722"
            endIconColor="#4CAF50"
          />
        );
      }).not.toThrow();
    });

    it('should render with all props combined', () => {
      const onPress = jest.fn();
      const onLongPress = jest.fn();
      expect(() => {
        render(
          <ButtonComponent
            theme={mockTheme}
            text="Full Button"
            disabled={false}
            startIconName="home"
            startIconSize={28}
            startIconColor="#FF5722"
            noStartIconTint={false}
            endIconName="arrow-right"
            endIconSize={24}
            endIconColor="#4CAF50"
            noEndIconTint={false}
            onPress={onPress}
            onLongPress={onLongPress}
            onPressIn={jest.fn()}
            onPressOut={jest.fn()}
            iconSize={24}
            noIconTint={false}
            style={{ marginVertical: 8 }}
            textProps={{ numberOfLines: 1 }}
          />
        );
      }).not.toThrow();
    });

    it('should render disabled button with icons and text', () => {
      expect(() => {
        render(
          <ButtonComponent
            theme={mockTheme}
            text="Disabled Button"
            disabled={true}
            startIconName="lock"
            endIconName="info"
          />
        );
      }).not.toThrow();
    });
  });
});
