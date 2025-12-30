import { FlatListComponent } from '../FlatList';
import { mockTheme } from '../../../test-utils/mockTheme';

describe('FlatList Component', () => {
  it('should accept data prop', () => {
    const data = [{ key: '1' }, { key: '2' }];
    const component = <FlatListComponent theme={mockTheme} data={data} />;
    expect(component.props.data).toBe(data);
  });

  it('should accept renderItem prop', () => {
    const data = [{ key: '1' }];
    const renderItem = jest.fn();
    const component = (
      <FlatListComponent
        theme={mockTheme}
        data={data}
        renderItem={renderItem}
      />
    );
    expect(component.props.renderItem).toBe(renderItem);
  });

  it('should accept refreshing prop', () => {
    const data = [{ key: '1' }];
    const component = (
      <FlatListComponent theme={mockTheme} data={data} refreshing={true} />
    );
    expect(component.props.refreshing).toBe(true);
  });

  it('should accept onRefresh handler', () => {
    const data = [{ key: '1' }];
    const onRefresh = jest.fn();
    const component = (
      <FlatListComponent theme={mockTheme} data={data} onRefresh={onRefresh} />
    );
    expect(component.props.onRefresh).toBe(onRefresh);
  });

  it('should accept refreshColor prop', () => {
    const data = [{ key: '1' }];
    const component = (
      <FlatListComponent theme={mockTheme} data={data} refreshColor="#0066cc" />
    );
    expect(component.props.refreshColor).toBe('#0066cc');
  });

  it('should accept horizontal prop', () => {
    const data = [{ key: '1' }];
    const component = (
      <FlatListComponent theme={mockTheme} data={data} horizontal={true} />
    );
    expect(component.props.horizontal).toBe(true);
  });

  it('should accept keyExtractor prop', () => {
    const data = [{ key: '1' }];
    const keyExtractor = jest.fn((item) => item.key);
    const component = (
      <FlatListComponent
        theme={mockTheme}
        data={data}
        keyExtractor={keyExtractor}
      />
    );
    expect(component.props.keyExtractor).toBe(keyExtractor);
  });

  it('should accept keyboardDismissMode prop', () => {
    const data = [{ key: '1' }];
    const component = (
      <FlatListComponent
        theme={mockTheme}
        data={data}
        keyboardDismissMode="on-drag"
      />
    );
    expect(component.props.keyboardDismissMode).toBe('on-drag');
  });

  it('should accept style prop', () => {
    const data = [{ key: '1' }];
    const style = { flex: 1 };
    const component = (
      <FlatListComponent theme={mockTheme} data={data} style={style} />
    );
    expect(component.props.style).toBe(style);
  });

  it('should accept contentContainerStyle prop', () => {
    const data = [{ key: '1' }];
    const contentContainerStyle = { paddingHorizontal: 16 };
    const component = (
      <FlatListComponent
        theme={mockTheme}
        data={data}
        contentContainerStyle={contentContainerStyle}
      />
    );
    expect(component.props.contentContainerStyle).toBe(contentContainerStyle);
  });

  it('should accept multiple props', () => {
    const data = [{ key: '1' }, { key: '2' }];
    const renderItem = jest.fn();
    const onRefresh = jest.fn();
    const style = { flex: 1 };
    const component = (
      <FlatListComponent
        theme={mockTheme}
        data={data}
        renderItem={renderItem}
        onRefresh={onRefresh}
        refreshing={false}
        horizontal={false}
        style={style}
      />
    );
    expect(component.props.data).toBe(data);
    expect(component.props.renderItem).toBe(renderItem);
    expect(component.props.onRefresh).toBe(onRefresh);
    expect(component.props.refreshing).toBe(false);
  });

  it('should work with just theme and data', () => {
    const data = [{ key: '1' }];
    const component = <FlatListComponent theme={mockTheme} data={data} />;
    expect(component.props.theme).toBe(mockTheme);
    expect(component.props.data).toBe(data);
  });
});
