import React from "react";
import { ScrollView, View, Text } from "react-native";
import { VictoryPie, VictoryLabel } from "victory-native";
import Svg from "react-native-svg";

export const PietipoIncidente = () => {
  const colorScale = ["#FF0000", "#00FF00", "#0000FF", "skyblue"];

  return (
    <View>
      <Svg width={400} height={400}>
        <VictoryPie
          standalone={false}
          width={400}
          height={400}
          data={[
            { x: 1, y: 120 },
            { x: 2, y: 150 },
            { x: 3, y: 75 },
            { x: 4, y: 175 },
          ]}
          innerRadius={80}
          labelRadius={100}
          style={{ labels: { fontSize: 20, fill: "white" } }}
          colorScale={colorScale} // Set the color scale
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 20 }}
          x={200}
          y={200}
          text="Pie!"
        />
      </Svg>
    </View>
  );
};
