import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Linking,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { pinThought, updateThought } from "../../redux/actions/thoughtActions";
import SwipeableComponent from "../SwipeableComponent/SwipeableComponent";
import ThoughtBubble from "../utils/ThoughtBubble";
import revealOnRightSwipeWrapperView from "../../Styles/revealOnRightSwipeWrapperView";
import { toggle_create_thought_update } from "../../redux/actions/newThoughtCreationActions";
import transcribeRecording from "../../api/transcribeRecording";
import Constants from "expo-constants";

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
      onLongPress={() => {
        dispatch(toggle_create_thought_update(item));
        console.log("Long Press");
      }}
      onPress={async () => {
        console.log("pressed", item.id);
        // on press on the component asking for feedback (id === 1 ) open feedback mail.
        if (item.id === 1) {
          Linking.openURL("mailto:thoughtblast4buildspace@gmail.com");
        }
        if (item.status === "transcribeError") {
          try {
            dispatch(
              updateThought({
                thought: { id: item.id, status: "transcribing" },
              })
            );
            const transcribedRecording = await transcribeRecording(item.audio);
            dispatch(
              updateThought({
                thought: {
                  id: item.id,
                  text: transcribedRecording,
                  status: "transcribed",
                },
              })
            );
          } catch (err) {
            console.log("Error", err);
            dispatch(
              updateThought({
                thought: { id: item.id, status: "transcribeError" },
              })
            );
            Alert.alert(
              "Error",
              `Something went wrong. Try again later\n${err}`,
              [{ text: "OK" }]
            );
          }
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
