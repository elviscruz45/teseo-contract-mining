import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    // paddingTop: 65,
    backgroundColor: "red",
  },

  opStyle: {
    borderColor: "white",
    borderLeftWidth: 2,
    borderRightWidth: 0,
    marginLeft: 20,
    paddingLeft: 20,
  },
  timeWrapper: {
    // alignItems: "flex-end",
  },
  timeContainerStyle: { minWidth: 52, marginTop: -5, marginRight: 0 },
  timeStyle: {
    textAlign: "right",
    backgroundColor: "#2A3B76",
    color: "white",
    padding: 5,
    borderRadius: 13,
    // zIndex: 100,
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  descriptionContainer: {
    flexDirection: "row",
    paddingRight: 50,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textDescription: {
    marginLeft: 10,
    color: "gray",
  },
  //comes from other place

  container: {
    flex: 1,
  },
  listview: {
    flex: 1,
  },
  sectionHeader: {
    marginBottom: 15,
    backgroundColor: "#007AFF",
    height: 30,
    justifyContent: "center",
  },
  sectionHeaderText: {
    color: "#FFF",
    fontSize: 18,
    alignSelf: "center",
  },
  rowContainer: {
    flexDirection: "row",
    flex: 1,
    // justifyContent: "center",
  },
  timeContainer: {
    minWidth: 45,
  },
  time: {
    textAlign: "right",
    color: "black",
    overflow: "hidden",
  },
  circle: {
    // width: 16,
    // height: 16,
    // borderRadius: 10,
    marginLeft: 57,
    marginTop: 10,
    zIndex: 1,
    position: "absolute",
    // alignItems: "flex-start",
    // justifyContent: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "space-between",
    // margin: 0,
  },

  details: {
    borderLeftWidth: 2,
    marginRight: 30,
    marginLeft: 65,
    marginTop: 0,
    marginBottom: 0,
    // flexDirection: "column",
    // flex: 1,
  },

  titledetails: {
    width: windowWidth * 0.75,
    marginLeft: 5,
    marginRight: 35,
    marginBottom: 10,
    // alignSelf: "center",
    fontWeight: "bold",
  },
  description: {
    marginTop: 10,
  },
  separator: {
    height: 1,
    // backgroundColor: "red",
    marginTop: 10,
    marginBottom: 10,
  },
  avanceNombre: {
    fontWeight: "600",
    color: "grey",
  },
  rowavanceNombre: {
    flexDirection: "row",
    marginTop: 0,
    marginLeft: 5,
    // alignSelf: "flex-end",
  },
  detail: {
    marginLeft: 5,
    marginRight: 35,
    alignItems: "flex-start",
    color: "grey",
  },
  textdetail: {
    width: windowWidth * 0.65,

    marginLeft: 5,
    marginRight: 35,
    textAlign: "left",
    // alignItems: "flex-start",
  },
});
