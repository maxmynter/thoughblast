import { View, Text, FlatList } from "react-native";
import DayItem from "./DayItem";

const SingleDayView = ({ item }) => {
  return (
    <View>
      <Text>{item.date}</Text>
      <FlatList
        data={item.thoughts}
        renderItem={({ item }) => <DayItem text={item.text} />}
      />
    </View>
  );
};

export default SingleDayView;
