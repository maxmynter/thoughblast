import { useSelector } from "react-redux";
import { SectionList, View, StyleSheet, Text } from "react-native";
import { useEffect, useRef } from "react";
import getIndexOfK from "../../utils/getIndexInNDArray";
import DayItem from "./DayItem";

const styles = StyleSheet.create({
  seperator: {
    height: 5,
  },
  dateLine: { marginTop: 16, marginBottom: 8, fontWeight: "bold" },
  SectionListContentContainer: { paddingBottom: "100%" },
});

const AllDaysView = () => {
  const data = useSelector((state) => state.thoughtReducer);
  const sectionListRef = useRef();

  console.log(JSON.stringify(data));

  const scrollToItem = (sectionIndex, itemIndex) => {
    sectionListRef.current.scrollToLocation({
      sectionIndex,
      itemIndex,
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
    console.log([mostRecentSectionIndex, mostRecentItemIndex]);
    scrollToItem(mostRecentSectionIndex, mostRecentItemIndex);
  }, [data]);

  return (
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
    />
  );
};

export default AllDaysView;
