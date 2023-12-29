import React from "react";
import { View, StyleSheet } from "react-native";
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryTooltip,
  VictoryContainer,
  VictoryAxis,
} from "victory-native";
import { tipoServicioList } from "../../../utils/tipoServicioList";

const data = [
  { label: tipoServicioList[0].value, value: 12, unidad: "servicios" },
  { label: tipoServicioList[1].value, value: 13, unidad: "servicios" },
  { label: tipoServicioList[2].value, value: 6, unidad: "servicios" },
  { label: tipoServicioList[3].value, value: 2, unidad: "servicios" },

  // Add more data points as needed
];

export const BarChartExample = () => {
  return (
    <View style={styles.container}>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={{ x: 25 }} // Adjust the padding between the bars and the edges of the chart
        containerComponent={<VictoryContainer />} // Use VictoryContainer for tooltips
      >
        <VictoryBar
          data={data}
          x="label"
          y="value"
          style={{
            data: {
              fill: "skyblue",
              stroke: "skyblue",
              strokeWidth: 1,
              borderRadius: 5,
            },
          }}
          barWidth={20} // Adjust this value to control the bar width
          cornerRadius={{ top: 10, bottom: 10 }} // Adjust this value to control the cylinder height
          labels={({ datum }) => datum.value} // Display value labels on top of the bars
          labelComponent={
            <VictoryTooltip
              cornerRadius={5}
              pointerLength={10}
              flyoutStyle={{ stroke: "black", strokeWidth: 1, fill: "white" }}
              renderInPortal={false} // Avoid the "renderInPortal" warning
              text={({ datum }) => `${datum.value} ${datum.unidad}`}
            />
          } // Use VictoryTooltip for interactivity
        />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
