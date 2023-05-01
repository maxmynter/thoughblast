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
  Pressable,
} from "react-native";
import { useState } from "react";
import TagSelector from "./TagSelector";
import thoughtViewContainer from "../../Styles/thoughtViewContainer";
import { useDispatch, useSelector } from "react-redux";
import { addThought, updateThought } from "../../redux/actions/thoughtActions";
import elevatedShadowProps from "../../Styles/elevatedShadowProps";
import { toggle_create_thought_false } from "../../redux/actions/newThoughtCreationActions";
import DeleteThoughtButton from "../utils/DeleteThoughtButton";
import { theme } from "../../Styles/theme";
import { FlatList } from "react-native-gesture-handler";
import TagList from "./TagList";

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
  invisibleContainerToDetectClickOutside: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  submitButton: {
    backgroundColor: theme.colorPalette[950],
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 8,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 8,
    minHeight: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: theme.colorPalette[50],
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  tagListWrapper: { paddingTop: 8, marginBottom: 16 },
});

function NewThoughtCreation() {
  const tags = useSelector((state) => state.tagReducer);
  const { thoughtInteraction, item } = useSelector(
    (state) => state.thoughtCreationReducer
  );
  const [thought, setThought] = useState(null);
  const [selectedTagID, setSelectedTagID] = useState(
    tags.find((tag) => "deleted" !== tag.status).id
  );
  const dispatch = useDispatch();

  const submitThought = (tag) => {
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
    if (
      thoughtInteraction == "create" &&
      (thought === null || thought === "")
    ) {
      //Dismiss thought, if thought was not edited
      dispatch(toggle_create_thought_false());
    }
    if (thoughtInteraction == "create" && thought !== null && thought !== "") {
      //Submit thought on click outside
      submitThought(tags.find((tag) => tag.id === selectedTagID));
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

  const handlePressTag = (item) => {
    if (item.id === selectedTagID) {
      submitThought(item);
    } else {
      setSelectedTagID(item.id);
    }
  };

  const checkThoughtSubmittable = () => {
    if (thought !== null && thought.length > 0) {
      return true;
    }
    return false;
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
            <View style={styles.tagListWrapper}>
              <TagList
                selectedTagID={selectedTagID}
                handlePressTag={handlePressTag}
              />
            </View>
            <Pressable
              onPress={() => {
                if (checkThoughtSubmittable()) {
                  submitThought(tags.find((tag) => tag.id === selectedTagID));
                }
              }}
            >
              <View
                style={{
                  ...styles.submitButton,
                  backgroundColor: checkThoughtSubmittable()
                    ? styles.submitButton.backgroundColor
                    : theme.colorPalette[200],
                }}
              >
                <Text style={styles.submitButtonText}>
                  {thoughtInteraction == "create" ? "Blast" : "Save"}
                </Text>
              </View>
            </Pressable>
          </KeyboardAvoidingView>
        </>
      )}
    </>
  );
}

export default NewThoughtCreation;
