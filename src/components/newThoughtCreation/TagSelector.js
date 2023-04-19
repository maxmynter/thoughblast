import { View, Text, Pressable, StyleSheet } from "react-native";
import { theme } from "../../Styles/theme";

const minHeightAndLineHeight = 35;

const styles = StyleSheet.create({
  tagSelectorTagViewWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 75,
    minHeight: minHeightAndLineHeight,
    borderColor: theme.colorPalette[50],
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
