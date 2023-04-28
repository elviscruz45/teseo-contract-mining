import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const { width } = Dimensions.get("window");

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
    borderBottomColor: "#E35622",
    margin: 2,
  },
  row: {
    flexDirection: "row",
  },
  center: {
    alignItems: "center",
    justifyContent: "space-between",
    margin: 0,
  },
  roundImage: { width: 40, height: 40, borderRadius: 20, margin: 5 },
  postPhoto: { height: 250, width: width, marginTop: 0 },
});
