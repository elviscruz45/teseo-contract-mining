import React, { Component } from "react";
import { VictoryBar, VictoryAxis, VictoryPie } from "victory-native";
import { Text, View, ScrollView } from "react-native";

export class ReportScreen extends Component {
  render() {
    const data = [
      { x: "A", y: 10 },
      { x: "B", y: 5 },
      { x: "C", y: 15 },
      { x: "D", y: 8 },
    ];
    const data2 = [
      { x: "A", y: 40 },
      { x: "B", y: 20 },
      { x: "C", y: 30 },
      { x: "D", y: 10 },
    ];
    return (
      <ScrollView>
        <View>
          <Text>Hello!</Text>
          <VictoryAxis
            label="X-axis"
            style={{
              axisLabel: { padding: 30 },
              tickLabels: { fontSize: 10, padding: 5 },
            }}
          />
          <VictoryAxis
            dependentAxis
            label="Y-axis"
            style={{
              axisLabel: { padding: 30 },
              tickLabels: { fontSize: 10, padding: 5 },
            }}
          />
          <VictoryBar
            data={data}
            x="x"
            y="y"
            labels={({ datum }) => `${datum.y}`}
            style={{
              data: { fill: "#c43a31" },
            }}
          />
        </View>
        <View>
          <Text>Hello!</Text>
          <VictoryPie
            data={data}
            labels={({ datum }) => `${datum.x}: ${datum.y}`}
            colorScale={["#c43a31", "#FFA500", "#FFC0CB", "#008000"]}
          />
        </View>
      </ScrollView>
    );
  }
}
