// External imports.
import React from 'react';
import { View } from 'react-native';
import { withTheme } from 'react-native-paper';

// Types imports.
import type { PropsWithTheme } from './AlertDialog.types';

// Internal imports.
import styles from './AlertDialog.styles';
import { Dialog } from '../Dialog';
import { Text } from '../Text';
import { Button } from '../Button';

const AlertDialog = (props: PropsWithTheme): React.ReactElement => {
  const {
    dialogProps,
    title,
    titleProps,
    message,
    messageProps,
    actions,
    theme,
  } = props;

  const { style: dialogStyle, ...dialogOther } = dialogProps || {};
  const { type: titleType, size: titleSize, ...titleOther } = titleProps || {};

  return (
    <Dialog style={[styles.dialog, dialogStyle]} {...dialogOther}>
      {Boolean(title) && (
        <Text type={titleType || 'bold'} size={titleSize || 18} {...titleOther}>
          {title}
        </Text>
      )}
      {Boolean(message) && <Text {...(messageProps || {})}>{message}</Text>}
      <View
        style={[
          styles.actionsContainer,
          (actions?.length || 0) > 2
            ? styles.actionsContainerColumn
            : styles.actionsContainerRow,
        ]}
      >
        {actions?.map((action) => {
          if (action.action) {
            const {
              style: actionStyle,
              textProps: actionTextProps,
              ...actionOther
            } = action.actionProps || {};

            const { style: actionTextStyle, ...actionTextOther } =
              actionTextProps || {};

            return (
              <Button
                key={action.action}
                style={[
                  styles.action,
                  (actions?.length || 0) > 2 ? undefined : styles.actionRow,
                  actionStyle,
                ]}
                textProps={{
                  style: [{ color: theme.colors.primary }, actionTextStyle],
                  ...actionTextOther,
                }}
                text={action.action}
                {...actionOther}
              />
            );
          }

          return null;
        })}
      </View>
    </Dialog>
  );
};

export default withTheme(AlertDialog);
