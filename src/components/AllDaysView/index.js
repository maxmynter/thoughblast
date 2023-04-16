import Constants from "expo-constants";
import { useSelector } from "react-redux";
import { SectionList, View, StyleSheet, Text } from "react-native";
import { useEffect, useRef } from "react";
import { theme } from "../../Styles/theme";
import DayItem from "./DayItem";
import Header from "../Header";

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
    data[addToDataOfThisIndex].data.unshift(thought);
  });

  return data.sort((a, b) => new Date(a.title) - new Date(b.title));
};

const AllDaysView = () => {
  const data = createThoughtsNestedByDatesArray(
    useSelector((state) => state.thoughtReducer)
  );
  const sectionListRef = useRef();

  const scrollToNewestItem = () => {
    sectionListRef.current.scrollToLocation({
      sectionIndex: data.length - 1,
      itemIndex: data[data.length - 1].data.length - 1,
      animated: true,
      viewPosition: 0.5,
    });
  };
  const handleScrollFailed = () => {
    console.log("Scroll failed");
  };

  useEffect(() => {
    if (data.length > 0) {
      scrollToNewestItem();
    }
  }, [data]);

  return (
    <View style={styles.allThoughtsContainer}>
      <Header text="Thoughts" />
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
