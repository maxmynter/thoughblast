import { useSelector } from "react-redux";
import { FlatList, View, StyleSheet } from "react-native";
import SingleDayView from "../SingleDayview";

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
  const data = useSelector((state) => state);

  return (
    <View style={styles.listContainer}>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={data}
        renderItem={({ item }) => <SingleDayView item={item} />}
      />
    </View>
  );
};

export default AllDaysView;
