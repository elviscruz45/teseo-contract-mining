import React from "react";
import { View, StyleSheet } from "react-native";
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryLabel,
  VictoryAxis,
  VictoryTooltip,
  VictoryContainer,
} from "victory-native";

const data = [
  { label: "A", value: 10 },
  { label: "B", value: 5 },
  { label: "C", value: 15 },
  { label: "D", value: 15 },

  { label: "E", value: 15 },

  // Add more data points as needed
];

export const BarChartExample = () => {
  return (
    <View style={styles.container}>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={{ x: 20 }} // Adjust the padding between the bars and the edges of the chart
        containerComponent={<VictoryContainer />} // Use VictoryContainer for tooltips
      >
        <VictoryAxis
          style={
            {
              // axis: { stroke: "transparent" },
              // tickLabels: { fill: "transparent" },
              // grid: { stroke: "transparent" },
            }
          }
        />
        <VictoryBar
          data={data}
          x="label"
          y="value"
          style={{
            data: {
              fill: "steelblue",
              stroke: "blue",
              strokeWidth: 1,
              borderRadius: 5,
            },
          }}
          barWidth={25} // Adjust this value to control the bar width
          cornerRadius={{ top: 10, bottom: 10 }} // Adjust this value to control the cylinder height
          labels={({ datum }) => datum.value} // Display value labels on top of the bars
          labelComponent={
            <VictoryTooltip
              cornerRadius={5}
              pointerLength={10}
              flyoutStyle={{ stroke: "black", strokeWidth: 1, fill: "white" }}
            />
          }
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
