import React, { useState } from "react";

import { View, Text, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width - 30;

export const BarInactiveServices = (props) => {
  const { data, titulo, unidad } = props;

  let inactiveCantidad = 0;
  let barWidth;
  if (data?.length > 0) {
    const TotalServices = data.length;

    for (let i = 0; i < TotalServices; i++) {
      if (data[i]["AvanceAdministrativoTexto"] === titulo) {
        inactiveCantidad++;
      }
    }
    barWidth = (inactiveCantidad * windowWidth) / data.length;
  }

  return (
    <View
      style={{
        paddingHorizontal: 15,
      }}
    >
      <View>
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
        }}
      />
      <Text></Text>
    </View>
  );
};
