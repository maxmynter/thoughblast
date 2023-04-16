import { Text, StyleSheet } from "react-native";
import headerTextStyles from "../../Styles/headerText";

const styles = StyleSheet.create({ headerText: headerTextStyles });

const Header = ({ text }) => {
  return <Text style={styles.headerText}>{text}</Text>;
};

export default Header;
