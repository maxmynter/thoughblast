import { StyleSheet, Text, View } from "react-native";
import ButtonAnimationWrapper from "./ButtonAnimationWrapper";
import footerText from "../../Styles/footerText";
import { theme } from "../../Styles/theme";

const styles = StyleSheet.create({
  newThoughtButtonContainerView: {
    borderRadius: 16,
  },
  newThoughtButtonTextContainerView: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  NewThoughtButtonText: { ...footerText },
  newThoughtButtonExplainerText: {
    color: theme.colorPalette[50],
    fontWeight: "bold",
    fontSize: 11,
  },
});

const NewThoughtButton = (props) => {
  return (
    <View
      style={{
        ...styles.newThoughtButtonContainerView,
        backgroundColor: props.isOnPage ? theme.colorPalette[500] : null,
      }}
    >
      <ButtonAnimationWrapper onClick={props.onClick}>
        <View style={styles.newThoughtButtonTextContainerView}>
          <Text style={styles.NewThoughtButtonText}>💭</Text>
          <Text style={styles.newThoughtButtonExplainerText}>{"Enter"}</Text>
        </View>
      </ButtonAnimationWrapper>
    </View>
  );
};
export default NewThoughtButton;
