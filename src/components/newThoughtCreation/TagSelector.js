import { View, Text, Pressable } from "react-native";

const TagSelectorTag = ({ tag }) => {
  return (
    <View>
      <Text>{tag}</Text>
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
