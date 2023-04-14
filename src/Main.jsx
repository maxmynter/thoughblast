import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";
import Footer from "./components/footer";
import AllDaysView from "./components/AllDaysView";
import NewThoughtCreation from "./components/newThoughtCreation";
import { theme } from "../theme";
import HotThoughtsPinwall from "./components/HotThoughtsPinwall";

const styles = StyleSheet.create({
  appContainer: { backgroundColor: theme.colors.uiWhite, flex: 1 },
});

const Main = () => {
  const [newThoughtCreationInProgress, setNewThoughtCreationInProgress] =
    useState(true);

  return (
    <View style={styles.appContainer}>
      <Routes>
        <Route path="/" element={<AllDaysView />} />
        <Route path="/hotThoughts" element={<HotThoughtsPinwall />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <NewThoughtCreation
        newThoughtCreationInProgress={newThoughtCreationInProgress}
        setNewThoughtCreationInProgress={setNewThoughtCreationInProgress}
      />
      <Footer
        display={!newThoughtCreationInProgress}
        onCreateThought={() => setNewThoughtCreationInProgress(true)}
      />
    </View>
  );
};

export default Main;
