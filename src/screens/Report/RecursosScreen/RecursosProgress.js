import React, { useState } from "react";

import { View, Text } from "react-native";

export const RecursosProgress = (props) => {
  const data = 70;
  const { cantidad, titulo, unidad, porcentaje } = props;
  // Example: 20% progress
  console.log(data);

  const getColor = (porcentaje) => {
    if (porcentaje < 25) {
      return "green";
    } else if (porcentaje < 50) {
      return "limegreen";
    } else if (porcentaje < 75) {
      return "orange";
    } else if (porcentaje < 100) {
      return "red";
    } else {
      return "red";
    }
  };

  const barWidth = `${porcentaje}%`; // Calculate the width as a percentage string

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
          backgroundColor: getColor(porcentaje),
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
