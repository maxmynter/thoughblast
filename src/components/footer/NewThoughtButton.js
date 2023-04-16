import { StyleSheet, Text } from "react-native";
import ButtonAnimationWrapper from "./ButtonAnimationWrapper";

const styles = StyleSheet.create({
  NewThoughtButtonText: {
    paddingLeft: 45,
    paddingRight: 45,
    fontSize: 46,
    paddingBottom: 8,
  },
});

const NewThoughtButton = ({ onClick }) => {
  return (
    <ButtonAnimationWrapper onClick={onClick}>
      <Text style={styles.NewThoughtButtonText}>💭</Text>
    </ButtonAnimationWrapper>
  );
};
export default NewThoughtButton;
