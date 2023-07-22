import React, { useState } from "react";
import { View } from "react-native";
import { VictoryPie, VictoryLabel, VictoryAnimation } from "victory-native";
import Svg from "react-native-svg";

export const PieChart = () => {
  console.log("piechart");

  const [selectedSlice, setSelectedSlice] = useState(null);

  const data = [
    { x: "Rep", y: 40 },
    { x: "Fab", y: 20 },
    { x: "Ing", y: 35 },
    { x: "Inst", y: 15 },
  ];

  return (
    <View>
      <Svg width={300} height={300}>
        <VictoryPie
          standalone={false}
          // animate={{ duration: 1000 }}
          width={300}
          height={300}
          data={data}
          innerRadius={50}
          labelRadius={80}
          colorScale={["tomato", "orange", "gold", "cyan"]}
        />
        <VictoryAnimation duration={1000} data={data}>
          {(newProps) => {
            const total = data.reduce((sum, entry) => sum + entry.y, 0);
            const percent = ((newProps.y || 0) / total) * 100;
            return (
              <VictoryLabel
                textAnchor="middle"
                verticalAnchor="middle"
                x={150}
                y={150}
                text={`${Math.round(percent)}%`}
                style={{ fontSize: 30 }}
              />
            );
          }}
        </VictoryAnimation>
      </Svg>
    </View>
  );
};
