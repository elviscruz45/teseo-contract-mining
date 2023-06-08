import { StyleSheet } from "react-native";
// const backgroundImage = require("../../assets/cerro3.jpeg"); // import the background image

export const styles = StyleSheet.create({
  globalStylesTab: {
    // backgroundColor: "#F7F8FC",
    backgroundColor: "white",
  },
  globalStylesStack: {
    backgroundColor: "#F7F8FC",
    // flex: 1,
    // backgroundColor: "transparent",
    // backgroundImage: `url(${backgroundImage})`,
    // resizeMode: "cover",
  },
  content: {
    flex: 1,
  },
  btnContainer1: {
    position: "absolute",
    bottom: 80,
    right: 10,
  },
  btnContainer2: {
    position: "absolute",
    bottom: 10,
    right: 10,
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
    width: 80,
    height: 80,
    marginRight: 15,
  },
  name: {
    fontWeight: "bold",
  },
  info: {
    color: "#828282",
    paddingRight: 100,
    marginTop: 3,
  },
  backgroundImage: {
    flex: 1, // Make the background image take up the entire screen
    resizeMode: "cover", // Cover the entire screen with the image
  },
});
