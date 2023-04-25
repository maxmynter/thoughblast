import { View, Text, Pressable, StyleSheet } from "react-native";
import { theme } from "../../Styles/theme";

const minHeightAndLineHeight = 45;

const styles = StyleSheet.create({
  tagSelectorTagViewWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 85,
    minHeight: minHeightAndLineHeight,
    borderRadius: 16,
    marginLeft: 8,
    backgroundColor: theme.colorPalette[950],
  },
  tagSelectorText: {
    flexGrow: 1,
    lineHeight: minHeightAndLineHeight,
  },
});

const TagSelectorTag = ({ tag }) => {
  return (
    <View style={styles.tagSelectorTagViewWrapper}>
      <Text style={styles.tagSelectorText}>{tag}</Text>
    </View>
  );
};

const TagSelector = ({ tag, handleSubmit }) => {
  return (
    <Pressable onPress={handleSubmit}>
      <TagSelectorTag tag={tag} />
    </Pressable>
  );
};

export default TagSelector;
