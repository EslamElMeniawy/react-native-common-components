import { StyleSheet } from 'react-native';
import {
  ScrollView,
  Accordion,
  Text,
} from '@eslam-elmeniawy/react-native-common-components';
import styles from './styles';

export default function AccordionScreen() {
  const _accordionStyle = StyleSheet.flatten([
    styles.width90perc,
    styles.alignSelfCenter,
    styles.marginVertical16vs,
  ]);

  return (
    <ScrollView contentContainerStyle={styles.paddingVertical4vs}>
      <Accordion
        containerStyle={_accordionStyle}
        headerContent={<Text>Click Arrow Icon to Expand</Text>}
      >
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Text>
      </Accordion>
    </ScrollView>
  );
}
