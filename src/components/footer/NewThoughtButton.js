import { StyleSheet, Text, Pressable, Animated } from "react-native";
import { useState } from "react";

const styles = StyleSheet.create({
  NewThoughtButtonText: {
    paddingLeft: 45,
    paddingRight: 45,
    fontSize: 46,
    paddingBottom: 8,
  },
});

const NewThoughtButton = ({ onClick }) => {
  const [scaleAnimation] = useState(new Animated.Value(1));
  //const dispatch = useDispatch();

  const handleTap = () => {
    Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
    onClick();
  };
  return (
    <Animated.View style={{ transform: [{ scale: scaleAnimation }] }}>
      <Pressable onPress={handleTap}>
        <Text style={styles.NewThoughtButtonText}>✒️</Text>
      </Pressable>
    </Animated.View>
  );
};
export default NewThoughtButton;
