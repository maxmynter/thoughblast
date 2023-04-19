import { View, StyleSheet } from "react-native";
import ButtonAnimationWrapper from "./ButtonAnimationWrapper";
import { theme } from "../../Styles/theme";

const GoToPageButton = (props) => {
  const styles = StyleSheet.create({
    buttonAnimationWrapperContainerWithEdges: {
      borderLeftWidth: props.leftBorder ? 1 : 0,
      borderRightWidth: props.rightBorder ? 1 : 0,
      borderColor: theme.colorPalette[100],
    },
    backgroundContainerView: {
      backgroundColor: props.isOnPage ? theme.colorPalette[300] : null,
      borderRadius: 16,
    },
  });
  return (
    <View style={styles.buttonAnimationWrapperContainerWithEdges}>
      <View style={styles.backgroundContainerView}>
        <ButtonAnimationWrapper onClick={props.onClick}>
          {props.children}
        </ButtonAnimationWrapper>
      </View>
    </View>
  );
};
export default GoToPageButton;
