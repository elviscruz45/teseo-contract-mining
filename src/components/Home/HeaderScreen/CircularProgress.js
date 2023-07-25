import React, { useState, useEffect } from "react";
import { VictoryPie, VictoryLabel, VictoryAnimation } from "victory-native";
import Svg from "react-native-svg";
import { View, Image } from "react-native";

export const CircularProgress = ({ imageSource, imageStyle, avance }) => {
  const data = [
    { x: 1, y: parseInt(avance) },
    { x: 2, y: 100 - parseInt(avance) },
  ];

  return (
    <>
      <Svg
        style={{ position: "absolute", top: -50, left: -30, zIndex: 100 }}
        width="200%"
        height="200%"
      >
        <VictoryPie
          standalone={false}
          // animate={{ duration: 1000 }}
          width={180}
          height={180}
          data={data}
          innerRadius={43}
          // cornerRadius={80}
          labels={() => null}
          style={{
            data: {
              fill: ({ datum }) => {
                const color =
                  datum.y < 20
                    ? "limegreen"
                    : datum.y < 40
                    ? "limegreen"
                    : datum.y < 60
                    ? "limegreen"
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
          marginLeft: 20,
          width: 80,
          height: 80,
          borderRadius: 80,
        }}
      />
    </>
  );
};
