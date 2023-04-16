import Constants from "expo-constants";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../../Styles/theme";
import { useSelector } from "react-redux";
import Header from "../Header";

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
  const tagData = useSelector((state) => state.tagReducer);
  return (
    <View style={styles.customizeTagsPageContainer}>
      <Header text={"Tags"} />
      {tagData.map((tag) => (
        <View key={tag.id}>
          <Text>
            {tag.symbol}
            {tag.description}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default CustomizeTagsPage;
