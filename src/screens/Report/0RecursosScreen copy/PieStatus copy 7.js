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
  const [selectedSlice, setSelectedSlice] = useState(datas[0]); // Initialize with the first slice
  console.log(selectedSlice);

  const handleSliceClick = (event, slice) => {
    setSelectedSlice(slice.datum);
  };

  const total = datas.reduce((sum, entry) => sum + entry.y, 0);

  // Create a color scale that highlights the selected slice
  const colorScale = datas.map((data) =>
    data === selectedSlice ? "tomato" : "gray"
  );

  return (
    <View
      style={{
        alignSelf: "center",
        marginTop: -30,
      }}
    >
      <Svg width={350} height={350}>
        <VictoryPie
          standalone={false}
          width={350}
          height={350}
          data={datas}
          innerRadius={70}
          labelRadius={80}
          colorScale={["tomato", "orange", "gold", "cyan"]}
          // colorScale={colorScale}
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
            x={175}
            y={175}
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
