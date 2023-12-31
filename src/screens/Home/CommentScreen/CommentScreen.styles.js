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
  },
  center: {
    // alignItems: "center",
    justifyContent: "space-between",
    marginRight: 5,
  },
  row2: {
    flexDirection: "row",
  },
  center2: {
    // alignItems: "center",
    justifyContent: "space-between",
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
  roundImage: { width: 40, height: 40, borderRadius: 20, margin: 5 },
  roundImage5: { width: 60, height: 60, borderRadius: 30, marginLeft: 20 },
  textImage: { alignItems: "center" },
  Texticons: { alignItems: "center", marginLeft: 20 },

  postPhoto: {
    height: windowWidth * 0.6,
    width: windowWidth * 1,
    marginTop: 0,
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
    width: windowWidth * 0.6,
    height: windowWidth * 0.2,
    // padding: 0,
    marginLeft: 10,
  },
  textAreaCommentplus: {
    width: windowWidth * 0.6,
    // height: windowWidth * 0.3,
    // padding: 0,
    // color: "#DB4545",
    marginLeft: 10,
  },
  textAreaTitle: {
    width: windowWidth * 0.6,
    marginLeft: 10,
    fontWeight: "bold",
  },
  textAreaTitleplus: {
    width: windowWidth * 0.6,
    marginLeft: 10,
    fontWeight: "bold",
    color: "#DB4545",
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal: 5,
    marginRight: 5,
    // borderTopWidth: 1,
    // borderTopColor: "lightgray",
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
  },
});
