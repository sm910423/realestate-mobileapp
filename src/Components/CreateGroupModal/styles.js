import { StyleSheet, Dimensions } from "react-native";
var { height, width } = Dimensions.get("window");
const styles = StyleSheet.create({
  contactsContainer: {
    backgroundColor: "white"
  },
  errorMessage: {
    color: "red",
    fontSize: 13
  },
  textInputView: {
    marginBottom: 20,
    width: width * 0.7,
    marginLeft: "auto",
    marginRight: "auto"
  }
});

export default styles;
