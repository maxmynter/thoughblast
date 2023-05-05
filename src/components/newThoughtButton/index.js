import { Dimensions, StyleSheet, View, Pressable } from "react-native";
import { theme } from "../../Styles/theme";
import elevatedShadowProps from "../../Styles/elevatedShadowProps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { toggle_create_thought_true } from "../../redux/actions/newThoughtCreationActions";
import { useState } from "react";
import { Audio } from "expo-av";
import transcribeRecording from "../../api/transcribeRecording";
import { addThought, updateThought } from "../../redux/actions/thoughtActions";
import * as FileSystem from "expo-file-system";
import NewThoughtCreationIcon from "./NewThoughtCreationIcon";
import { RECORDING_OPTIONS_PRESET_HIGH_QUALITY } from "./audioRecodingPresets";

const styles = StyleSheet.create({
  newThoughtButtonContainerView: {
    padding: 0,
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
  tagSelectorContainer: {
    paddingTop: 8,
    paddingBottom: 8,
    width: Dimensions.get("window").width - 16,
    borderRadius: 8,
    backgroundColor: theme.colorPalette[500],
    ...elevatedShadowProps,
  },
  recordInProgressContainer: {
    borderWidth: 2,
    borderColor: theme.colorPalette[50],
    backgroundColor: theme.colors.uiError,
    minHeight: 32,
    minWidth: 32,
    borderRadius: 8,
    width: "100%",
  },
  stopRecordingPressable: {},
});

const NewThoughtButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { thoughtInteraction } = useSelector(
    (state) => state.thoughtCreationReducer
  );
  const [capturingAudio, setCapturingAudio] = useState(false);
  const [recording, setRecording] = useState(undefined);

  const onClickCreateThought = () => {
    navigate("/");
    dispatch(toggle_create_thought_true());
  };

  const startRecording = async () => {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");

      let recording = new Audio.Recording();
      setRecording(recording);

      await recording.prepareToRecordAsync(
        RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );

      await recording.startAsync();
      setRecording(recording);
    } catch (err) {
      console.log("Couldn't start recording", err);
    }
  };

  const onStopRecording = async () => {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    setCapturingAudio(false);

    const newThoughtID = uuidv4();
    dispatch(
      addThought({
        thought: {
          id: newThoughtID,
          status: "transcribing",
          audio: uri,
        },
      })
    );

    try {
      const transcribedRecording = await transcribeRecording(uri);
      dispatch(
        updateThought({
          thought: {
            id: newThoughtID,
            text: transcribedRecording,
            status: "transcribed",
          },
        })
      );
      FileSystem.deleteAsync(uri);
    } catch (err) {
      console.log(err);
      dispatch(
        updateThought({
          thought: {
            id: newThoughtID,
            status: "transcribeError",
            text: "❌ Something went wrong with transcribing. Tap this thought to tray again.",
          },
        })
      );
    }
  };

  const captureAudioOnLongPress = () => {
    console.log("Capture Audio");
    setCapturingAudio(true);
    const record = startRecording();
    if (record) {
      setRecording(record);
    } else {
      console.log("A problem ocurred, ", record);
    }
  };

  return (
    <>
      {!thoughtInteraction && (
        <>
          {
            <View style={styles.newThoughtButtonContainerView}>
              {capturingAudio ? (
                <Pressable
                  style={styles.stopRecordingPressable}
                  onPress={() => {
                    onStopRecording();
                  }}
                >
                  <View style={styles.recordInProgressContainer} />
                </Pressable>
              ) : (
                <NewThoughtCreationIcon
                  onClickCreateThought={onClickCreateThought}
                  captureAudioOnLongPress={captureAudioOnLongPress}
                />
              )}
            </View>
          }
        </>
      )}
    </>
  );
};
export default NewThoughtButton;
