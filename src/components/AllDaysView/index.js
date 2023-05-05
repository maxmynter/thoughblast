import Constants from "expo-constants";
import { useSelector } from "react-redux";
import { FlatList, View, StyleSheet } from "react-native";
import { useEffect, useRef } from "react";
import { theme } from "../../Styles/theme";
import DayItem from "./DayItem";
import Header from "../Header";

const styles = StyleSheet.create({
  seperator: {
    height: 16,
  },
  FlatListContentContainer: { paddingBottom: 128 },
  allThoughtsContainer: {
    margin: theme.containers.margin,
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    display: "flex",
    justifyContent: "space-between",
    marginBottom: -8,
  },
  sectionHeaderViewContainer: {
    display: "flex",
    padding: 8,
    marginTop: 16,
    marginBottom: 8,
  },
  sectionHeaderDateWrapper: {
    backgroundColor: theme.colorPalette[950],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderRadius: 20,
  },
  sectionListFooterComponentView: { paddingTop: 8 },
});

const AllDaysView = () => {
  const data = useSelector((state) => state.thoughtReducer);
  const flatListRef = useRef();

  const scrollToNewestItem = () => {
    flatListRef.current.scrollToOffset({
      animated: true,
      offset: 0,
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
      <FlatList
        data={data.filter((item) => item.status !== "deleted")}
        contentContainerStyle={styles.FlatListContentContainer}
        showsVerticalScrollIndicator={false}
        ref={flatListRef}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          if (item.status !== "deleted") {
            return <DayItem item={item} />;
          }
        }}
        ItemSeparatorComponent={() => <View style={styles.seperator}></View>}
        onScrollToIndexFailed={handleScrollFailed}
      />
    </View>
  );
};

export default AllDaysView;
