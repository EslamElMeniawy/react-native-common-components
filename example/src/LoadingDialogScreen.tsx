import * as React from 'react';
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

  const _buttonStyle = {
    ...(styles.width90perc as object),
    ...(styles.alignSelfCenter as object),
    ...(styles.marginVertical8vs as object),
  };

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
