import { StyleSheet, View } from "react-native";
import ButtonAnimationWrapper from "../utils/ButtonAnimationWrapper";
import { theme } from "../../Styles/theme";
import { Fontisto } from "@expo/vector-icons";

const styles = StyleSheet.create({
  newThoughtButtonContentWrapper: {
    padding: 0,
  },
  newThoughtButtonText: {
    flexDirection: "column",
    color: theme.colorPalette[50],
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 64,
  },
});

const NewThoughtCreationIcon = ({
  onClickCreateThought,
  captureAudioOnLongPress,
}) => {
  return (
    <ButtonAnimationWrapper
      onClick={onClickCreateThought}
      onLongPress={captureAudioOnLongPress}
    >
      <View styles={styles.newThoughtButtonContentWrapper}>
        <Fontisto name="plus-a" size={40} color={theme.colorPalette[50]} />
      </View>
    </ButtonAnimationWrapper>
  );
};

export default NewThoughtCreationIcon;
