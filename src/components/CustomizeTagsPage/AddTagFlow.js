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
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../../Styles/theme";
import thoughtViewContainer from "../../Styles/thoughtViewContainer";
import elevatedShadowProps from "../../Styles/elevatedShadowProps";
import { addTag, removeTag } from "../../redux/actions/tagActions";
import {
  toggle_create_tag_false,
  toggle_create_tag_true,
} from "../../redux/actions/tagInteractionActions";
import DeleteThoughtButton from "../utils/DeleteThoughtButton";

const styles = StyleSheet.create({
  buttonContainer: {
    ...thoughtViewContainer,
    ...elevatedShadowProps,
    backgroundColor: theme.colorPalette[950],
    display: "flex",
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: { color: theme.colorPalette[100], fontWeight: 600 },
  keyboardAvoidingView: { paddingTop: 4 },
  tagDescriptionInputStyle: {
    ...thoughtViewContainer,
    backgroundColor: theme.colorPalette[950],
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
  emojiSelectorViewContainer: {
    backgroundColor: theme.colorPalette[50],
    position: "absolute",
    top: "70%",
    maxHeight: Dimensions.get("window").height,
  },
});

const AddTagFlow = () => {
  const { tagInteraction, item } = useSelector(
    (state) => state.tagCreationReducer
  );
  const [newTagDescription, setNewTagDescription] = useState("");
  const [selectTag, setSelectTag] = useState(false);
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();

  const cleanup = () => {
    dispatch(toggle_create_tag_false());
    setShowError(false);
    setSelectTag(false);
    setNewTagDescription("");
  };
  const onClickOutside = () => {
    console.log("Clicked Outside");
    cleanup();
  };

  const onPressDelete = () => {
    console.log("DELETE");
    console.log("in delete", item.id);
    dispatch(removeTag(item.id));
    cleanup();
  };

  if (tagInteraction) {
    return (
      <>
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
            {tagInteraction == "edit" && (
              <DeleteThoughtButton onPress={onPressDelete} />
            )}
            {!selectTag ? (
              <>
                <TextInput
                  autoFocus={true}
                  placeholderTextColor={theme.colors.uiWhite}
                  placeholder="Tag Description"
                  defaultValue={item ? item.description : null}
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
              </>
            ) : (
              <TextInput
                autoFocus={true}
                placeholderTextColor={theme.colors.uiWhite}
                placeholder="Select single Emoji or letter as Tag Identifier"
                style={styles.tagDescriptionInputStyle}
                onChangeText={(emoji) => {
                  dispatch(
                    addTag({
                      symbol: emoji,
                      description: newTagDescription,
                    })
                  );
                  setSelectTag(false);

                  dispatch(toggle_create_tag_false());
                  setNewTagDescription("");
                }}
              />
            )}
          </KeyboardAvoidingView>
        </>
      </>
    );
  }
  if (!tagInteraction) {
    return (
      <Pressable
        onPress={() => {
          dispatch(toggle_create_tag_true());
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
