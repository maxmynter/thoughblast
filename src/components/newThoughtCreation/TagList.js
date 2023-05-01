import { FlatList } from "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import TagSelector from "./TagSelector";

const styles = StyleSheet.create({
  tagSelectorContainerView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  tagListContainerStyles: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const TagList = ({ handlePressTag, selectedTagID }) => {
  const tags = useSelector((state) => state.tagReducer);
  return (
    <View style={styles.tagSelectorContainerView}>
      <FlatList
        data={tags.filter((tag) => tag.status !== "deleted")}
        autoFocus={true}
        keyboardShouldPersistTaps={"handled"}
        horizontal={true}
        contentContainerStyle={styles.tagListContainerStyles}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TagSelector
            key={item.id}
            tag={item.symbol}
            isSelected={item.id === selectedTagID}
            handlePress={() => handlePressTag(item)}
          />
        )}
      />
    </View>
  );
};
export default TagList;
