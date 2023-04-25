import { Dimensions, StyleSheet, Text, View } from "react-native";
import ButtonAnimationWrapper from "../utils/ButtonAnimationWrapper";
import { theme } from "../../Styles/theme";
import elevatedShadowProps from "../../Styles/elevatedShadowProps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggle_create_thought_true } from "../../redux/actions/newThoughtCreationActions";
import footerText from "../../Styles/footerText";

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
});

const NewThoughtButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { thoughtInteraction } = useSelector(
    (state) => state.thoughtCreationReducer
  );

  const onClickCreateThought = () => {
    navigate("/");
    dispatch(toggle_create_thought_true());
  };

  return (
    <>
      {!thoughtInteraction && (
        <View style={styles.newThoughtButtonContainerView}>
          <ButtonAnimationWrapper onClick={onClickCreateThought}>
            <View styles={styles.newThoughtButtonContentWrapper}>
              <Text style={styles.newThoughtButtonEmoji}>🤯</Text>
              <Text style={styles.newThoughtButtonText}>New</Text>
            </View>
          </ButtonAnimationWrapper>
        </View>
      )}
    </>
  );
};
export default NewThoughtButton;
