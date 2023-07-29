import React, { useState } from "react";

import { View, Text, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width - 30;

export const BarInactiveServices = (props) => {
  const { data, titulo, unidad } = props;

  let inactiveCantidad = 0;
  let barWidth;
  if (data) {
    const TotalServices = data.length;

    for (let i = 0; i < TotalServices; i++) {
      if (data[i]["AvanceAdministrativoTexto"] === titulo) {
        inactiveCantidad++;
      }
    }
    barWidth = (inactiveCantidad * windowWidth) / data.length; // Calculate the width as a percentage string
  }

  console.log(inactiveCantidad);

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
          {titulo}: {inactiveCantidad} {unidad}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "red",
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
