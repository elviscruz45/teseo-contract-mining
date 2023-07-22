import React, { useState } from "react";
import { View } from "react-native";
import { VictoryPie, VictoryLabel } from "victory-native";
import Svg from "react-native-svg";

export const PieChart = () => {
  const datas = [
    { x: "Rep", y: 40 },
    { x: "Fab", y: 20 },
    { x: "Ing", y: 35 },
    { x: "Inst", y: 15 },
  ];
  const [selectedSlice, setSelectedSlice] = useState(datas);
  console.log("selectedSlice---------", selectedSlice);

  const handleSliceClick = (event, slice) => {
    setSelectedSlice(slice);
  };

  const total = datas.reduce((sum, entry) => sum + entry.y, 0);
  console.log("total---------", total);

  return (
    <View>
      <Svg width={300} height={300}>
        <VictoryPie
          standalone={false}
          width={300}
          height={300}
          data={datas}
          innerRadius={50}
          labelRadius={80}
          colorScale={["tomato", "orange", "gold", "cyan"]}
          events={[
            {
              target: "data",
              eventHandlers: {
                onPressIn: (event, slice) => {
                  return [
                    {
                      target: "data",
                      mutation: (props) => handleSliceClick(event, slice),
                    },
                  ];
                },
              },
            },
          ]}
        />
        {selectedSlice && (
          <VictoryLabel
            textAnchor="middle"
            verticalAnchor="middle"
            x={150}
            y={150}
            text={`${selectedSlice.x}\n${Math.round(
              (selectedSlice.y / total) * 100
            )}%`}
            style={{ fontSize: 30 }}
          />
        )}
      </Svg>
    </View>
  );
};
