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
  row: {
    flexDirection: "row",
    marginRight: 110,
  },
  center: {
    // alignItems: "center",
    // justifyContent: "space-between",
  },
  info: {
    // color: "#828282",
    // paddingRight: 100,
    // alignItems: "flex-start",
    marginTop: 3,
    // marginLeft: windowWidth / 32,
    fontWeight: "600",
    // textAlignVertical: "top",
    marginHorizontal: windowWidth * 0.02,
  },
  info2: {
    // color: "#828282",
    // paddingRight: 10,
    marginTop: 3,
    fontWeight: "normal",
    // marginHorizontal: windowWidth * 0.28,
    // marginRight: 10,
    // margin: 20,
  },
  btnActualizarStyles: {
    // marginTop: 30,
    // paddingVertical: 10,
    // marginLeft: 100,
    borderRadius: 20,
    backgroundColor: "black",
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
    width: "13.5%",
    height: 55,
    borderRadius: 10,
  },
  image3: {
    width: "100%",
    height: 55,
    borderRadius: 10,
    marginTop: 10,
  },
  image4: {
    width: 25,
    alignSelf: "center",
    height: 25,
    borderRadius: 10,
    marginTop: 10,
  },
  image5: {
    width: 25,
    alignSelf: "center",
    height: 25,
    borderRadius: 10,
    marginTop: 10,
  },
  equipments2: {
    flexDirection: "row",
    marginHorizontal: 5,
  },
  name2: {
    fontWeight: "bold",
  },
  info2: {
    color: "#828282",
    // width:10,
    paddingRight: 100,

    marginTop: 3,
  },
  attachedElement: {
    position: "absolute", // Add position: "absolute" to position the component
    right: 20, //
  },
  article: {
    margin: 10,
  },
});
