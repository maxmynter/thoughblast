import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";
import Footer from "./components/footer";
import { theme } from "../theme";
import AllDaysView from "./components/AllDaysView";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.uiWhite,
    margin: theme.containers.margin,
    marginTop: Constants.statusBarHeight,
    marginBottom: Constants.statusBarHeight / 3,
    flexGrow: 1,
    flexShrink: 1,
    display: "flex",
    justifyContent: "space-between",
  },
});

const Main = () => {
  return (
    <>
      <View style={styles.container}>
        <AllDaysView />
      </View>
      <Footer />
    </>
  );
};

export default Main;
