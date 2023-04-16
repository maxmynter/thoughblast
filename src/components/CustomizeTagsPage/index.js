import Constants from "expo-constants";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../../Styles/theme";
import { useSelector } from "react-redux";
import headerTextStyles from "../../Styles/headerText";

const styles = StyleSheet.create({
  customizeTagsPageContainer: {
    margin: theme.containers.margin,
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    display: "flex",
    justifyContent: "space-between",
  },
  headerText: headerTextStyles,
});

const CustomizeTagsPage = () => {
  const tagData = useSelector((state) => state.tagReducer);
  return (
    <View style={styles.customizeTagsPageContainer}>
      <Text style={styles.headerText}>{" TAGS PAGE Under Construction"}</Text>
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
