import { FlatList, View, StyleSheet } from "react-native";
import SingleDayView from "../SingleDayview";

const MOCK_DATA = [
  {
    date: "Wednesday, 19th of May",
    thoughts: [
      {
        text: "This is a very long text. Indeed a very intricate thought such that the thoughts are very long and need lots and lots of words as to simulate a long passage of text here in the viewport.",
        tag: "🔥",
      },
      { text: "HEUREKAAA", tag: "💡" },
    ],
  },
  {
    date: "Thursday, 20th of May",
    thoughts: [
      { text: "text 22", tag: "🔥" },
      { text: "Another example note", tag: "💡" },
    ],
  },
  {
    date: "Friday, 21st of May",
    thoughts: [
      { text: "text", tag: "🔥" },
      { text: "A simple example note", tag: "💡" },
    ],
  },
];

const styles = StyleSheet.create({
  listContainer: {
    padding: 8,
    display: "flex",
    flexDiretion: "column",
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
});

const AllDaysView = () => {
  return (
    <View style={styles.listContainer}>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={MOCK_DATA}
        renderItem={({ item }) => <SingleDayView item={item} />}
      />
    </View>
  );
};

export default AllDaysView;
