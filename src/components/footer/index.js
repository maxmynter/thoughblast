import { View, StyleSheet, Text } from "react-native";
import { useNavigate } from "react-router-dom";
import NewThoughtButton from "./NewThoughtButton";
import { theme } from "../../Styles/theme";
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

const Footer = ({ display, onCreateThought }) => {
  const navigate = useNavigate();
  return (
    <>
      {display && (
        <View style={styles.footerBackgroundView}>
          <View style={styles.buttonsContainerView}>
            <GoToPageButton onClick={() => navigate("/hotThoughts")}>
              <Text style={styles.footerText}>📈</Text>
            </GoToPageButton>
            <NewThoughtButton
              onClick={() => {
                navigate("/");
                onCreateThought();
              }}
            />
            <GoToPageButton onClick={() => navigate("/customizeTags")}>
              <Text style={styles.footerText}>🚧</Text>
            </GoToPageButton>
          </View>
        </View>
      )}
    </>
  );
};

export default Footer;
