import { View, FlatList, StyleSheet } from "react-native";
import DayItem from "../AllDaysView/DayItem";

const styles = StyleSheet.create({
  dayViewContainer: {},
});

const SingleDayView = ({ item }) => {
  return (
    <View style={styles.dayViewContainer}>
      <FlatList
        data={item.thoughts}
        renderItem={({ item }) => (
          <DayItem tag={item.tag} text={item.text} id={item.id} />
        )}
        ItemSeparatorComponent={() => <View style={styles.seperator}></View>}
      />
    </View>
  );
};

export default SingleDayView;
