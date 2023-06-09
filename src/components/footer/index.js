import { View, StyleSheet, Text } from "react-native";
import { useNavigate, useLocation } from "react-router-dom";
import { theme } from "../../Styles/theme";
import GoToPageButton from "./GoToPageButton";
import footerText from "../../Styles/footerText";

const styles = StyleSheet.create({
  footerBackgroundView: {
    backgroundColor: theme.colorPalette[950],
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 2 * theme.containers.margin,
    paddingTop: theme.containers.margin,
    height: theme.containers.footerHeight,
  },
  buttonsContainerView: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "baseline",
    flexDirection: "row",
    paddingLeft: 8,
    paddingRight: 8,
    width: "100%",
  },
  footerText: { ...footerText },
  goToPageButtonContainerView: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  goToPageButtonExplainerText: {
    color: theme.colorPalette[50],
    fontWeight: "bold",
    fontSize: 11,
  },
});

const Footer = ({ display }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      {display && (
        <View style={styles.footerBackgroundView}>
          <View style={styles.buttonsContainerView}>
            <GoToPageButton
              isOnPage={location.pathname === "/hotThoughts"}
              rightBorder={true}
              onClick={() => navigate("/hotThoughts")}
            >
              <View style={styles.goToPageButtonContainerView}>
                <Text style={styles.footerText}>📌</Text>
                <Text style={styles.goToPageButtonExplainerText}>{"Pins"}</Text>
              </View>
            </GoToPageButton>
            <GoToPageButton
              isOnPage={location.pathname === "/"}
              onClick={() => navigate("/")}
            >
              <View style={styles.goToPageButtonContainerView}>
                <Text style={styles.footerText}>💭</Text>
                <Text style={styles.goToPageButtonExplainerText}>
                  {"Thoughts"}
                </Text>
              </View>
            </GoToPageButton>
          </View>
        </View>
      )}
    </>
  );
};

export default Footer;
