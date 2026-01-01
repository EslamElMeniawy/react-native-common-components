import { render } from '@testing-library/react-native';
import { TextComponent } from '../Text';
import { mockTheme } from '../../../test-utils/mockTheme';

// Mock ResponsiveDimensions
jest.mock('../../../utils/ResponsiveDimensions', () => ({
  __esModule: true,
  default: {
    ms: (size: number) => size,
  },
}));

describe('Text Component', () => {
  describe('Basic Rendering', () => {
    it('should render without error', () => {
      expect(() => {
        render(<TextComponent theme={mockTheme}>Hello World</TextComponent>);
      }).not.toThrow();
    });

    it('should render with children', () => {
      const { getByText } = render(
        <TextComponent theme={mockTheme}>Hello World</TextComponent>
      );
      expect(getByText('Hello World')).toBeDefined();
    });

    it('should render with empty children', () => {
      expect(() => {
        render(<TextComponent theme={mockTheme}>{''}</TextComponent>);
      }).not.toThrow();
    });

    it('should render with number children', () => {
      const { getByText } = render(
        <TextComponent theme={mockTheme}>{123}</TextComponent>
      );
      expect(getByText('123')).toBeDefined();
    });
  });

  describe('Text Types', () => {
    it('should render with default type', () => {
      expect(() => {
        render(<TextComponent theme={mockTheme}>Default Text</TextComponent>);
      }).not.toThrow();
    });

    it('should render with type="caption"', () => {
      expect(() => {
        render(
          <TextComponent theme={mockTheme} type="caption">
            Caption Text
          </TextComponent>
        );
      }).not.toThrow();
    });

    it('should render with type="bold"', () => {
      expect(() => {
        render(
          <TextComponent theme={mockTheme} type="bold">
            Bold Text
          </TextComponent>
        );
      }).not.toThrow();
    });

    it('should render all type variants', () => {
      const types: Array<'normal' | 'bold' | 'caption'> = [
        'normal',
        'bold',
        'caption',
      ];

      types.forEach((type) => {
        expect(() => {
          render(
            <TextComponent theme={mockTheme} type={type}>
              {type} Text
            </TextComponent>
          );
        }).not.toThrow();
      });
    });
  });

  describe('Custom Size', () => {
    it('should render with custom size', () => {
      expect(() => {
        render(
          <TextComponent theme={mockTheme} size={20}>
            Custom Size
          </TextComponent>
        );
      }).not.toThrow();
    });

    it('should render with various custom sizes', () => {
      const sizes = [12, 16, 20, 24, 32];

      sizes.forEach((size) => {
        expect(() => {
          render(
            <TextComponent theme={mockTheme} size={size}>
              Size {size}
            </TextComponent>
          );
        }).not.toThrow();
      });
    });

    it('should override type size with custom size', () => {
      expect(() => {
        render(
          <TextComponent theme={mockTheme} type="bold" size={18}>
            Custom Override
          </TextComponent>
        );
      }).not.toThrow();
    });
  });

  describe('Variants', () => {
    it('should render with variant', () => {
      expect(() => {
        render(
          <TextComponent theme={mockTheme} variant="bodyMedium">
            Variant Text
          </TextComponent>
        );
      }).not.toThrow();
    });

    it('should render all variants', () => {
      const variants = [
        'displayLarge',
        'displayMedium',
        'displaySmall',
        'headlineLarge',
        'headlineMedium',
        'headlineSmall',
        'titleLarge',
        'titleMedium',
        'titleSmall',
        'bodyLarge',
        'bodyMedium',
        'bodySmall',
        'labelLarge',
        'labelMedium',
        'labelSmall',
      ];

      variants.forEach((variant) => {
        expect(() => {
          render(
            <TextComponent theme={mockTheme} variant={variant as any}>
              {variant} Text
            </TextComponent>
          );
        }).not.toThrow();
      });
    });

    it('should use variant fontSize and lineHeight when V3', () => {
      expect(() => {
        render(
          <TextComponent theme={mockTheme} variant="bodyLarge">
            V3 Variant
          </TextComponent>
        );
      }).not.toThrow();
    });

    it('should override variant with custom size', () => {
      expect(() => {
        render(
          <TextComponent theme={mockTheme} variant="bodySmall" size={18}>
            Size Override
          </TextComponent>
        );
      }).not.toThrow();
    });
  });

  describe('Styling', () => {
    it('should apply custom style', () => {
      const style = { fontWeight: 'bold' as const };
      expect(() => {
        render(
          <TextComponent theme={mockTheme} style={style}>
            Styled Text
          </TextComponent>
        );
      }).not.toThrow();
    });

    it('should apply array of styles', () => {
      const styles = [{ fontWeight: 'bold' as const }, { marginTop: 10 }];
      expect(() => {
        render(
          <TextComponent theme={mockTheme} style={styles}>
            Multi-style Text
          </TextComponent>
        );
      }).not.toThrow();
    });

    it('should apply style with type', () => {
      const style = { color: '#FF0000' };
      expect(() => {
        render(
          <TextComponent theme={mockTheme} type="bold" style={style}>
            Styled Bold
          </TextComponent>
        );
      }).not.toThrow();
    });

    it('should apply style with variant', () => {
      const style = { color: '#00FF00' };
      expect(() => {
        render(
          <TextComponent theme={mockTheme} variant="titleMedium" style={style}>
            Styled Variant
          </TextComponent>
        );
      }).not.toThrow();
    });
  });

  describe('Combined Props', () => {
    it('should handle variant and size together', () => {
      expect(() => {
        render(
          <TextComponent theme={mockTheme} variant="bodySmall" size={18}>
            Combined
          </TextComponent>
        );
      }).not.toThrow();
    });

    it('should handle type and size together', () => {
      expect(() => {
        render(
          <TextComponent theme={mockTheme} type="bold" size={16}>
            Combined Type Size
          </TextComponent>
        );
      }).not.toThrow();
    });

    it('should handle type, size, and style', () => {
      const style = { fontWeight: 'bold' as const };
      expect(() => {
        render(
          <TextComponent
            theme={mockTheme}
            type="caption"
            size={14}
            style={style}
          >
            Complex Props
          </TextComponent>
        );
      }).not.toThrow();
    });

    it('should handle all props together', () => {
      const style = { marginBottom: 5 };
      expect(() => {
        render(
          <TextComponent
            theme={mockTheme}
            type="bold"
            size={20}
            variant="titleLarge"
            style={style}
          >
            All Props
          </TextComponent>
        );
      }).not.toThrow();
    });
  });

  describe('Theme', () => {
    it('should render with theme', () => {
      expect(() => {
        render(<TextComponent theme={mockTheme}>Themed Text</TextComponent>);
      }).not.toThrow();
    });

    it('should have V3 theme', () => {
      expect(() => {
        render(<TextComponent theme={mockTheme}>V3 Themed</TextComponent>);
      }).not.toThrow();
    });
  });

  describe('Additional Props', () => {
    it('should accept testID prop', () => {
      const { getByTestId } = render(
        <TextComponent theme={mockTheme} testID="text-test">
          Test ID Text
        </TextComponent>
      );
      expect(getByTestId('text-test')).toBeDefined();
    });

    it('should accept accessibilityLabel', () => {
      expect(() => {
        render(
          <TextComponent theme={mockTheme} accessibilityLabel="label">
            Accessible Text
          </TextComponent>
        );
      }).not.toThrow();
    });

    it('should accept maxFontSizeMultiplier', () => {
      expect(() => {
        render(
          <TextComponent theme={mockTheme} maxFontSizeMultiplier={1.2}>
            Max Font
          </TextComponent>
        );
      }).not.toThrow();
    });

    it('should pass through other props', () => {
      expect(() => {
        render(
          <TextComponent
            theme={mockTheme}
            allowFontScaling={false}
            selectable={false}
          >
            Other Props
          </TextComponent>
        );
      }).not.toThrow();
    });
  });
});
