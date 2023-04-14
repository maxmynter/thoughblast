import Constants from "expo-constants";
import { useSelector } from "react-redux";
import { SectionList, View, StyleSheet, Text } from "react-native";
import { useEffect, useRef } from "react";
import { theme } from "../../../theme";
import getIndexOfK from "../../utils/getIndexInNDArray";
import DayItem from "./DayItem";

const styles = StyleSheet.create({
  seperator: {
    height: 5,
  },
  dateLine: { marginTop: 16, marginBottom: 8, fontWeight: "bold" },
  SectionListContentContainer: { paddingBottom: "100%" },
  allThoughtsContainer: {
    margin: theme.containers.margin,
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    display: "flex",
    justifyContent: "space-between",
  },
});

const createThoughtsNestedByDatesArray = (thoughtsArray) => {
  // Creates a nested Array of Objects with props {title, data} necessary for <SectionList/>

  const uniqueDays = [
    ...new Set(thoughtsArray.map((thought) => thought.createdAt.split("T")[0])),
  ];
  let data = uniqueDays.map((day) => ({ data: [], title: day }));

  thoughtsArray.forEach((thought) => {
    const thoughtCreatedAtDate = thought.createdAt.split("T")[0];
    const addToDataOfThisIndex = data.findIndex(
      (dataEntry) => dataEntry.title === thoughtCreatedAtDate
    );
    data[addToDataOfThisIndex].data.push(thought);
  });

  return data;
};

const AllDaysView = () => {
  const allThoughts = useSelector((state) => state.thoughtReducer);
  const sectionListRef = useRef();

  const data = createThoughtsNestedByDatesArray(allThoughts);

  const scrollToItem = (sectionIndex, itemIndex) => {
    sectionListRef.current.scrollToLocation({
      sectionIndex,
      itemIndex,
      animated: true,
      viewPosition: 0.5,
    });
  };
  const handleScrollFailed = () => {
    sectionListRef.current.scrollToLocation({
      sectionIndex: data.length - 1,
      itemIndex: data[data.length - 1].data.length - 1,
      animated: true,
      viewPosition: 0.5,
    });
  };

  useEffect(() => {
    const allThoughtsCreatedAtNestedArray = data.map((dayObject) =>
      dayObject.data.map((thought) =>
        Math.abs(new Date(thought.createdAt).getTime() - new Date().getTime())
      )
    );
    const smallestDeviationFromNow = Math.min(
      ...allThoughtsCreatedAtNestedArray.flat()
    );

    const [mostRecentSectionIndex, mostRecentItemIndex] = getIndexOfK(
      allThoughtsCreatedAtNestedArray,
      smallestDeviationFromNow
    );
    scrollToItem(mostRecentSectionIndex, mostRecentItemIndex);
  }, [data]);

  return (
    <View style={styles.allThoughtsContainer}>
      <SectionList
        sections={data}
        contentContainerStyle={styles.SectionListContentContainer}
        ref={sectionListRef}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <DayItem item={item} />;
        }}
        renderSectionHeader={({ section: { title } }) => {
          return <Text style={styles.dateLine}>{title}</Text>;
        }}
        ItemSeparatorComponent={() => <View style={styles.seperator}></View>}
        onScrollToIndexFailed={handleScrollFailed}
      />
    </View>
  );
};

export default AllDaysView;
