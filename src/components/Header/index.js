import { Text, View, StyleSheet } from "react-native";
import headerTextStyles from "../../Styles/headerText";

const styles = StyleSheet.create({ headerText: headerTextStyles });

const Header = ({ text }) => {
  return (
    <View style={{ paddingBottom: 4 }}>
      <Text style={styles.headerText}>{text}</Text>
    </View>
  );
};

export default Header;
