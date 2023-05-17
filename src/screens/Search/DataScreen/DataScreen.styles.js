import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  radioCard: {
    margin: 3,
    // fontFamily: "DM Sans",
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "flex-start",
    padding: 5,
    paddingLeft: 8,
    paddingRight: 8,
    // gap: 2,
    width: windowWidth,
    backgroundColor: "#FFFFFF",
    shadowColor: "#384967",
    // shadowOffset: {
    //   width: 4,
    //   height: 4,
    // },
    // shadowOpacity: 0.05,
    borderRadius: 16,
    // flex: 0,
    // order: 2,
    // alignSelf: "stretch",
    // flexGrow: 0,
  },
  containerTypes1: {
    flexDirection: "row", // Set direction to row for horizontal layout
    // justifyContent: "space-between", // Optional: adjust spacing between items
    alignItems: "center", // Optional: adjust vertical alignment of items
    // justifyContent: 'center',
    justifyContent: "space-between", // Optional: adjust spacing between items
  },
  containerTypes: {
    flexDirection: "row", // Set direction to row for horizontal layout
    justifyContent: "space-between", // Optional: adjust spacing between items
    paddingRight: 10,
    margin: 5,
    // alignItems: "center", // Optional: adjust vertical alignment of items
  },
  containerText: {
    marginRight: 10,
  },
  detalles: {
    // flexDirection: "row", // Set direction to row for horizontal layout
    // justifyContent: "space-between", // Optional: adjust spacing between items
    // alignItems: "center", // Optional: adjust vertical alignment of items
    // alignContent: "center",
    // justifyContent: "left",
    marginLeft: 15,
  },
  btnContainer1: {
    position: "absolute",
    bottom: 80,
    right: 10,
  },
  btnContainer2: {
    // position: "absolute",
    // bottom: 10,
    // right: 10,
    size: 12,
    alignContent: "space-between",
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
    width: windowWidth,
    height: 280,
    // marginRight: 15,
    // marginTop: 0,
  },
  name: {
    fontWeight: "bold",
  },
  info: {
    color: "#828282",
    paddingRight: 100,
    marginTop: 3,
  },
  titleText: {
    fontSize: 24,
    fontFamily: "Arial",
    color: "#FA4A0C",
    fontWeight: "bold",
  },
  tagText: {
    fontFamily: "Arial",
    fontSize: 12,
  },
  dataText: {
    fontSize: 17,
    fontFamily: "Arial",
    color: "#FA4A0C",
  },
});
