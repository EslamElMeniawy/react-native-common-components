import ReactNativeCommonComponents from './NativeReactNativeCommonComponents';

export function multiply(a: number, b: number): number {
  return ReactNativeCommonComponents.multiply(a, b);
}

// Explicit public component exports (excluding test-only *Component variants)
export { Accordion, type AccordionProps } from './components/Accordion';
export { AlertDialog, type AlertDialogProps } from './components/AlertDialog';
export { Button, type ButtonProps } from './components/Button';
export { Checkbox, type CheckboxProps } from './components/CompoundButton';
export {
  RadioButton,
  type RadioButtonProps,
} from './components/CompoundButton';
export { Dialog, type DialogProps } from './components/Dialog';
export { FlatList, type FlatListProps } from './components/FlatList';
export {
  IconButton,
  type IconButtonProps,
  type IconProps,
} from './components/IconButton';
export {
  ImagePlaceholder,
  type ImagePlaceholderProps,
} from './components/ImagePlaceholder';
export {
  LoadingDialog,
  type LoadingDialogProps,
} from './components/LoadingDialog';
export { ScrollView, type ScrollViewProps } from './components/ScrollView';
export {
  SelectDialog,
  type SelectDialogProps,
} from './components/SelectDialog';
export { Text, type TextProps } from './components/Text';
export { TextInput, type TextInputProps } from './components/TextInput';

// Utility and type exports
export * from './utils';
export * from './types';
