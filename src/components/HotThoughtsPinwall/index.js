import Constants from "expo-constants";
import { View, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { theme } from "../../Styles/theme";
import Header from "../Header";
import PinnwallItem from "./PinnwallItem";

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
  const data = useSelector((state) => state.thoughtReducer).filter(
    (thought) => thought.pinned === true
  );

  return (
    <View style={styles.hotThoughtsContainer}>
      <Header text="Pinned Thoughts" />
      {console.log("State", data)}
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return <PinnwallItem item={item} />;
        }}
        ItemSeparatorComponent={() => <View style={styles.seperator}></View>}
      />
    </View>
  );
};

export default HotThoughtsPinwall;
