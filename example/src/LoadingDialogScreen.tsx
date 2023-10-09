import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  ScrollView,
  Button,
  LoadingDialog,
} from '@eslam-elmeniawy/react-native-common-components';
import styles from './styles';

export default function LoadingDialogScreen() {
  const [visibleTimeLeft, setVisibleTimeLeft] = React.useState(0);

  const _showDialog = () => setVisibleTimeLeft(5);

  React.useEffect(() => {
    if (!visibleTimeLeft) return;

    const timeoutId = setTimeout(() => {
      setVisibleTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [visibleTimeLeft]);

  const _buttonStyle = StyleSheet.flatten([
    styles.width90perc,
    styles.alignSelfCenter,
    styles.marginVertical8vs,
  ]);

  return (
    <>
      <ScrollView>
        <Button
          style={_buttonStyle}
          onPress={_showDialog}
          text="Show Loading Dialog"
        />
      </ScrollView>
      <LoadingDialog visible={visibleTimeLeft > 0} />
    </>
  );
}
