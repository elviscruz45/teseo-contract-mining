import React from "react";
import { View, StyleSheet } from "react-native";
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryTooltip,
  VictoryContainer,
  VictoryAxis,
  VictoryLabel,
} from "victory-native";
import { tipoServicioList } from "../../../utils/tipoServicioList";

const data = [
  { label: "EDP Pagados", value: 8224, unidad: "$" },
  { label: "EDP Pendiente", value: 2623, unidad: "$" },

  { label: "Serv Compl", value: 1200, unidad: "$" },

  // Add more data points as needed
];

export const BarChartProceso = () => {
  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={{ x: 25, y: 50 }} // Adjust the padding between the bars and the edges of the chart
          containerComponent={<VictoryContainer />} // Use VictoryContainer for tooltips
          horizontal={true}
          width={400} // Set the width of the chart (adjust as needed)
          height={250} // Set the height of the chart (adjust as needed)
        >
          <VictoryAxis
            dependentAxis // Horizontal chart requires a dependent axis for Y-axis
            style={{
              axis: { stroke: "blue" },
              tickLabels: { fill: "black" },
              // grid: { stroke: "transparent" },
            }}
          />
          <VictoryAxis // X-axis configuration for the full label visibility
            style={{
              axis: { stroke: "blue" },
              tickLabels: { fill: "black" },
            }}
            tickLabelComponent={
              <VictoryLabel // Use VictoryLabel as the custom tick label component
                angle={65} // Rotate the label by 45 degrees to fit more text
                textAnchor="end" // Anchor the label at the start position
                verticalAnchor="end" // Vertically center the label
              />
            }
          />
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
                text={({ datum }) => `${datum.unidad} ${datum.value} `}
              />
            } // Use VictoryTooltip for interactivity
          />
        </VictoryChart>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20, // padding: 30,
    // marginRight: 80,
    // margin: 10,
    // paddingHorizontal: 40,
    // alignSelf: "flex-start",
    // margin: 10,
    // flex: 1,
    // justifyContent: "right",
    // alignItems: "center",
    // backgroundColor: "white",
  },
});
