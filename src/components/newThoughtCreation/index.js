import Constants from "expo-constants";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Platform,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";
import TagSelector from "./TagSelector";
import thoughtViewContainer from "../../Styles/thoughtViewContainer";
import { useDispatch, useSelector } from "react-redux";
import { addThought, updateThought } from "../../redux/actions/thoughtActions";
import elevatedShadowProps from "../../Styles/elevatedShadowProps";
import { toggle_create_thought_false } from "../../redux/actions/newThoughtCreationActions";
import DeleteThoughtButton from "./DeleteThoughtButton";
import { theme } from "../../Styles/theme";
import { FlatList } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    position: "absolute",
    backgroundColor: theme.colorPalette[50],
    width: Dimensions.get("window").width,
    bottom: 16,
    flex: 1,
    paddingTop: 4,
    maxHeight: Dimensions.get("window").height - Constants.statusBarHeight - 24,
    ...elevatedShadowProps,
  },
  newThoughtViewContainer: {
    ...thoughtViewContainer,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
    minHeight: 100,
    display: "flex",
    flexDirection: "row",
  },
  newThoughtTextInputView: { flexShrink: 1 },
  textInputStyle: {},
  tagSelectorContainerView: {
    marginBottom: 16,
    paddingTop: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  invisibleContainerToDetectClickOutside: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
});

function NewThoughtCreation() {
  const tags = useSelector((state) => state.tagReducer);
  const { thoughtInteraction, item } = useSelector(
    (state) => state.thoughtCreationReducer
  );
  const [thought, setThought] = useState(null);
  const dispatch = useDispatch();

  const submitThought = (tag) => {
    console.log("submitting", tag);
    if (item) {
      dispatch(
        updateThought({
          thought: { ...item, tag: tag.symbol, text: thought },
        })
      );
    } else {
      dispatch(
        addThought({
          thought: { tag: tag.symbol, text: thought },
        })
      );
    }
    dispatch(toggle_create_thought_false());
    setThought(null);
  };

  const onClickOutside = () => {
    if (thoughtInteraction == "create") {
      dispatch(toggle_create_thought_false());
    }
    if (thoughtInteraction == "edit") {
      // on click outside when thought edited, changes the thought
      dispatch(
        updateThought({
          thought: { ...item, text: thought },
        })
      );
      setThought(null);
      dispatch(toggle_create_thought_false());
    }
  };

  const onPressDelete = () => {
    Alert.alert(
      "Delete Thought",
      "Are you sure you want to delete the thought?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            dispatch(toggle_create_thought_false());
            dispatch(
              updateThought({
                thought: { ...item, status: "deleted" },
              })
            );
            setThought(null);
          },
        },
      ]
    );
  };

  return (
    <>
      {thoughtInteraction && (
        <>
          <TouchableWithoutFeedback onPress={onClickOutside}>
            <View style={styles.invisibleContainerToDetectClickOutside}></View>
          </TouchableWithoutFeedback>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingView}
          >
            {thoughtInteraction == "edit" && (
              <DeleteThoughtButton onPress={onPressDelete} />
            )}
            <View style={styles.newThoughtViewContainer}>
              <View style={styles.newThoughtTextInputView}>
                <TextInput
                  placeholder="Whats on your mind?"
                  multiline={true}
                  style={styles.textInputStyle}
                  autoFocus={true}
                  value={thought}
                  defaultValue={item ? item.text : null}
                  onChangeText={(newText) => setThought(newText)}
                />
              </View>
            </View>
            <View style={styles.tagSelectorContainerView}>
              <FlatList
                data={tags}
                keyboardShouldPersistTaps={"handled"}
                horizontal={true}
                renderItem={({ item }) => (
                  <TagSelector
                    key={item.id}
                    tag={item.symbol}
                    handleSubmit={() => {
                      submitThought(item);
                    }}
                  />
                )}
              />
            </View>
          </KeyboardAvoidingView>
        </>
      )}
    </>
  );
}

export default NewThoughtCreation;
