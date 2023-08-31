import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  chartContainer: {
    width: 200, // Adjust the width as needed
    height: 220, // Adjust the height as needed
    margin: 0,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontWeight: "300",
  },
  roundImageUpload: {
    width: 40,
    height: 40,
    alignSelf: "center",

    // borderRadius: 50, // half of width and height
  },
  roundImageUploadmas: {
    width: 30,
    height: 30,
    margin: 5,
  },
  company: {
    paddingHorizontal: 15,
    fontWeight: "900",
    textAlign: "center",
  },
  container22: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  titleText: {
    paddingHorizontal: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  iconMinMax: {
    paddingHorizontal: 15,
    fontWeight: "600",
    alignSelf: "flex-end",
    flexDirection: "row",
    zIndex: 100,
  },
});
