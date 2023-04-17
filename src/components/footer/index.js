import { View, StyleSheet, Text } from "react-native";
import { useNavigate, useLocation } from "react-router-dom";
import NewThoughtButton from "./NewThoughtButton";
import { theme } from "../../Styles/theme";
import GoToPageButton from "./GoToPageButton";
import footerText from "../../Styles/footerText";
import { useDispatch } from "react-redux";
const styles = StyleSheet.create({
  footerBackgroundView: {
    backgroundColor: theme.colors.uiBlack,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 16,
    paddingBottom: 2 * theme.containers.margin,
    paddingTop: theme.containers.margin,
    height: theme.containers.footerHeight,
  },
  buttonsContainerView: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    flexDirection: "row",
    paddingLeft: 8,
    paddingRight: 8,
  },
  footerText: { ...footerText },
});

const Footer = ({ display, onCreateThought }) => {
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
              <Text style={styles.footerText}>📌</Text>
            </GoToPageButton>
            <NewThoughtButton
              isOnPage={location.pathname === "/"}
              onClick={() => {
                navigate("/");
                onCreateThought();
              }}
            />
            <GoToPageButton
              isOnPage={location.pathname === "/customizeTags"}
              leftBorder={true}
              onClick={() => navigate("/customizeTags")}
            >
              <Text style={styles.footerText}>🏷️</Text>
            </GoToPageButton>
          </View>
        </View>
      )}
    </>
  );
};

export default Footer;
