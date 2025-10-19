// External imports.
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { withTheme } from 'react-native-paper';

// Types imports.
import type { PropsWithTheme, Props } from './AlertDialog.types';

// Internal imports.
import styles from './AlertDialog.styles';
import { Dialog } from '../Dialog';
import { Text } from '../Text';
import { Button } from '../Button';

const AlertDialog = React.memo((props: PropsWithTheme): React.ReactElement => {
  const {
    dialogProps,
    title,
    titleProps,
    message,
    messageProps,
    actions,
    theme,
  } = props;

  const { style: dialogStyle, ...dialogOther } = dialogProps ?? {};
  const { type: titleType, size: titleSize, ...titleOther } = titleProps ?? {};

  return (
    <Dialog
      style={StyleSheet.flatten([styles.dialog, dialogStyle])}
      {...dialogOther}
    >
      {Boolean(title) && (
        <Text type={titleType ?? 'bold'} size={titleSize ?? 18} {...titleOther}>
          {title}
        </Text>
      )}
      {Boolean(message) && <Text {...(messageProps ?? {})}>{message}</Text>}
      <View
        style={StyleSheet.flatten([
          styles.actionsContainer,
          (actions?.length ?? 0) > 2
            ? styles.actionsContainerColumn
            : styles.actionsContainerRow,
        ])}
      >
        {actions?.map((action) => {
          if (action.action) {
            const {
              style: actionStyle,
              textProps: actionTextProps,
              ...actionOther
            } = action.actionProps ?? {};

            const { style: actionTextStyle, ...actionTextOther } =
              actionTextProps ?? {};

            return (
              <Button
                key={action.action}
                style={StyleSheet.flatten([
                  styles.action,
                  (actions?.length ?? 0) > 2 ? undefined : styles.actionRow,
                  actionStyle,
                ])}
                textProps={{
                  style: StyleSheet.flatten([
                    { color: theme.colors.primary },
                    actionTextStyle,
                  ]),
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
});

export default withTheme(AlertDialog) as React.ComponentType<Props>;
