import { Pressable } from "react-native";
import ThoughtBubble from "../utils/ThoughtBubble";

const TagContainerItem = ({ item }) => {
  const onPress = () => {
    console.log("pressed");
    //TODO think of a smart way to edit this
  };
  return (
    <Pressable onPress={onPress}>
      <ThoughtBubble
        key={item.id}
        item={{ text: item.description, tag: item.symbol }}
      />
    </Pressable>
  );
};

export default TagContainerItem;
