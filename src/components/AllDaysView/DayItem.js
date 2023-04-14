import { View, Text, StyleSheet } from "react-native";
import { useRef } from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { pinThought } from "../../redux/actions/thoughtActions";

import thoughtViewContainer from "../../Styles/thoughtViewContainer";
import { theme } from "../../../theme";
import { useDispatch } from "react-redux";

const styles = StyleSheet.create({
  thoughtViewContainer: {
    ...thoughtViewContainer,
    display: "flex",
    flexDirection: "row",
  },
  noteContainer: {
    padding: 8,
    paddingRight: 8,
    flexShrink: 1,
  },
  notetext: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tagContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    margin: 8,
  },
  tagText: {},
});

const DayItem = ({ item }) => {
  const dispatch = useDispatch();
  const swipeableRef = useRef();
  const { text, tag, id } = item;

  const RightSwipeActions = () => {
    return (
      <View
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "row",
          backgroundColor: theme.colors.uiGrey,
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            paddingHorizontal: 30,
            paddingVertical: 20,
          }}
        >
          🥳 Pinned!!!
        </Text>
        <Text
          style={{
            paddingHorizontal: 30,
            paddingVertical: 20,
          }}
        >
          📍
        </Text>
      </View>
    );
  };

  const swipeFromRightOpen = (direction) => {
    if (direction == "right") {
      console.log("Swiped", direction, new Date());
      dispatch(pinThought(id));
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
      <View style={styles.thoughtViewContainer} key={id}>
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
        <View style={styles.noteContainer}>
          <Text style={styles.notetext}>{text}</Text>
        </View>
      </View>
    </Swipeable>
  );
};

export default DayItem;
