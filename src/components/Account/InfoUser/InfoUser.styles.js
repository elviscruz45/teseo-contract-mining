import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    marginLeft: 5,
    paddingHorizontal: 25,
    // justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 5,
    width: "55%",
  },
  avatar: {
    marginRight: 20,
    borderWidth: 0.5,
  },
  displayName: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
  detalles: {
    flexDirection: "row",
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
