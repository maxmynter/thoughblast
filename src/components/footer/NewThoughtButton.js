import { StyleSheet, Text, View } from "react-native";
import ButtonAnimationWrapper from "./ButtonAnimationWrapper";
import footerText from "../../Styles/footerText";
import { theme } from "../../Styles/theme";

const styles = StyleSheet.create({
  NewThoughtButtonText: { ...footerText },
});

const NewThoughtButton = (props) => {
  return (
    <View
      style={{
        backgroundColor: props.isOnPage ? theme.colorPalette[300] : null,
        borderRadius: 16,
      }}
    >
      <ButtonAnimationWrapper onClick={props.onClick}>
        <Text style={styles.NewThoughtButtonText}>💭</Text>
      </ButtonAnimationWrapper>
    </View>
  );
};
export default NewThoughtButton;
