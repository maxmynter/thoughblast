import Constants from "expo-constants";
import { View, StyleSheet, FlatList } from "react-native";
import { theme } from "../../Styles/theme";
import { useSelector } from "react-redux";
import Header from "../Header";
import AddTagFlow from "./AddTagFlow";
import TagContainerItem from "./TagContainerItem";

const styles = StyleSheet.create({
  customizeTagsPageContainer: {
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

const CustomizeTagsPage = () => {
  const tagData = useSelector((state) => state.tagReducer);
  return (
    <View style={styles.customizeTagsPageContainer}>
      <Header text={"Tags"} />
      <FlatList
        data={tagData}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return <TagContainerItem item={item} />;
        }}
        ItemSeparatorComponent={() => <View style={styles.seperator}></View>}
      />
      <AddTagFlow />
    </View>
  );
};

export default CustomizeTagsPage;
