import Constants from "expo-constants";
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  Platform,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import TagSelector from "./TagSelector";
import thoughtViewContainer from "../../Styles/thoughtViewContainer";
import { theme } from "../../Styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { addThought } from "../../redux/actions/thoughtActions";
import elevatedShadowProps from "../../Styles/elevatedShadowProps";
import { ShakeEventExpo } from "../../utils/detectShake";

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
    backgroundColor: theme.colors.uiGrey,
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

const getAIAnswer = async (thoughts) => {
  console.log("Todo, make API CALL to open AI with thoughts", thoughts);
  return "Why";
};

function NewThoughtCreation({
  setNewThoughtCreationInProgress,
  newThoughtCreationInProgress,
}) {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tagReducer);
  const [thought, _setThought] = useState(null);
  const [thoughtThread, _setThoughtThread] = useState([]);
  const [aiAnswers, setAIAnswers] = useState(false);
  const thoughtRef = useRef(thought);
  const thoughtThreadRef = useRef(thoughtThread);

  const setThought = (data) => {
    thoughtRef.current = data;
    _setThought(data);
  };

  const setThoughtThread = (data) => {
    thoughtThreadRef.current = data;
    _setThoughtThread(data);
  };

  const submitThought = async (tag) => {
    console.log("Thought ");
    dispatch(
      addThought({
        thought: {
          tag: tag.symbol,

          thoughtThread: thought
            ? [
                ...thoughtThreadRef.current,
                {
                  text: thoughtRef.current,
                  from: "user",
                  id: uuidv4(),
                },
              ]
            : thoughtThreadRef.current,
        },
      })
    );
    setNewThoughtCreationInProgress(false);
    setThoughtThread([]);
    setThought(null);
  };

  const onClickOutside = () => {
    console.log("Clicked Outside");
    setNewThoughtCreationInProgress(false);
  };

  useEffect(() => {
    console.log("useEffect");
    ShakeEventExpo.addListener(async () => {
      setAIAnswers(true);
      console.log("thought, log in Listener", thought);
      console.log("DETECTED SHAKEEE");
      const aiThought = await getAIAnswer([
        ...thoughtThreadRef.current,
        { text: thoughtRef.current },
      ]);

      const updatedThoughts = [
        ...thoughtThreadRef.current,
        {
          text: thoughtRef.current,
          from: "user",
          id: uuidv4(),
        },
        {
          text: aiThought,
          from: "ai",
          id: uuidv4(),
        },
      ];
      console.log("Updated Thoughts", updatedThoughts);
      setThoughtThread(updatedThoughts);
      setThought(null);
      setAIAnswers(false);
    });
  }, []);

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
            <FlatList
              data={thoughtThread}
              renderItem={({ item }) => {
                console.log("WHAT? ..... ", item);
                return (
                  <View key={item.id} style={styles.newThoughtViewContainer}>
                    <Text key={item.id + "from"}>{item.from}: </Text>
                    <Text key={item.id}>{item.text}</Text>
                  </View>
                );
              }}
            />

            <View style={styles.newThoughtViewContainer}>
              <View style={styles.newThoughtTextInputView}>
                <TextInput
                  placeholder="Whats on your mind?"
                  multiline={true}
                  style={styles.textInputStyle}
                  autoFocus={true}
                  value={thought}
                  onChangeText={(newText) => {
                    setThought(newText);
                  }}
                />
                {aiAnswers ? <Text>{"Thinking"}</Text> : null}
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
