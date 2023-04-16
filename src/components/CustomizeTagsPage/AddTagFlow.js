import {
  Pressable,
  Text,
  TextInput,
  Platform,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import EmojiSelector from "react-native-emoji-selector";
import { theme } from "../../Styles/theme";
import thoughtViewContainer from "../../Styles/thoughtViewContainer";
import elevatedShadowProps from "../../Styles/elevatedShadowProps";
import { addTag } from "../../redux/actions/tagActions";

const styles = StyleSheet.create({
  buttonContainer: {
    ...thoughtViewContainer,
    ...elevatedShadowProps,
    backgroundColor: theme.colors.uiGrey,
    display: "flex",
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: { color: theme.colors.uiWhite, fontWeight: 600 },
  keyboardAvoidingView: {},
  tagDescriptionInputStyle: {
    ...thoughtViewContainer,
    backgroundColor: theme.colors.uiGrey,
    color: theme.colors.uiWhite,
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
  errorText: { color: theme.colors.uiError, marginBottom: 8 },
});

const AddTagFlow = () => {
  const [addingTagInProgress, setAddingTagInProgress] = useState(false);
  const [newTagDescription, setNewTagDescription] = useState("");
  const [selectTag, setSelectTag] = useState(false);
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();

  const onClickOutside = () => {
    console.log("Clicked Outside");
    setAddingTagInProgress(false);
    setShowError(false);
  };

  if (addingTagInProgress) {
    return (
      <>
        {!selectTag ? (
          <>
            <TouchableWithoutFeedback onPress={onClickOutside}>
              <View style={styles.invisibleContainerToDetectClickOutside} />
            </TouchableWithoutFeedback>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.keyboardAvoidingView}
              keyboardVerticalOffset={Platform.OS === "ios" ? 58 : 0}
            >
              {showError && (
                <Text style={styles.errorText}>
                  Description should not be Empty
                </Text>
              )}
              <TextInput
                placeholder="Tag description"
                style={styles.tagDescriptionInputStyle}
                multiline={true}
                onChangeText={(newText) => {
                  setNewTagDescription(newText);
                }}
              />

              <Pressable
                onPress={() => {
                  if (newTagDescription.length === 0) {
                    setShowError(true);
                  } else {
                    console.log("Tag Symbol");
                    setSelectTag(true);
                  }
                }}
              >
                <View style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>{"Select Tag Symbol"}</Text>
                </View>
              </Pressable>
            </KeyboardAvoidingView>
          </>
        ) : (
          <>
            <TouchableWithoutFeedback onPress={onClickOutside}>
              <View style={styles.invisibleContainerToDetectClickOutside} />
            </TouchableWithoutFeedback>
            <EmojiSelector
              onEmojiSelected={(emoji) => {
                dispatch(
                  addTag({ symbol: emoji, description: newTagDescription })
                );
                setSelectTag(false);
                setAddingTagInProgress(false);
                setNewTagDescription("");
              }}
              showHistory={false}
            />
          </>
        )}
      </>
    );
  } else {
    return (
      <Pressable
        onPress={() => {
          setAddingTagInProgress(true);
        }}
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>{"Add Tag"}</Text>
        </View>
      </Pressable>
    );
  }
};
export default AddTagFlow;
