import { View, Text, Pressable, StyleSheet } from "react-native";
import { theme } from "../../Styles/theme";

const minHeightAndLineHeight = 50;

const styles = StyleSheet.create({
  tagSelectorTagViewWrapper: {
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 85,
    height: minHeightAndLineHeight,
    borderRadius: 16,
    marginLeft: 8,
    backgroundColor: theme.colorPalette[950],
  },
  tagSelectorText: {
    margin: 0,
    padding: 0,
    lineHeight: minHeightAndLineHeight,
  },
});

const dynamicBorderWrapperForTagSelection = (isSelected) => {
  if (isSelected) {
    const borderWidth = 5;
    return {
      ...styles.tagSelectorTagViewWrapper,
      height: styles.tagSelectorTagViewWrapper.height + borderWidth,
      width: styles.tagSelectorTagViewWrapper.width + borderWidth,
      borderWidth,
      borderColor: theme.colorPalette[400],
    };
  } else {
    return styles.tagSelectorTagViewWrapper;
  }
};

const TagSelectorTag = ({ tag, isSelected }) => {
  return (
    <View style={dynamicBorderWrapperForTagSelection(isSelected)}>
      <Text style={styles.tagSelectorText}>{tag}</Text>
    </View>
  );
};

const TagSelector = ({ tag, handlePress, isSelected }) => {
  return (
    <Pressable onPress={handlePress}>
      <TagSelectorTag tag={tag} isSelected={isSelected} />
    </Pressable>
  );
};

export default TagSelector;
