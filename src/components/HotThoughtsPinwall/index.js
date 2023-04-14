import Constants from "expo-constants";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../../../theme";

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
  return (
    <View style={styles.hotThoughtsContainer}>
      <Text>{"Under Construction"}</Text>
    </View>
  );
};

export default HotThoughtsPinwall;
