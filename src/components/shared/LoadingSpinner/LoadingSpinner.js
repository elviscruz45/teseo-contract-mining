import React from "react";
import { View, ActivityIndicator } from "react-native";

export const LoadingSpinner = () => {
  return (
    <View
      testID="loading-component"
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <ActivityIndicator
        testID="activity-indicator"
        size="large"
        color="#E35622"
      />
    </View>
  );
};
