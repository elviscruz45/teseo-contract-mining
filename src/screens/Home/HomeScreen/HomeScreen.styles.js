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
  roundImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 0.5,
    margin: 5,
    borderColor: "black",
  },
  roundImage5: { width: 60, height: 60, borderRadius: 30, marginLeft: 20 },
  textImage: { alignItems: "center" },
  Texticons: { alignItems: "center", marginLeft: 20 },

  postPhoto: {
    height: windowWidth * 0.48,
    width: windowWidth * 0.48,
    marginTop: 0,
    borderRadius: 5,
    borderWidth: 1,
  },
  textAreaTitle: {
    width: windowWidth * 0.6,
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 18,
  },
  textAreaComment: {
    width: windowWidth * 0.6,
    marginLeft: 10,
    fontSize: 14,
  },
  NombreServicio: {
    maxWidth: windowWidth * 0.48,
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

  textAreaCommentplus: {
    width: windowWidth * 0.6,
    marginLeft: 10,
    fontWeight: "300",
  },

  textAreaTitleplus: {
    width: windowWidth * 0.6,
    marginLeft: 10,
    color: "black",
    fontWeight: "600",
  },
  avatar: {
    marginRight: 20,
    backgroundColor: "green",
  },
  likeComment: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: windowWidth * 0.1,
  },
});
