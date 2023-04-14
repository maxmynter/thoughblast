import Constants from "expo-constants";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../../../theme";

const styles = StyleSheet.create({
  customizeTagsPageContainer: {
    margin: theme.containers.margin,
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    display: "flex",
    justifyContent: "space-between",
  },
});

const CustomizeTagsPage = () => {
  return (
    <View style={styles.customizeTagsPageContainer}>
      <Text>{" TAGS PAGE Under Construction"}</Text>
    </View>
  );
};

export default CustomizeTagsPage;
