import { View, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { pinThought } from "../../redux/actions/thoughtActions";
import SwipeableComponent from "../SwipeableComponent/SwipeableComponent";
import ThoughtBubble from "./ThoughtBubble";
import revealOnRightSwipeWrapperView from "../../Styles/revealOnRightSwipeWrapperView";

const styles = StyleSheet.create({
  rightSwipeWrapperView: { ...revealOnRightSwipeWrapperView },
  rightSwipeTextItem: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
});

const DayItem = ({ item }) => {
  const dispatch = useDispatch();

  const RightSwipeRevealComponents = () => {
    return (
      <View style={styles.rightSwipeWrapperView}>
        <Text style={styles.rightSwipeTextItem}>🥳 Pinned!!!</Text>
        <Text style={styles.rightSwipeTextItem}>📍</Text>
      </View>
    );
  };

  const rightSwipeActions = () => {
    return dispatch(pinThought(item.id));
  };

  return (
    <SwipeableComponent
      RightSwipeRevealComponents={RightSwipeRevealComponents}
      rightSwipeActions={rightSwipeActions}
    >
      <ThoughtBubble item={item} />
    </SwipeableComponent>
  );
};

export default DayItem;

/*



*/
