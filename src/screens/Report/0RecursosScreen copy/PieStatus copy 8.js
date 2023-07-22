import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { VictoryPie, VictoryLabel } from "victory-native";
import Svg from "react-native-svg";

export const PieChart = () => {
  const datas = [
    { x: "Rep", y: 40 },
    { x: "Fab", y: 20 },
    { x: "Ing", y: 35 },
    { x: "Inst", y: 15 },
  ];
  const [selectedSlice, setSelectedSlice] = useState(null); // Initialize with no slice selected
  console.log(selectedSlice);

  const handleSliceClick = (event, slice) => {
    setSelectedSlice(slice.datum);
  };

  const total = datas.reduce((sum, entry) => sum + entry.y, 0);

  // Create a color scale that highlights the selected slice
  const colorScale = datas.map((data) =>
    data === selectedSlice ? "tomato" : "gray"
  );
  const handleSvgClick = () => {
    setSelectedSlice(null); // Reset selectedSlice when clicking outside the pie
  };
  return (
    <TouchableOpacity onPress={handleSvgClick} activeOpacity={1}>
      <View
        style={{
          alignSelf: "center",
          marginTop: -30,
          // backgroundColor: "blue",
        }}
        onPress={handleSvgClick}
      >
        <Svg
          width={350}
          height={350}
          // onPress={handleSvgClick}
          // style={{ backgroundColor: "red" }}
        >
          <VictoryPie
            standalone={false}
            width={350}
            height={350}
            data={datas}
            innerRadius={60}
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
          {selectedSlice ? (
            <VictoryLabel
              textAnchor="middle"
              verticalAnchor="middle"
              x={175}
              y={175}
              text={`${selectedSlice.x}\n${Math.round(
                (selectedSlice.y / total) * 100
              )}`}
              style={{ fontSize: 30 }}
            />
          ) : (
            <VictoryLabel
              textAnchor="middle"
              verticalAnchor="middle"
              x={175}
              y={175}
              text={`Total\n${total}`}
              style={{ fontSize: 30 }}
            />
          )}
        </Svg>
      </View>
    </TouchableOpacity>
  );
};
