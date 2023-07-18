import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  content: {
    marginHorizontal: 10,
  },
  textArea: {
    height: 100,
    width: windowWidth * 0.55,
    height: windowWidth * 0.3,
    padding: 0,
    margin: 0,
  },
  subtitleForm: {
    color: "blue",
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 9,
  },
  equipments: {
    flexDirection: "row",
    margin: 10,
  },
  postPhoto: {
    // height: 700,
    // width: windowWidth,
    height: windowWidth * 0.45,
    width: windowWidth * 0.35,
    marginTop: 0,
  },
});
