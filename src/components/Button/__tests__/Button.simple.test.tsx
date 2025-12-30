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

describe('Button Component - Rendering Basic Test', () => {
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
});
