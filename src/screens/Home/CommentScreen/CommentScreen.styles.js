import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  containerFlatListView1: {
    borderBottomWidth: 2,
    borderBottomColor: "#8CBBF1",
    margin: 2,
  },
  row: {
    flexDirection: "row",
    // alignSelf: "flex-end",
    // backgroundColor: "red",
  },
  row5: {
    flexDirection: "row",
    // alignSelf: "flex-center",
    // backgroundColor: "red",
  },
  center: {
    // alignItems: "center",
    justifyContent: "space-between",
    // marginRight: 5,
  },
  row2: {
    flexDirection: "row",
  },
  center2: {
    // alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 5,
    marginTop: 5,
    fontWeight: "200",
  },
  row3: {
    flexDirection: "row",
  },
  center3: {
    // alignItems: "center",
    justifyContent: "space-between",
    marginRight: 5,
    marginLeft: 50,
    marginTop: 0,
  },
  center4: {
    // alignItems: "center",
    justifyContent: "space-between",
    marginTop: -25,

    marginRight: 5,
    fontWeight: "300",
  },
  rowlikes: {
    flexDirection: "row",
    margin: 10,
  },
  roundImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    // margin: 5,
    alignSelf: "flex-end",
  },
  roundImage10: {
    width: 20,
    height: 20,
    borderRadius: 20,
    // margin: 5,
    alignSelf: "flex-end",
  },
  roundImage5: { width: 60, height: 60, borderRadius: 30, marginLeft: 20 },
  textImage: { alignItems: "center" },
  Texticons: { alignItems: "center", marginLeft: 20 },

  postPhoto: {
    height: windowWidth * 0.98,
    width: windowWidth * 0.98,

    marginTop: 0,
    borderRadius: 10,
    borderWidth: 0.1,
    alignSelf: "center",
  },
  container2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image2: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
  },
  equipments: {
    flexDirection: "row",
    margin: 5,
  },
  textAreaComment: {
    // width: windowWidth * 0.6,
    // height: windowWidth * 0.2,
    // padding: 0,
    marginLeft: 10,
  },
  textAreaCommentplus: {
    width: windowWidth * 0.6,
    // height: windowWidth * 0.3,
    // padding: 0,
    // color: "#DB4545",
    marginLeft: 5,
  },
  textAreaTitle: {
    // width: windowWidth * 0.6,
    marginLeft: 10,
    fontWeight: "600",
  },
  textAreaTitleplus: {
    // width: windowWidth * 0.6,
    marginLeft: 5,
    fontWeight: "600",
    // color: "#DB4545",
  },
  commentContainer: {
    // backgroundColor: "red",
    zIndex: 100,
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal: 5,
    marginRight: 5,
    // backgroundColor: "white",
    // borderTopWidth: 1,
    // borderTopColor: "lightgray",
    marginBottom: 0,
    // borderBottomWidth: 5,
    // borderBottomColor: "#f0f8ff",
    borderColor: "#f0f8ff",
    // borderTopColor: "red",
    borderWidth: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: "white",
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#8CBBF1",
    borderRadius: 20,
    padding: 10,
    zIndex: 1000,
  },
});
