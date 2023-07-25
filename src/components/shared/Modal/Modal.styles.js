import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    height: "auto",
    width: "80%",

    backgroundColor: "#fff",
    position: "fixed",
    top: -100,
    left: 0,
    right: 0,
    zIndex: 9999,
    bottom: -100,
  },
});
