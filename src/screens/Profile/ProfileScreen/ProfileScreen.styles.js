import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  btncerrarStyles: {
    // marginTop: 5,
    // marginBottom: 10,
    // paddingVertical: 10,
    // marginHorizontal: 150,
    borderRadius: 20,
    backgroundColor: "red",
    // borderTopWidth: 1,
    // borderTopColor: "#e3e3e3",
    // borderBottomWidth: 1,
    // borderBottomColor: "#e3e3e3",
    // marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  roundImageUpload: {
    width: 50,
    height: 50,
    zIndex: 122,
    // borderRadius: 50, // half of width and height
  },
  btnContainer4: {
    zIndex: 100,
    // width: 1,
    // height: 1,
    position: "absolute",
    marginTop: 10,
    // right: 10,
    // paddingHorizontal: 90,
    marginLeft: windowWidth - 100,
    paddingHorizontal: 20,
  },
  btnActualizarStyles: {
    // marginTop: 30,
    // paddingVertical: 10,
    // marginLeft: 100,
    borderRadius: 20,
    backgroundColor: "#2A3B76",
    marginHorizontal: windowWidth / 5,

    // borderTopWidth: 1,
    // borderTopColor: "#e3e3e3",
    // borderBottomWidth: 1,
    // borderBottomColor: "#e3e3e3",
  },
  btnTextStyle: {
    color: "#ffff",
    fontWeight: "bold",
  },
  detalles: {
    // flexDirection: "row", // Set direction to row for horizontal layout
    // justifyContent: "space-between", // Optional: adjust spacing between items
    // alignItems: "center", // Optional: adjust vertical alignment of items
    // alignContent: "center",
    // justifyContent: "left",
    // marginLeft: 15,
    // paddingRight: 40,
  },
  btnContainer2: {
    position: "absolute",
    bottom: windowHeight * 0.01,
    right: 10,
    zIndex: 9999, // Set a higher value
  },
  image2: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
  },
  equipments2: {
    flexDirection: "row",
    marginHorizontal: 5,
    marginVertical: 5,
  },
  name2: {
    fontWeight: "bold",
  },
  info2: {
    color: "#828282",
    paddingRight: 100,
    marginTop: 3,
  },
  attachedElement: {
    position: "absolute", // Add position: "absolute" to position the component
    right: 20, //
  },
  bellNomber: {
    backgroundColor: "white",

    fontSize: 15,
    marginLeft: 382,
    marginTop: 10,

    borderRadius: 11,
    position: "absolute",
    zIndex: 22220,
    padding: 0,
    paddingHorizontal: 5,
    borderWidth: 2,
    borderColor: "red",
  },
});
