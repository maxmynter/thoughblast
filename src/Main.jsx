import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";
import AllDaysView from "./components/AllDaysView";
import NewThoughtCreation from "./components/newThoughtCreation";
import { theme } from "./Styles/theme";
import HotThoughtsPinwall from "./components/HotThoughtsPinwall";
import CustomizeTagsPage from "./components/CustomizeTagsPage";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";

const styles = StyleSheet.create({
  appContainer: { backgroundColor: theme.colors.uiWhite, flex: 1 },
});

const Main = () => {
  const { newThoughtCreationInProgress } = useSelector(
    (state) => state.thoughtCreationReducer
  );

  return (
    <View style={styles.appContainer}>
      <Routes>
        <Route path="/" element={<AllDaysView />} />
        <Route path="/customizeTags" element={<CustomizeTagsPage />} />
        <Route path="/hotThoughts" element={<HotThoughtsPinwall />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <NewThoughtCreation />
      <Footer display={!newThoughtCreationInProgress} />
    </View>
  );
};

export default Main;
