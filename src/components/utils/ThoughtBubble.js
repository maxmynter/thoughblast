import { View, Text, StyleSheet } from "react-native";
import thoughtViewContainer from "../../Styles/thoughtViewContainer";
import { theme } from "../../Styles/theme";
import LoadingComponent from "./LoadingComponent";

const styles = StyleSheet.create({
  thoughtViewContainer: {
    ...thoughtViewContainer,
    display: "flex",
    flexDirection: "column",
  },
  noteContainer: {
    padding: 8,
    paddingRight: 8,
    flexShrink: 1,
    marginBottom: 16,
  },
  notetext: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    color: theme.colorPalette[950],
  },
  dateContainer: { paddingLeft: 8, paddingRight: 8 },
  dateText: { fontSize: 11, color: theme.colors.uiGrey },
});

const ThoughtBubble = ({ item }) => {
  const { text, id, status } = item;
  var dateFormat = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    weekday: "short",
  };

  return (
    <View style={styles.thoughtViewContainer} key={id}>
      {status === "transcribing" ? (
        <LoadingComponent />
      ) : (
        <View style={styles.noteContainer}>
          <Text style={styles.notetext}>{text}</Text>
        </View>
      )}
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>
          {new Date(item.createdAt).toLocaleDateString("en-US", dateFormat)}
        </Text>
      </View>
    </View>
  );
};

export default ThoughtBubble;
