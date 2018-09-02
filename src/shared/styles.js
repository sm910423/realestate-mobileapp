import { StyleSheet } from "react-native";

export const primaryColor = "#1fb35b";
export const accentColor = "#cc3333";
export const blueColor = "#3389ee";

export const sharedStyles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF"
  },
  columnContainer: {
    flexDirection: "column"
  },
  rowContainer: {
    flexDirection: "row"
  },
  centeredContent: {
    alignItems: "center",
    justifyContent: "center"
  },
  flexOne: {
    flex: 1
  },
  titleViewStyle: {
    marginTop: 24
  },
  titleTextStyle: {
    fontFamily: "Cochin-Bold",
    fontSize: 24,
    fontWeight: "bold",
    color: "#1fb35b"
  },
  roundedCorners: {
    borderRadius: 5
  },
  paperContainer: {
    flex: 1,
    marginTop: 16,
    padding: 16,
    backgroundColor: "transparent",
    elevation: 4
  },
  footerButton: {
    marginLeft: 8,
    width: 60,
    height: 16
  },
  title: {
    fontSize: 18,
    fontWeight: "bold"
  },
  fabStyle: {
    position: "absolute",
    bottom: 48,
    right: 48
  },
  toolbarTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18
  },
  toolbarStyle: {
    backgroundColor: primaryColor,
    borderWidth: 0
  },
  flatToolbar: {
    elevation: 0
  },
  toolbarButton: {
    backgroundColor: primaryColor
  },
  divider: {
    marginLeft: 32,
    backgroundColor: "lightgrey",
    marginRight: 32
  }
});
