import { View, Text, FlatList, StyleSheet } from "react-native";
import DayItem from "./DayItem";

const style = StyleSheet.create({
  seperator: {
    height: 5,
  },
});

const SingleDayView = ({ item }) => {
  return (
    <View>
      <Text>{item.date}</Text>
      <FlatList
        data={item.thoughts}
        renderItem={({ item }) => <DayItem text={item.text} />}
        ItemSeparatorComponent={() => <View style={style.seperator}></View>}
      />
    </View>
  );
};

export default SingleDayView;
