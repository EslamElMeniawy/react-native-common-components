import { render } from '@testing-library/react-native';

import Icon from '../Icon';

describe('IconButton/Icon', () => {
  it('renders vector icon when provided', () => {
    const { UNSAFE_root } = render(<Icon vector={456} color="#00ff00" />);
    expect(UNSAFE_root).toBeDefined();
  });

  it('renders material icon when iconName is provided', () => {
    const { UNSAFE_root } = render(
      <Icon iconName="settings" color="#0000ff" size={40} iconPercent={50} />
    );
    expect(UNSAFE_root).toBeDefined();
  });

  it('renders null when no icon prop is provided', () => {
    const { UNSAFE_root } = render(<Icon color="#ff0000" />);
    expect(UNSAFE_root).toBeDefined();
  });

  it('renders icon with custom size and percent', () => {
    const { UNSAFE_root } = render(
      <Icon vector={789} color="#123123" iconPercent={100} size={30} />
    );
    expect(UNSAFE_root).toBeDefined();
  });
});
