import { Dimensions, StyleSheet, Text, View, Alert } from "react-native";
import { theme } from "../../Styles/theme";
import elevatedShadowProps from "../../Styles/elevatedShadowProps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggle_create_thought_true } from "../../redux/actions/newThoughtCreationActions";
import { useState } from "react";
import { Audio } from "expo-av";
import transcribeRecording from "../../api/transcribeRecording";
import TagList from "../newThoughtCreation/TagList";
import { addThought } from "../../redux/actions/thoughtActions";
import * as FileSystem from "expo-file-system";
import NewThoughtCreationIcon from "./NewThoughtCreationIcon";

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
  tagSelectorContainer: {
    paddingTop: 8,
    paddingBottom: 8,
    width: Dimensions.get("window").width - 16,
    borderRadius: 8,
    backgroundColor: theme.colorPalette[500],
    ...elevatedShadowProps,
  },
  recordInProgressContainer: {
    ...elevatedShadowProps,
    marginLeft: 8,
    marginRight: 8,
    backgroundColor: theme.colors.uiError,
    borderRadius: 8,
    marginBottom: 8,
    width: "100%",
  },
  recordInProgressText: {
    fontWeight: "bold",
    textAlign: "center",
    color: theme.colorPalette[50],
    padding: 4,
  },
  recordingWrapper: {
    position: "absolute",
    bottom: Dimensions.get("window").height * 0.17,
    right: 8,
    left: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingAnimationView: {
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderWidth: 4,
    borderColor: theme.colorPalette[200],
  },
});

const NewThoughtButton = ({ setAwaitTranscription }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { thoughtInteraction } = useSelector(
    (state) => state.thoughtCreationReducer
  );
  const tags = useSelector((state) => state.tagReducer);
  const [capturingAudio, setCapturingAudio] = useState(false);
  const [recording, setRecording] = useState(undefined);
  const [selectedTag, setSelectedTag] = useState(false);

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

      const RECORDING_OPTIONS_PRESET_HIGH_QUALITY = {
        android: {
          extension: ".mp4",
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AMR_NB,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        ios: {
          extension: ".wav",
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MIN,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
      };
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

  const onStopRecording = async (tagOfRecording) => {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    setCapturingAudio(false);

    setSelectedTag(false);
    setAwaitTranscription(true);
    try {
      const transcribedRecording = await transcribeRecording(uri);
      dispatch(
        addThought({
          thought: {
            tag: tags.find((tag) => tag.id === tagOfRecording.id).symbol,
            text: transcribedRecording,
          },
        })
      );
      FileSystem.deleteAsync(uri);
    } catch (err) {
      console.log("Error. Smth. went wrong... ", err.response.data);
      Alert.alert("Error", "Something went wrong with transcribing", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
    setAwaitTranscription(false);
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
          {capturingAudio && !selectedTag ? (
            <View style={styles.recordingWrapper}>
              <View style={styles.recordInProgressContainer}>
                <Text style={styles.recordInProgressText}>
                  Recording ... Select TAG to Stop
                </Text>
              </View>
              <View style={styles.tagSelectorContainer}>
                <TagList
                  handlePressTag={(item) => {
                    setSelectedTag(true);
                    onStopRecording(item);
                  }}
                />
              </View>
            </View>
          ) : (
            <View style={styles.newThoughtButtonContainerView}>
              {capturingAudio ? null : (
                <NewThoughtCreationIcon
                  onClickCreateThought={onClickCreateThought}
                  captureAudioOnLongPress={captureAudioOnLongPress}
                />
              )}
            </View>
          )}
        </>
      )}
    </>
  );
};
export default NewThoughtButton;
