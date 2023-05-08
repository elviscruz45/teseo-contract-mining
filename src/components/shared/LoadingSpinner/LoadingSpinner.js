import React from "react";
import { View, ActivityIndicator } from "react-native";

export const LoadingSpinner = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" color="#E35622" />
    </View>
  );
};
