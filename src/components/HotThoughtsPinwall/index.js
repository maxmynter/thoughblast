import Constants from "expo-constants";
import { View, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { theme } from "../../Styles/theme";
import Header from "../Header";
import PinnwallItem from "./PinnwallItem";
import { useState } from "react";

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
  const allThoughts = useSelector((state) => state.thoughtReducer);
  const [data, setData] = useState(
    allThoughts.filter((thought) => thought.pinned === true)
  );

  return (
    <View style={styles.hotThoughtsContainer}>
      <Header text="Pinned Thoughts" />
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <PinnwallItem
              item={item}
              unPinItem={() =>
                setData(data.filter((thought) => thought.id !== item.id))
              }
            />
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.seperator}></View>}
      />
    </View>
  );
};

export default HotThoughtsPinwall;
