import React, { useState } from "react";

import { View, Text } from "react-native";

export const RecursosProgress = (props) => {
  const data = 70;
  const { cantidad, titulo, unidad } = props;
  // Example: 20% progress
  console.log(data);

  const getColor = (percentage) => {
    if (percentage < 25) {
      return "red";
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

  const percentage = cantidad;

  const barWidth = `${cantidad}%`; // Calculate the width as a percentage string

  return (
    <View
      style={{
        // flexDirection: "row",
        // alignItems: "center", // Align items vertically at the center

        // height: 30,
        // marginRight: 90,
        paddingHorizontal: 15,
      }}
    >
      <View
      // style={{
      //   flexDirection: "row",
      //   height: 30,
      //   marginRight: 90,
      //   paddingHorizontal: 10,
      // }}
      >
        <Text>
          {titulo}: {cantidad} {unidad}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: getColor(percentage),
          width: barWidth,
          height: 10,
          borderRadius: 5,
          // alignSelf: "flex-start", // Align the progress bar to the left
        }}
      />
      <Text></Text>
    </View>
  );
};
