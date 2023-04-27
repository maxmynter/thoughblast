import { Pressable } from "react-native";
import ThoughtBubble from "../utils/ThoughtBubble";
import { useDispatch } from "react-redux";
import { toggle_create_tag_update } from "../../redux/actions/tagInteractionActions";

const TagContainerItem = ({ item }) => {
  const dispatch = useDispatch();

  const onPress = (item) => {
    dispatch(toggle_create_tag_update(item));
  };
  return (
    <Pressable onPress={() => onPress(item)}>
      <ThoughtBubble
        key={item.id}
        item={{ text: item.description, tag: item.symbol }}
      />
    </Pressable>
  );
};

export default TagContainerItem;
