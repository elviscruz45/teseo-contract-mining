import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  btncerrarStyles: {
    marginTop: 30,
    paddingVertical: 10,
    borderRadius: 0,
    backgroundColor: "#F9CEDE",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
  },
  btnActualizarStyles: {
    marginTop: 30,
    paddingVertical: 10,
    borderRadius: 0,
    backgroundColor: "#8CBBF1",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
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
    bottom: 10,
    right: 10,
  },
  image2: {
    width: "15%",
    height: 55,
    borderRadius: 10,
    marginBottom: 15,
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
    paddingRight: 100,
    marginTop: 3,
  },
  attachedElement: {
    position: "absolute", // Add position: "absolute" to position the component
    right: 20, //
  },
});
