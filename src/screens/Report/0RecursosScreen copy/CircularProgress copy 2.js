import React, { useState, useEffect } from "react";
import { VictoryPie, VictoryLabel, VictoryAnimation } from "victory-native";
import Svg from "react-native-svg";
import { View, Image } from "react-native";

export const CircularProgress = () => {
  const [data, setData] = useState([
    { x: 1, y: 70 },
    { x: 2, y: 30 },
  ]);

  return (
    <>
      <Svg width="100%" height="80%">
        <VictoryPie
          standalone={false}
          width={200}
          height={200}
          data={data}
          innerRadius={60}
          labels={() => null}
          style={{
            data: {
              fill: ({ datum }) => {
                const color =
                  datum.y < 25
                    ? "red"
                    : datum.y < 50
                    ? "orange"
                    : datum.y < 75
                    ? "gold"
                    : "green";
                return datum.x === 1 ? color : "transparent";
              },
            },
          }}
        />
      </Svg>
      <Image
        source={require("../../../../assets/equipmentplant/ImageIcons/c2cr001.jpeg")}
        style={{
          width: 70,
          height: 70,
          position: "absolute",
          borderRadius: 80,
          left: 65, // Set the position along the x-axis (left)
          top: 65, // Set the position along the y-axis (top)
        }}
      />
    </>
  );
};
