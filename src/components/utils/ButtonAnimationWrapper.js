import { Pressable, Animated } from "react-native";
import { useState } from "react";

const ButtonAnimationWrapper = (props) => {
  const [scaleAnimation] = useState(new Animated.Value(1));

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
    props.onClick();
  };
  return (
    <Animated.View style={{ transform: [{ scale: scaleAnimation }] }}>
      <Pressable onPress={handleTap}>{props.children}</Pressable>
    </Animated.View>
  );
};

export default ButtonAnimationWrapper;
