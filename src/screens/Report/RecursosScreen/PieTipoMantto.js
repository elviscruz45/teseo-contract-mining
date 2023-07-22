import React from "react";
import { ScrollView, View, Text } from "react-native";
import { VictoryPie, VictoryLabel, VictoryLegend } from "victory-native";
import Svg from "react-native-svg";

export const PietipoMantto = () => {
  const colorScale = ["red", "#00FF00", "#0000FF", "skyblue"];

  return (
    <View>
      <Svg width={400} height={400}>
        <VictoryPie
          standalone={false}
          width={300}
          height={300}
          data={[
            { x: 1, y: 120 },
            { x: 2, y: 150 },
          ]}
          innerRadius={70}
          labelRadius={80}
          style={{ labels: { fontSize: 15, fill: "white" } }}
          colorScale={colorScale} // Set the color scale
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 20 }}
          x={150}
          y={150}
          text="Pie!"
        />
        <VictoryLegend
          x={320}
          y={350}
          orientation="horizontal"
          gutter={20}
          colorScale={colorScale}
          data={[{ name: "Item 1" }, { name: "Item 2" }]}
        />
      </Svg>
    </View>
  );
};
