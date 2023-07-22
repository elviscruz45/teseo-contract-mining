import React, { useState, useEffect } from "react";
import { VictoryPie, VictoryLabel, VictoryAnimation } from "victory-native";
import Svg from "react-native-svg";
import { View, Image } from "react-native";

export const CircularProgress = () => {
  const [percent, setPercent] = useState(25);
  const [data, setData] = useState([
    { x: 1, y: percent },
    { x: 2, y: 100 - percent },
  ]);

  useEffect(() => {
    let percent = 25;
    const setStateInterval = setInterval(() => {
      percent += Math.random() * 25;
      percent = percent > 100 ? 0 : percent;
      setPercent(percent);
      setData(getData(percent));
    }, 2000);

    return () => {
      clearInterval(setStateInterval);
    };
  }, []);

  const getData = (percent) => {
    return [
      { x: 1, y: percent },
      { x: 2, y: 100 - percent },
    ];
  };

  return (
    <>
      <Svg width="100%" height="80%">
        <VictoryPie
          standalone={false}
          // animate={{ duration: 1000 }}
          width={200}
          height={200}
          data={data}
          innerRadius={60}
          cornerRadius={74}
          labels={() => null}
          style={{
            data: {
              fill: ({ datum }) => {
                const color = datum.y > 30 ? "green" : "red";
                return datum.x === 1 ? color : "transparent";
              },
            },
          }}
        />
      </Svg>
    </>
  );
};
