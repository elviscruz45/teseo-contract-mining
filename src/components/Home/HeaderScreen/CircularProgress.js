import React, { useState } from "react";
import { VictoryPie, VictoryLabel, VictoryAnimation } from "victory-native";
import Svg from "react-native-svg";
import { View } from "react-native";
import { Image as ImageExpo } from "expo-image";
import { Platform } from "react-native";

export const CircularProgress = ({
  imageSource,
  imageStyle,
  avance,
  image,
}) => {
  const data = [
    { x: 1, y: parseInt(avance) },
    { x: 2, y: 100 - parseInt(avance) },
  ];

  return (
    <>
      <Svg
        style={
          Platform.OS === "ios"
            ? { position: "absolute", top: -55, left: -30, zIndex: 100 }
            : { position: "absolute", top: -55, left: -30, zIndex: 100 }
        }
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
      {image ? (
        <ImageExpo
          source={{ uri: image }}
          style={{
            marginLeft: 20,
            width: 70,
            height: 70,
            borderRadius: 70,
          }}
        />
      ) : (
        <ImageExpo
          source={imageSource || require("../../../../assets/icon1.png")}
          style={{
            marginLeft: 20,
            width: 70,
            height: 70,
            borderRadius: 70,
          }}
        />
      )}
    </>
  );
};
