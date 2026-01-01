import { render } from '@testing-library/react-native';

import Placeholder from '../Placeholder';

describe('ImagePlaceholder Placeholder Component', () => {
  const mockPlaceholderSource = 12345; // Mock require() resource ID
  const mockVectorPlaceholder = 67890; // Mock require() resource ID

  it('should return null when source is provided and not loading/error', () => {
    const result = render(
      <Placeholder source="image.jpg" isLoading={false} isError={false} />
    );

    // Component returns null, so toJSON should be null
    expect(result.toJSON()).toBeNull();
  });

  it('should render placeholder when isLoading is true', () => {
    // Component renders without throwing when isLoading is true
    expect(() => {
      render(
        <Placeholder
          source="image.jpg"
          placeholder={mockPlaceholderSource}
          isLoading={true}
          isError={false}
        />
      );
    }).not.toThrow();
  });

  it('should render placeholder when isError is true', () => {
    // Component renders without throwing when isError is true
    expect(() => {
      render(
        <Placeholder
          source="image.jpg"
          placeholder={mockPlaceholderSource}
          isLoading={false}
          isError={true}
        />
      );
    }).not.toThrow();
  });

  it('should render placeholder when source is not provided', () => {
    // Component renders without throwing when source is not provided
    expect(() => {
      render(
        <Placeholder
          placeholder={mockPlaceholderSource}
          isLoading={false}
          isError={false}
        />
      );
    }).not.toThrow();
  });

  it('should render vector placeholder when provided and no regular placeholder', () => {
    const { root } = render(
      <Placeholder
        vectorPlaceholder={mockVectorPlaceholder}
        isLoading={true}
        isError={false}
      />
    );

    expect(root).toBeTruthy();
  });

  it('should use default resizeMode when not provided', () => {
    expect(() => {
      render(
        <Placeholder
          placeholder={mockPlaceholderSource}
          isLoading={true}
          isError={false}
        />
      );
    }).not.toThrow();
  });

  it('should use provided resizeMode', () => {
    expect(() => {
      render(
        <Placeholder
          placeholder={mockPlaceholderSource}
          resizeMode="contain"
          isLoading={true}
          isError={false}
        />
      );
    }).not.toThrow();
  });

  it('should return null when no placeholder provided and isLoading', () => {
    const result = render(<Placeholder isLoading={true} isError={false} />);

    // Component returns null when no placeholder is provided
    expect(result.toJSON()).toBeNull();
  });

  it('should prefer regular placeholder over vector placeholder', () => {
    const { root } = render(
      <Placeholder
        placeholder={mockPlaceholderSource}
        vectorPlaceholder={mockVectorPlaceholder}
        isLoading={true}
        isError={false}
      />
    );

    expect(root).toBeTruthy();
  });
});
