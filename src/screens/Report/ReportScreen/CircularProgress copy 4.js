import React, { useState, useEffect } from "react";
import {
  VictoryChart,
  VictoryBar,
  VictoryLabel,
  VictoryAnimation,
  VictoryGroup,
} from "victory-native";
import Svg from "react-native-svg";
import { View, Image } from "react-native";

export const CircularProgress = () => {
  const [data, setData] = useState([
    { x: 1, y: 20 }, // Example: 20% progress
  ]);

  const getColor = (percentage) => {
    if (percentage < 25) {
      return "red";
    } else if (percentage < 50) {
      return "orange";
    } else if (percentage < 75) {
      return "gold";
    } else {
      return "green";
    }
  };

  const percentage = data[0].y;

  const barWidth = `${50}%`; // Calculate the width as a percentage string

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
