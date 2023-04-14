import { View, StyleSheet, Text } from "react-native";
import NewThoughtButton from "./NewThoughtButton";
import { theme } from "../../../theme";
import GoToPageButton from "./GoToPageButton";

const styles = StyleSheet.create({
  footerBackgroundView: {
    backgroundColor: theme.colors.uiBlack,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    paddingBottom: 3 * theme.containers.margin,
    paddingTop: theme.containers.margin,
  },
  buttonsContainerView: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    flexDirection: "row",
  },
  footerText: {
    paddingLeft: 45,
    paddingRight: 45,
    fontSize: 34,
  },
});

const onClickHotThoughts = () => {
  console.log("click");
};

const Footer = ({ display, onCreateThought }) => {
  return (
    <>
      {display && (
        <View style={styles.footerBackgroundView}>
          <View style={styles.buttonsContainerView}>
            <GoToPageButton onClick={onClickHotThoughts}>
              <Text style={styles.footerText}>📈</Text>
            </GoToPageButton>
            <NewThoughtButton onClick={onCreateThought} />
            <Text style={styles.footerText}>🚧</Text>
          </View>
        </View>
      )}
    </>
  );
};

export default Footer;
