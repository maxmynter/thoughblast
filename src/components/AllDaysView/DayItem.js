import { View, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { pinThought } from "../../redux/actions/thoughtActions";
import SwipeableComponent from "../SwipeableComponent/SwipeableComponent";
import { theme } from "../../Styles/theme";
import ThoughtBubble from "./ThoughtBubble";

const styles = StyleSheet.create({
  rightSwipeWrapperView: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    backgroundColor: theme.colorPalette[500],
    color: theme.colorPalette[100],
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
