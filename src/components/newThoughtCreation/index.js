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
import { useState } from "react";
import TagSelector from "./TagSelector";
import thoughtViewContainer from "../../Styles/thoughtViewContainer";
import { theme } from "../../Styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { addThought } from "../../redux/actions/thoughtActions";
import elevatedShadowProps from "../../Styles/elevatedShadowProps";

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
    display: "flex",
    flexDirection: "row",
    ...elevatedShadowProps,
  },
  newThoughtTextInputView: { flexShrink: 1 },
  textInputStyle: {},
  tagSelectorContainerView: {
    backgroundColor: theme.colorPalette[950],
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    ...elevatedShadowProps,
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
  const tags = useSelector((state) => state.tagReducer);
  const [thought, setThought] = useState(null);
  const dispatch = useDispatch();

  const submitThought = (tag) => {
    console.log("thought");
    dispatch(
      addThought({
        thought: { tag: tag.symbol, text: thought },
      })
    );
    setNewThoughtCreationInProgress(false);
    setThought(null);
  };

  const onClickOutside = () => {
    console.log("Clicked Outside");
    setNewThoughtCreationInProgress(false);
  };

  return (
    <>
      {newThoughtCreationInProgress && (
        <>
          <TouchableWithoutFeedback onPress={onClickOutside}>
            <View style={styles.invisibleContainerToDetectClickOutside}></View>
          </TouchableWithoutFeedback>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingView}
          >
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

            <View style={styles.tagSelectorContainerView}>
              {tags.map((tag) => (
                <TagSelector
                  key={tag.id}
                  tag={tag.symbol}
                  handleSubmit={() => submitThought(tag)}
                />
              ))}
            </View>
          </KeyboardAvoidingView>
        </>
      )}
    </>
  );
}

export default NewThoughtCreation;
//Persist text when making thought away
//Add button to discard everything written and blast new thought
