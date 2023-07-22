import React from "react";
import { View, Image } from "react-native";
import { VictoryPie, VictoryLabel, VictoryAnimation } from "victory-native";
import Svg from "react-native-svg";

export const ProgressImage = ({ progress, imageSource }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Svg width={200} height={200}>
        <VictoryPie
          standalone={false}
          width={200}
          height={200}
          data={[
            { x: 1, y: progress },
            { x: 2, y: 100 - progress },
          ]}
          innerRadius={70}
          cornerRadius={25}
          labels={() => null}
          style={{
            data: {
              fill: (d) => (d.x === 1 ? "blue" : "transparent"),
            },
          }}
        />
        <VictoryAnimation duration={1000} data={{ progress }}>
          {(animatedProps) => (
            <VictoryLabel
              textAnchor="middle"
              verticalAnchor="middle"
              x={100}
              y={100}
              text={`${Math.round(animatedProps.progress)}%`}
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            />
          )}
        </VictoryAnimation>
      </Svg>
      <Image
        source={imageSource}
        style={{
          width: 50,
          height: 50,
          position: "absolute",
          borderRadius: 80,
        }}
      />
    </View>
  );
};
