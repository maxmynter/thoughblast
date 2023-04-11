import { FlatList, View, StyleSheet, Text } from "react-native";
import SingleDayView from "../SingleDayview";

const MOCK_DATA = [
  {
    date: "Friday, 21st of May",
    thoughts: [
      { text: "text", tag: "Jump" },
      { text: "A simple example note", tag: "idea" },
    ],
  },
  {
    date: "Thursday, 20th of May",
    thoughts: [
      { text: "text 22", tag: "Jump" },
      { text: "Another example note", tag: "idea" },
    ],
  },
];

const styles = StyleSheet.create({
  listContainer: {
    display: "flex",
    flexDiretion: "column",
    justifyContent: "center",
    alignItems: "flex-center",
  },
});

const AllDaysView = () => {
  return (
    <View>
      <Text>Hallo </Text>
      <FlatList
        data={MOCK_DATA}
        renderItem={({ item }) => <SingleDayView item={item} />}
      />
    </View>
  );
};

export default AllDaysView;
