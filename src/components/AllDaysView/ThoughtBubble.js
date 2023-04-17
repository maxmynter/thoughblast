import { View, Text, StyleSheet } from "react-native";
import thoughtViewContainer from "../../Styles/thoughtViewContainer";

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

const ThoughtBubble = ({ item }) => {
  const { thoughtThread, tag, id } = item;
  if (thoughtThread && tag && id) {
    return (
      <View style={styles.thoughtViewContainer} key={id}>
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
        <View style={styles.noteContainer}>
          {thoughtThread.map((entry) => {
            return (
              <Text key={entry.id} style={styles.notetext}>
                {entry.text}
              </Text>
            );
          })}
        </View>
      </View>
    );
  } else {
    console.log("Could not render", thoughtThread, tag, id);
  }
};

export default ThoughtBubble;
