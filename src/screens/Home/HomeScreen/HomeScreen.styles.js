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
  roundImage5: { width: 80, height: 80, borderRadius: 40, margin: 10 },
  textImage: { alignItems: "center" },

  postPhoto: { height: 250, width: width, marginTop: 0 },
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
});
