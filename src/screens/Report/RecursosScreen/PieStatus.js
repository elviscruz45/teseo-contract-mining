import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { VictoryPie, VictoryLabel } from "victory-native";
import Svg from "react-native-svg";

export const PieChart = (props) => {
  const { data } = props;
  console.log("10.PieChart");

  let datas = [
    { x: "Rep", y: 10 },
    { x: "Fab", y: 10 },
    { x: "Ing", y: 10 },
    { x: "Maq", y: 10 },
    { x: "IngFab", y: 10 },
  ];

  // Function to calculate the sum and quantity of different kinds of "TipoServicio"

  let sumByTipoServicio;
  if (data) {
    sumByTipoServicio = {};
    const totalEntries = data?.length;

    for (let i = 0; i < totalEntries; i++) {
      const tipoServicio = data[i].TipoServicio;
      if (sumByTipoServicio[tipoServicio]) {
        sumByTipoServicio[tipoServicio]++;
      } else {
        sumByTipoServicio[tipoServicio] = 1;
      }
    }
    datas = [
      { x: "Rep", y: sumByTipoServicio["Reparacion"] ?? 0 },
      { x: "Fab", y: sumByTipoServicio["Fabricacion"] ?? 0 },
      { x: "Ing", y: sumByTipoServicio["Ingenieria"] ?? 0 },
      { x: "Maq", y: sumByTipoServicio["Maquinado"] ?? 0 },
      { x: "IngFab", y: sumByTipoServicio["IngFab"] ?? 0 },
    ];
  }

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
            colorScale={["limegreen", "orange", "gold", "cyan", "skyblue"]}
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
              text={`${selectedSlice.x}\n${selectedSlice.y}`}
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
