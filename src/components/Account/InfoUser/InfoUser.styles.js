import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 5,
  },
  avatar: {
    marginRight: 20,
    backgroundColor: "green",
  },
  displayName: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
  detalles: {
    flexDirection: "row", // Set direction to row for horizontal layout
    // justifyContent: "space-between", // Optional: adjust spacing between items
    // alignItems: "center", // Optional: adjust vertical alignment of items
    // alignContent: "center",
    // justifyContent: "left",
    // marginLeft: 15,
    // paddingRight: 40,
  },
  icon: {
    color: "grey",
    marginLeft: 10,
    fontSize: 17,
  },
  roundImageUpload: {
    width: 50,
    height: 50,
    zIndex: 122,
    // borderRadius: 50, // half of width and height
  },
  roundImageUpload2: {
    width: 30,
    height: 30,
    zIndex: 122,
    // borderRadius: 50, // half of width and height
  },
  bellNomber: {
    // backgroundColor: "white",

    fontSize: 15,
    margin: -20,
    // marginLeft: 500,
    marginTop: -45,
    // marginRight: 20,

    borderRadius: 11,
    // position: "absolute",
    // zIndex: 1000,
    // padding: 0,
    paddingHorizontal: 5,
    // paddingLeft: 7,
    textAlign: "center",
    borderWidth: 2,
    borderColor: "red",
  },
});
