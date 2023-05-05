import { View, Text, StyleSheet } from "react-native";
import thoughtViewContainer from "../../Styles/thoughtViewContainer";
import { theme } from "../../Styles/theme";

const styles = StyleSheet.create({
  thoughtViewContainer: {
    ...thoughtViewContainer,
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
    color: theme.colorPalette[950],
  },
});

const ThoughtBubble = ({ item }) => {
  const { text, id } = item;

  return (
    <View style={styles.thoughtViewContainer} key={id}>
      <View style={styles.noteContainer}>
        <Text style={styles.notetext}>{text}</Text>
      </View>
    </View>
  );
};

export default ThoughtBubble;
