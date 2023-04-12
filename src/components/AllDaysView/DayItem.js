import { View, Text, StyleSheet } from "react-native";
import { theme } from "../../../theme";

const styles = StyleSheet.create({
  thoughtViewContainer: {
    backgroundColor: theme.colors.uithought,
    borderRadius: 8,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
    display: "flex",
    flexDirection: "row",
  },
  noteContainer: {
    padding: 8,
    paddingRight: 8,
    flexShrink: 1,
  },
  notetext: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tagContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    margin: 8,
  },
  tagText: {},
});

const DayItem = ({ item }) => {
  const { text, tag, id } = item;
  return (
    <View style={styles.thoughtViewContainer} key={id}>
      <View style={styles.tagContainer}>
        <Text style={styles.tagText}>{tag}</Text>
      </View>
      <View style={styles.noteContainer}>
        <Text style={styles.notetext}>{text}</Text>
      </View>
    </View>
  );
};

export default DayItem;
