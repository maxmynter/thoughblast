import { View, Text, StyleSheet } from "react-native";
import ThoughtBubble from "../AllDaysView/ThoughtBubble";
import { useDispatch } from "react-redux";
import { unPinThought } from "../../redux/actions/thoughtActions";
import revealOnRightSwipeWrapperView from "../../Styles/revealOnRightSwipeWrapperView";
import SwipeableComponent from "../SwipeableComponent/SwipeableComponent";
import { theme } from "../../Styles/theme";

const styles = StyleSheet.create({
  rightSwipeWrapperView: {
    ...revealOnRightSwipeWrapperView,
    flexDirection: "row-reverse",
  },
  rightSwipeTextItem: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    color: theme.colorPalette[950],
  },
});

const PinnwallItem = ({ item, unPinItem }) => {
  const dispatch = useDispatch();

  const RightSwipeRevealComponents = () => {
    return (
      <View style={styles.rightSwipeWrapperView}>
        <Text style={styles.rightSwipeTextItem}>🚫 Unpin</Text>
      </View>
    );
  };

  const rightSwipeActions = () => {
    unPinItem();
    return dispatch(unPinThought(item.id));
  };
  return (
    <SwipeableComponent
      RightSwipeRevealComponents={RightSwipeRevealComponents}
      rightSwipeActions={rightSwipeActions}
    >
      <ThoughtBubble key={item.id} item={item} />
    </SwipeableComponent>
  );
};

export default PinnwallItem;
