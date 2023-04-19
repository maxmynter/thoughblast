import { useRef } from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";

const SwipeableComponent = (props) => {
  const swipeableRef = useRef();

  const RightSwipeRevealComponents = () => {
    return <>{props.RightSwipeRevealComponents()}</>;
  };
  const rightSwipeActions = (direction) => {
    if (direction == "right") {
      props.rightSwipeActions();
    }
  };
  const closeSwipeable = () => {
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={RightSwipeRevealComponents}
      onSwipeableOpen={(direction) => {
        rightSwipeActions(direction);
        closeSwipeable();
      }}
      overshootLeft={false}
      friction={2.5}
      rightThreshold={55}
    >
      {props.children}
    </Swipeable>
  );
};

export default SwipeableComponent;
