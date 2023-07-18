import React, { useState } from "react";

import { View } from "react-native";

export const CircularProgress = () => {
  const [data, setData] = useState(
    10 // Example: 20% progress
  );

  const getColor = (percentage) => {
    if (percentage < 25) {
      return "yellow";
    } else if (percentage < 50) {
      return "orange";
    } else if (percentage < 75) {
      return "limegreen";
    } else if (percentage < 100) {
      return "green";
    } else {
      return "blue";
    }
  };

  const percentage = data;

  const barWidth = `${data}%`; // Calculate the width as a percentage string

  return (
    <View style={{ flexDirection: "row", height: 10 }}>
      <View
        style={{
          backgroundColor: getColor(percentage),
          width: barWidth,
          borderRadius: 5,
        }}
      />
    </View>
  );
};
