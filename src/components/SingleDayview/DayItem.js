import { View, Text, StyleSheet } from "react-native";
import { theme } from "../../../theme";

const styles = StyleSheet.create({
  thoughtViewContainer: {
    backgroundColor: theme.colors.uithought,
    borderRadius: 5,
    padding: 16,
  },
});

const DayItem = ({ text }) => {
  return (
    <View style={styles.thoughtViewContainer}>
      <Text>{text}</Text>
    </View>
  );
};

export default DayItem;
