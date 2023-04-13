import Constants from "expo-constants";
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
  allThoughtsContainer: {
    margin: theme.containers.margin,
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    display: "flex",
    justifyContent: "space-between",
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
      <View style={styles.allThoughtsContainer}>
        <AllDaysView />
      </View>
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

//<View style={styles.appContainer}>
