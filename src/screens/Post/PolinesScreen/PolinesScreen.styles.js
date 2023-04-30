import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  btnContainer1: {
    position: "absolute",
    bottom: 80,
    right: 10,
  },
  btnContainer2: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  btnEditDelete: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "flex-end",
  },
  restaurant: {
    flexDirection: "row",
    margin: 10,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 15,
  },
  name: {
    fontWeight: "bold",
  },
  info: {
    color: "#828282",
    paddingRight: 100,
    marginTop: 3,
  },
  radioCard: {
    margin: 3,
    // fontFamily: "DM Sans",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 5,
    paddingLeft: 8,
    paddingRight: 8,
    gap: 2,
    width: windowWidth - 8,
    backgroundColor: "#FFFFFF",
    shadowColor: "#384967",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.05,
    borderRadius: 16,
    flex: 0,
    order: 2,
    alignSelf: "stretch",
    flexGrow: 0,
  },
  backgroundImage: {
    flex: 1,
    // resizeMode: "cover",
    // justifyContent: "center",
    // alignItems: "center",
    // opacity: 0.4,
  },
});
