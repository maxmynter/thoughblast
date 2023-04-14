import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import Footer from "./components/footer";
import { theme } from "../theme";
import AllDaysView from "./components/AllDaysView";
import { useState } from "react";
import NewThoughtCreation from "./components/newThoughtCreation";

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: theme.colors.uiWhite,
  },
  invisibleContainerToDetectClickOutside: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
});

const Main = () => {
  const [newThoughtCreationInProgress, setNewThoughtCreationInProgress] =
    useState(true);

  const onClickOutside = () => {
    console.log("Clicked Outside");
    setNewThoughtCreationInProgress(false);
  };
  return (
    <>
      <AllDaysView />
      {newThoughtCreationInProgress && (
        <TouchableWithoutFeedback
          style={styles.invisibleContainerToDetectClickOutside}
          onPress={onClickOutside}
        >
          <View style={styles.invisibleContainerToDetectClickOutside}>
            <NewThoughtCreation
              setNewThoughtCreationInProgress={setNewThoughtCreationInProgress}
            />
          </View>
        </TouchableWithoutFeedback>
      )}
      <Footer
        display={!newThoughtCreationInProgress}
        onCreateThought={() => setNewThoughtCreationInProgress(true)}
      />
    </>
  );
};

export default Main;
