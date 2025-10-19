# Accordion

A collapsible container that shows/hides content with a smooth animated height and a rotating chevron icon.

## Key points

- Uses `react-native-reanimated` for animations. If `react-native-reanimated` is not available the component will print a warning and render `null`.
- Wrapped with `withTheme` from `react-native-paper` — works with both MD2 and MD3 themes.
- The chevron color defaults to `theme.colors.onBackground` for MD3 and `theme.colors.text` for MD2.
- Animations: expands/collapses height with timing and rotates the arrow 0 ↔ 180 degrees.

## Props

- `containerStyle?: StyleProp<ViewStyle>` — style for the outer container.
- `headerContainerStyle?: StyleProp<ViewStyle>` — style for the header (touchable) container.
- `headerContent?: React.ReactNode` — node rendered inside the header area (left side).
- `children?: React.ReactNode` — content to show/hide inside the accordion.
- `iconButtonProps?: IconButtonProps` — props forwarded to the right-side `IconButton`. Common fields:
  - `iconName?: string` — name of the icon (default: `chevron-down`).
  - `color?: string` — override icon color.
  - `onPress?: () => void` — called when icon is pressed (also toggles the accordion).

## Usage

Import from the package (example project):

```tsx
import {
  ScrollView,
  Accordion,
  Text,
} from '@eslam-elmeniawy/react-native-common-components';

<ScrollView>
  <Accordion
    containerStyle={{ marginHorizontal: 16 }}
    headerContent={<Text>Click Arrow Icon to Expand</Text>}
    iconButtonProps={{ iconName: 'chevron-down' }}
  >
    <Text>
      Collapsible content goes here. Put any React node(s) as children.
    </Text>
  </Accordion>
</ScrollView>;
```

## Notes & tips

- Ensure `react-native-reanimated` is properly installed and configured (Babel plugin, native setup) to enable animations. Without it the component will not render.
- The component measures content height once (on first layout) then uses that value for animations. If children size changes dynamically after mount, you may need to force re-measure (not currently exposed).
