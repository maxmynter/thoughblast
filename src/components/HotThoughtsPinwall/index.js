import Constants from "expo-constants";
import { View, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { theme } from "../../Styles/theme";
import ThoughtBubble from "../AllDaysView/ThoughtBubble";
import Header from "../Header";

const styles = StyleSheet.create({
  hotThoughtsContainer: {
    margin: theme.containers.margin,
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    display: "flex",
    justifyContent: "space-between",
  },
  seperator: {
    height: 5,
  },
});

const HotThoughtsPinwall = () => {
  const data = useSelector((state) => state.thoughtReducer);
  return (
    <View style={styles.hotThoughtsContainer}>
      <Header text="Pinned Thoughts" />
      <FlatList
        data={data.filter((thought) => thought.pinnedAtDate)}
        renderItem={({ item }) => {
          return <ThoughtBubble key={item.id} item={item} />;
        }}
        ItemSeparatorComponent={() => <View style={styles.seperator}></View>}
      />
    </View>
  );
};

export default HotThoughtsPinwall;
