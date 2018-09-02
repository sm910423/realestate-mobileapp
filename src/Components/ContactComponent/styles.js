import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 32
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  presenceIndicator: {
    position: "absolute",
    bottom: 1,
    right: 1,
    width: 12,
    height: 12,
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 1,
    borderStyle: "solid"
  },
  presenceOnline: {
    backgroundColor: "lightgreen"
  },
  presenceOffline: {
    backgroundColor: "lightgrey"
  }
});

export default styles;
