import Constants from "expo-constants";
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import TagSelector from "./TagSelector";
import thoughtViewContainer from "../../Styles/thoughtViewContainer";
import { theme } from "../../../theme";
import { useDispatch } from "react-redux";
import { addThought } from "../../redux/actions/thoughtActions";
import { useState } from "react";

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    position: "absolute",
    width: Dimensions.get("window").width,
    bottom: 16,
    flex: 1,
    maxHeight: Dimensions.get("window").height - Constants.statusBarHeight - 24,
  },
  newThoughtViewContainer: {
    ...thoughtViewContainer,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
    minHeight: 100,
    shadowColor: theme.colors.uiBlack,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
    display: "flex",
    flexDirection: "row",
  },
  newThoughtTextInputView: { flexShrink: 1 },
  textInputStyle: {},
  tagSelectorContainerView: {
    backgroundColor: theme.colors.uiGrey,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 8,
    padding: 8,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
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

function NewThoughtCreation({
  setNewThoughtCreationInProgress,
  newThoughtCreationInProgress,
}) {
  const [thought, setThought] = useState(null);
  const dispatch = useDispatch();

  const submitThought = (tag) => {
    console.log("thought");
    dispatch(
      addThought({
        title: "Friday, 21st of May",
        thought: { tag, text: thought },
      })
    );
    setNewThoughtCreationInProgress(false);
    setThought(null);
  };

  const onClickOutside = () => {
    console.log("Clicked Outside");
    setNewThoughtCreationInProgress(false);
  };

  const tags = ["🔥", "💡"];
  return (
    <>
      {newThoughtCreationInProgress && (
        <TouchableWithoutFeedback
          style={styles.invisibleContainerToDetectClickOutside}
          onPress={onClickOutside}
        >
          <View style={styles.invisibleContainerToDetectClickOutside}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.keyboardAvoidingView}
            >
              <View style={styles.tagSelectorContainerView}>
                {tags.map((tag) => (
                  <TagSelector
                    key={tag}
                    tag={tag}
                    handleSubmit={() => submitThought(tag)}
                  />
                ))}
              </View>
              <View style={styles.newThoughtViewContainer}>
                <View style={styles.newThoughtTextInputView}>
                  <TextInput
                    placeholder="Whats on your mind?"
                    multiline={true}
                    style={styles.textInputStyle}
                    autoFocus={true}
                    onChangeText={(newText) => setThought(newText)}
                  />
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      )}
    </>
  );
}

export default NewThoughtCreation;
//Todo, make thought disappear when click outside
//Persist text when making thought away
//Add button to discard everything written and blast new thought
