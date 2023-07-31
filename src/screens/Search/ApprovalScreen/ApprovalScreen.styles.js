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
    // height: 280,
    // marginRight: 15,
    // marginTop: 0,
  },
  name: {
    fontWeight: "bold",
    textAlign: "center",

    // marginLeft: windowWidth / 2,
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
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    // justifyContent: "center",
    alignItems: "center",
    // opacity: 0.4,
  },
  container: {
    flex: 1, // Use flex: 1 to make the container fill the entire screen
  },
  image: {
    width: "45%",
    height: "45%",

    marginLeft: windowWidth / 4,

    // height: 55,
  },
  item: {
    // flexDirection: "row",
    margin: 10,
  },
  image2: {
    width: "15%",
    height: 55,
    borderRadius: 10,
    marginBottom: 15,

    marginEnd: 3,
  },
  equipments2: {
    flexDirection: "row",
    marginHorizontal: 5,
  },
  name2: {
    fontWeight: "bold",
  },
  info: {
    // color: "#828282",
    // paddingRight: 100,
    marginTop: 3,
    // marginLeft: windowWidth / 32,
    fontWeight: "600",
    marginHorizontal: windowWidth * 0.02,
  },
  info2: {
    // color: "#828282",
    // paddingRight: 10,
    marginTop: 3,
    fontWeight: "normal",
    // marginHorizontal: windowWidth * 0.28,
    marginRight: 10,
  },
  info3: {
    // color: "#828282",
    paddingLeft: 15,
    marginTop: 3,
    fontWeight: "normal",
  },
  row: {
    flexDirection: "row",
  },
  center: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  roundImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    // alignItems: "center",
    marginLeft: windowWidth / 2 - 50,
  },

  buttonFollow: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    elevation: 1,
    backgroundColor: "red",
  },
  buttonUnfollow: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    elevation: 1,
    backgroundColor: "black",
  },
  textFollow: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  btnActualizarStyles: {
    // marginTop: 30,
    // paddingVertical: 10,
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
  btnContainer2: {
    position: "absolute",
    bottom: windowHeight * 0.1,
    right: 10,
  },
  btnContainer3: {
    position: "absolute",
    bottom: windowHeight * 0.01,
    right: 10,
  },
  attachedElement: {
    position: "absolute", // Add position: "absolute" to position the component
    right: 20, //
  },
});
