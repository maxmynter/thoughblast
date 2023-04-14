import Constants from "expo-constants";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../../../theme";
import { useSelector } from "react-redux";

const styles = StyleSheet.create({
  hotThoughtsContainer: {
    margin: theme.containers.margin,
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    display: "flex",
    justifyContent: "space-between",
  },
});

const HotThoughtsPinwall = () => {
  const data = useSelector((state) => state.thoughtReducer);
  console.log(data);
  return (
    <View style={styles.hotThoughtsContainer}>
      <Text>{"HOT THOUGHTS Under Construction"}</Text>
      {data.map((thought) =>
        thought.pinnedAtDate ? (
          <Text key={thought.id}>
            {thought.tag} {thought.text}{" "}
          </Text>
        ) : null
      )}
    </View>
  );
};

export default HotThoughtsPinwall;
