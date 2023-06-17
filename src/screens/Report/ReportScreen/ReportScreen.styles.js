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
});
