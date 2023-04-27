import { StyleSheet, View, Text, Pressable } from "react-native";
import { theme } from "../../Styles/theme";

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: theme.colors.uiError,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 16,
    borderRadius: 8,
    minHeight: 16,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 8,
  },
  deleteButtonText: {
    color: theme.colorPalette[50],
    fontWeight: "bold",
  },
});

const DeleteThoughtButton = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </View>
    </Pressable>
  );
};

export default DeleteThoughtButton;
