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
    { x: 1, y: 100 }, // Example: 70% progress
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
  const barWidth = 6; // Calculate the width as a percentage string

  return (
    <VictoryGroup horizontal offset={5}>
      <VictoryBar
        data={[{ x: 1, y: percentage }]}
        cornerRadius={5}
        style={{ data: { fill: "blue" } }} // Set the color of the bar
        labels={() => null}
      />
    </VictoryGroup>
  );
};
