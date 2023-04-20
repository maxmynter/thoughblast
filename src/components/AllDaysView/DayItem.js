import { View, Text, StyleSheet, Pressable, Linking } from "react-native";
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
    <Pressable
      onPress={() => {
        console.log("pressed", item.id);
        // on press on the component asking for feedback (id === 1 ) open feedback mail.
        if (item.id === 1) {
          Linking.openURL("mailto:maxmynter@.com");
        }
      }}
    >
      <SwipeableComponent
        RightSwipeRevealComponents={RightSwipeRevealComponents}
        rightSwipeActions={rightSwipeActions}
      >
        <ThoughtBubble item={item} />
      </SwipeableComponent>
    </Pressable>
  );
};

export default DayItem;

/*



*/
