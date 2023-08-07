import React, { useState } from "react";

import { View, Text } from "react-native";

export const RecursosProgress = (props) => {
  const data = 70;
  const { cantidad, titulo, unidad, porcentaje, total } = props;
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

  const barWidth = `${porcentaje * 100}%`; // Calculate the width as a percentage string

  return (
    <>
      <Text
        style={{
          marginLeft: 15,
          borderRadius: 5,
          fontWeight: "700",
        }}
      >
        Area: {titulo}
      </Text>
      <View
        style={{
          paddingHorizontal: 15,
        }}
      >
        <View>
          <Text>
            Disponible: {cantidad} {unidad}
          </Text>
          <Text>
            Total: {total} {unidad}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: getColor(porcentaje * 100),
            width: barWidth,
            height: 10,
            borderRadius: 5,
            // alignSelf: "flex-start", // Align the progress bar to the left
          }}
        />
        <Text></Text>
      </View>
    </>
  );
};
