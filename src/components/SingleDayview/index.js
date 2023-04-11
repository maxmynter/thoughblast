import { View, Text, FlatList, StyleSheet } from "react-native";
import DayItem from "./DayItem";

const styles = StyleSheet.create({
  dayViewContainer: {},
  seperator: {
    height: 5,
  },
  dateLine: { marginTop: 16, marginBottom: 8, fontWeight: "bold" },
});

const SingleDayView = ({ item }) => {
  return (
    <View style={styles.dayViewContainer}>
      <Text style={styles.dateLine}>{item.date}</Text>
      <FlatList
        data={item.thoughts}
        renderItem={({ item }) => <DayItem tag={item.tag} text={item.text} />}
        ItemSeparatorComponent={() => <View style={styles.seperator}></View>}
      />
    </View>
  );
};

export default SingleDayView;
