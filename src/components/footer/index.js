import { View, StyleSheet, Text } from "react-native";
import { useNavigate, useLocation } from "react-router-dom";
import NewThoughtButton from "./NewThoughtButton";
import { theme } from "../../Styles/theme";
import GoToPageButton from "./GoToPageButton";
import footerText from "../../Styles/footerText";
import { useDispatch } from "react-redux";
import { toggle_create_thought_true } from "../../redux/actions/newThoughtCreationActions";

const styles = StyleSheet.create({
  footerBackgroundView: {
    backgroundColor: theme.colorPalette[950],
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
  const dispatch = useDispatch();
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
            <NewThoughtButton
              isOnPage={location.pathname === "/"}
              onClick={() => {
                navigate("/");
                dispatch(toggle_create_thought_true());
              }}
            />
            <GoToPageButton
              isOnPage={location.pathname === "/customizeTags"}
              leftBorder={true}
              onClick={() => navigate("/customizeTags")}
            >
              <View style={styles.goToPageButtonContainerView}>
                <Text style={styles.footerText}>🏷️</Text>
                <Text style={styles.goToPageButtonExplainerText}>{"Tags"}</Text>
              </View>
            </GoToPageButton>
          </View>
        </View>
      )}
    </>
  );
};

export default Footer;
