import * as React from 'react';
import {
  ScrollView,
  Dialog,
  Text,
  Button,
} from '@eslam-elmeniawy/react-native-common-components';
import styles from './styles';

export default function DialogScreen() {
  const [simpleDialogVisible, setSimpleDialogVisible] = React.useState(false);
  const [topDialogVisible, setTopDialogVisible] = React.useState(false);
  const [bottomDialogVisible, setBottomDialogVisible] = React.useState(false);

  const _showSimpleDialog = () => setSimpleDialogVisible(true);

  const _hideSimpleDialog = () => setSimpleDialogVisible(false);

  const _showTopDialog = () => setTopDialogVisible(true);

  const _hideTopDialog = () => setTopDialogVisible(false);

  const _showBottomDialog = () => setBottomDialogVisible(true);

  const _hideBottomDialog = () => setBottomDialogVisible(false);

  const _buttonStyle = {
    ...(styles.width90perc as object),
    ...(styles.alignSelfCenter as object),
    ...(styles.marginVertical8vs as object),
  };

  const _textStyle = { ...(styles.marginVertical16vs as object) };

  return (
    <>
      <ScrollView>
        <Button
          style={_buttonStyle}
          onPress={_showSimpleDialog}
          text="Show Simple Dialog"
        />
        <Button
          style={_buttonStyle}
          onPress={_showTopDialog}
          text="Show Top Dialog"
        />
        <Button
          style={_buttonStyle}
          onPress={_showBottomDialog}
          text="Show Bottom Dialog"
        />
      </ScrollView>
      <Dialog visible={simpleDialogVisible} onDismiss={_hideSimpleDialog}>
        <Text style={_textStyle}>This is simple dialog</Text>
      </Dialog>
      <Dialog
        visible={topDialogVisible}
        onDismiss={_hideTopDialog}
        position="top"
      >
        <Text style={_textStyle}>This is top dialog</Text>
      </Dialog>
      <Dialog
        visible={bottomDialogVisible}
        onDismiss={_hideBottomDialog}
        position="bottom"
      >
        <Text style={_textStyle}>This is bottom dialog</Text>
      </Dialog>
    </>
  );
}
