import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerStyle: {
    height: 56,
    borderRadius: 28,
    backgroundColor: '#e2402b',
    marginTop: 8,
    marginBottom: 8
  },
  shadowStyle: {
    shadowColor: '#770000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 16
  },
  textStyle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    color: "#FFFFFF"
  },
  imageStyle: {
    position: 'absolute',
    left: 28
  }
});

export default styles;
