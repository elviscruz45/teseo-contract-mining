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
  rowlikes: {
    flexDirection: "row",
    margin: 10,
  },
  center: {
    alignItems: "center",
    justifyContent: "space-between",
    margin: 0,
  },
  roundImage: { width: 40, height: 40, borderRadius: 20, margin: 5 },
  roundImage5: { width: 60, height: 60 },
  textImage: {
    width: 100,
    alignItems: "center",
    // marginRight: 0,
    // marginTop: 3,
  },
  Texticons: {
    // alignItems: "center",
    marginLeft: 20,
    marginRight: 0,
    textAlign: "center",
  },

  postPhoto: {
    height: windowWidth * 0.45,
    width: windowWidth * 0.35,
    marginTop: 0,
    borderRadius: 15,
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
  avatar: {
    marginRight: 20,
    backgroundColor: "green",
  },
});
