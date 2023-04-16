import Constants from "expo-constants";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { theme } from "../../Styles/theme";
import { useSelector } from "react-redux";
import Header from "../Header";
import ThoughtBubble from "../AllDaysView/ThoughtBubble";

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
        renderItem={({ item }) => {
          return (
            <ThoughtBubble
              key={item.id}
              item={{ text: item.description, tag: item.symbol }}
            />
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.seperator}></View>}
      />
    </View>
  );
};

export default CustomizeTagsPage;
