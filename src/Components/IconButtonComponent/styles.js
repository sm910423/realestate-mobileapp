import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerStyle: {
    width: 122,
    height: 94,
    paddingTop: 12,
    borderRadius: 8,
    borderWidth: 0.7,
    backgroundColor: '#F7F7F7',
    borderColor: '#777777'
  },
  shadowStyle: {
    shadowColor: '#000077',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 16
  },
  textStyle: {
    flex: 1,
    marginTop: 2,
    textAlign: "center",
    fontSize: 14,
    color: "#000000"
  }
});

export default styles;
