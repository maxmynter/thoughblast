import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import ButtonAnimationWrapper from "../utils/ButtonAnimationWrapper";
import { theme } from "../../Styles/theme";
import elevatedShadowProps from "../../Styles/elevatedShadowProps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggle_create_thought_true } from "../../redux/actions/newThoughtCreationActions";
import footerText from "../../Styles/footerText";
import { useState } from "react";

const styles = StyleSheet.create({
  newThoughtButtonContainerView: {
    position: "absolute",
    bottom: Dimensions.get("window").height * 0.17,
    right: 8,
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
    backgroundColor: theme.colorPalette[500],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...elevatedShadowProps,
  },
  newThoughtButtonContentWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  newThoughtButtonEmoji: {
    textAlign: "center",
    fontSize: footerText.fontSize,
  },
  newThoughtButtonText: {
    color: theme.colorPalette[50],
    fontWeight: "bold",
    fontSize: 11,
    textAlignVertical: "center",
    textAlign: "center",
  },
  captureAudioSquare: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: theme.colors.uiError,
    borderWidth: 1,
    borderColor: theme.colorPalette[50],
  },
});

const NewThoughtCreationButton = ({
  onClickCreateThought,
  captureAudioOnLongPress,
}) => {
  return (
    <ButtonAnimationWrapper
      onClick={onClickCreateThought}
      onLongPress={captureAudioOnLongPress}
    >
      <View styles={styles.newThoughtButtonContentWrapper}>
        <Text style={styles.newThoughtButtonEmoji}>🤯</Text>
        <Text style={styles.newThoughtButtonText}>New</Text>
      </View>
    </ButtonAnimationWrapper>
  );
};

const AudioCaptureInProgress = ({ onStopRecording }) => {
  return (
    <Pressable onPress={onStopRecording}>
      <View style={styles.captureAudioSquare}></View>
    </Pressable>
  );
};

const NewThoughtButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { thoughtInteraction } = useSelector(
    (state) => state.thoughtCreationReducer
  );
  const [capturingAudio, setCapturingAudio] = useState(false);

  const onClickCreateThought = () => {
    navigate("/");
    dispatch(toggle_create_thought_true());
  };

  const captureAudioOnLongPress = () => {
    console.log("Capture Audio");
    setCapturingAudio(true);
  };

  return (
    <>
      {!thoughtInteraction && (
        <View style={styles.newThoughtButtonContainerView}>
          {capturingAudio ? (
            <AudioCaptureInProgress
              onStopRecording={() => setCapturingAudio(false)}
            />
          ) : (
            <NewThoughtCreationButton
              onClickCreateThought={onClickCreateThought}
              captureAudioOnLongPress={captureAudioOnLongPress}
            />
          )}
        </View>
      )}
    </>
  );
};
export default NewThoughtButton;
