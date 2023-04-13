import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";
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
});

const Main = () => {
  const [newThoughtCreationInProgress, setNewThoughtCreationInProgress] =
    useState(true);
  return (
    <>
      <View style={styles.allThoughtsContainer}>
        <AllDaysView />
      </View>
      {newThoughtCreationInProgress && (
        <NewThoughtCreation
          setNewThoughtCreationInProgress={setNewThoughtCreationInProgress}
        />
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
