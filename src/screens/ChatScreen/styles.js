import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column"
  },
  contactTitle: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center"
  },
  contactImage: {
    margin: 8,
    borderRadius: 50 / 2
  },
  headerContainer: {
    elevation: 4,
    backgroundColor: "white"
  },
  iconMessage: {
    maxWidth: 200,
    padding: 4
  },
  attacthmentText: {
    paddingLeft: 4
  }
});

export default styles;
