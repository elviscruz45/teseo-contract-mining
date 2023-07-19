import React, { useState, useEffect } from "react";
import { VictoryPie, VictoryLabel, VictoryAnimation } from "victory-native";
import Svg from "react-native-svg";
import { View, Image, Text } from "react-native";
export const CircularProgress = ({ imageSource, imageStyle, avance }) => {
  console.log("typeof", typeof avance);
  const [percent, setPercent] = useState(25);
  // const [data, setData] = useState([
  //   { x: 1, y: percent },
  //   { x: 2, y: 100 - percent },
  // ]);
  const [data, setData] = useState([
    { x: 1, y: parseInt(avance) },
    { x: 2, y: 100 - parseInt(avance) },
  ]);

  return (
    <>
      <Svg
        style={{ position: "absolute", top: -45, left: -50, zIndex: 100 }}
        width="500%"
        height="500%"
      >
        <VictoryPie
          standalone={false}
          // animate={{ duration: 1000 }}
          width={220}
          height={220}
          data={data}
          innerRadius={55}
          // cornerRadius={80}
          labels={() => null}
          style={{
            data: {
              fill: ({ datum }) => {
                const color =
                  datum.y < 20
                    ? "red"
                    : datum.y < 40
                    ? "magenta"
                    : datum.y < 60
                    ? "orange"
                    : datum.y < 80
                    ? "limegreen"
                    : datum.y < 100
                    ? "green"
                    : "blue";
                return datum.x === 1 ? color : "transparent";
              },
            },
          }}
        />
      </Svg>
      <Image
        source={imageSource}
        style={{
          marginLeft: 10,
          // ...imageStyle,
          width: 100,
          height: 100,
          // position: "absolute",
          borderRadius: 80,
          // left: 65, // Set the position along the x-axis (left)
          // top: 65, // Set the position along the y-axis (top)
        }}
      />
    </>
  );
};
