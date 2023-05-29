import React, { Component } from "react";
import {
  VictoryBar,
  VictoryAxis,
  VictoryPie,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
} from "victory-native";
import {
  Text,
  View,
  ScrollView,
  Linking,
  Animated,
  Easing,
} from "react-native";
import { AnimatedCircularProgress } from "./Animated";
import Svg from "react-native-svg";

class ReportScreen extends Component {
  handleLinkPress = async (props) => {
    console.log(props.children);
    const url = "https://www.google.com";
    const isSupported = await Linking.canOpenURL(url);
    if (isSupported) {
      await Linking.openURL(url);
    } else {
      console.log(`Cannot open URL: ${url}`);
    }
  };

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
    const colorScale = ["#FF0000", "#00FF00", "#0000FF", "#32CD32"];

    return (
      <ScrollView>
        <View>
          <Svg width={400} height={400}>
            <VictoryPie
              standalone={false}
              width={400}
              height={400}
              data={[
                { x: 1, y: 120 },
                { x: 2, y: 150 },
                { x: 3, y: 75 },
                { x: 4, y: 175 },
              ]}
              innerRadius={68}
              labelRadius={100}
              style={{ labels: { fontSize: 20, fill: "white" } }}
              colorScale={colorScale} // Set the color scale
            />
            <VictoryLabel
              textAnchor="middle"
              style={{ fontSize: 20 }}
              x={200}
              y={200}
              text="Pie!"
            />
          </Svg>
        </View>
        <VictoryPie
          data={data}
          innerRadius={70}
          labels={() => null} // Disable default labels
          colorScale={["#FF6347", "#FFA500", "#FFD700", "#32CD32"]} // Custom color scale
          labelRadius={90} // Adjust the distance of the label from the center
          style={{
            labels: { fill: "white", fontSize: 20, fontWeight: "bold" },
          }} // Customize the style of the label
          labelComponent={<VictoryLabel />} // Enable custom labels
        >
          <VictoryLabel
            textAnchor="middle"
            style={{ fontSize: 120 }}
            x={200}
            y={200}
            text="Pie!"
          />
        </VictoryPie>
        <VictoryPie
          data={data}
          innerRadius={80}
          labels={() => null} // Disable labels
          colorScale={["#FF6347", "#FFA500", "#FFD700", "#32CD32"]} // Custom color scale
        />

        <View>
          <Text>Maintenance KPs</Text>
          <Text onPress={this.handleLinkPress}>www.google.com</Text>
          <VictoryChart theme={VictoryTheme.material} />
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
          <Text>Maintenance KPI</Text>
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
