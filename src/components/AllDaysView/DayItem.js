import { View, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { pinThought } from "../../redux/actions/thoughtActions";
import { theme } from "../../../theme";
import ThoughtBubble from "./ThoughtBubble";

const styles = StyleSheet.create({
  rightSwipeWrapperView: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    backgroundColor: theme.colors.uiGrey,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
  },
  rightSwipeTextItem: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
});

const DayItem = ({ item }) => {
  const dispatch = useDispatch();
  const swipeableRef = useRef();

  const RightSwipeActions = () => {
    return (
      <View style={styles.rightSwipeWrapperView}>
        <Text style={styles.rightSwipeTextItem}>🥳 Pinned!!!</Text>
        <Text style={styles.rightSwipeTextItem}>📍</Text>
      </View>
    );
  };
  const swipeFromRightOpen = (direction) => {
    if (direction == "right") {
      console.log("Swiped", direction, new Date());
      dispatch(pinThought(item.id));
    }
  };
  const closeSwipeable = () => {
    swipeableRef.current.close();
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={RightSwipeActions}
      onSwipeableOpen={(direction) => {
        swipeFromRightOpen(direction);
        closeSwipeable();
      }}
      overshootLeft={false}
      friction={2.5}
      rightThreshold={0.2}
    >
      <ThoughtBubble item={item} />
    </Swipeable>
  );
};

export default DayItem;
