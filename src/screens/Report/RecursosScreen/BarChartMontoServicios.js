import React from "react";
import { View, StyleSheet, Text } from "react-native";
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

export const BarChartMontoServicios = (props) => {
  const { data } = props;

  let datas;

  let sumByTipoServicio;
  if (data) {
    sumByTipoServicio = {
      Reparacion: 0,
      Fabricacion: 0,
      Ingenieria: 0,
      Instalacion: 0,
      IngenieriayFabricacion: 0,
      Otro: 0,
    };

    const totalEntries = data?.length;
    for (let i = 0; i < totalEntries; i++) {
      const tipoServicio = data[i].TipoServicio;

      if (data[i]["Moneda"] === "Dolares") {
        sumByTipoServicio[tipoServicio] += parseInt(data[i].Monto) * 3.5;
      }
      if (data[i]["Moneda"] === "Euros") {
        sumByTipoServicio[tipoServicio] += parseInt(data[i].Monto) * 4;
      }

      if (data[i]["Moneda"] === "Soles") {
        sumByTipoServicio[tipoServicio] += parseInt(data[i].Monto);
      }
    }

    datas = [
      {
        label: "Rep",
        value: sumByTipoServicio["Reparacion"] ?? 0,
        unidad: "Soles",
      },
      {
        label: "Fab",
        value: sumByTipoServicio["Fabricacion"] ?? 0,
        unidad: "Soles",
      },
      {
        label: "Ing",
        value: sumByTipoServicio["Ingenieria"] ?? 0,
        unidad: "Soles",
      },
      {
        label: "Inst",
        value: sumByTipoServicio["Instalacion"] ?? 0,
        unidad: "Soles",
      },
      {
        label: "IngFab",
        value: sumByTipoServicio["IngenieriayFabricacion"] ?? 0,
        unidad: "Soles",
      },
      {
        label: "Otro",
        value: sumByTipoServicio["Otro"] ?? 0,
        unidad: "Soles",
      },
    ];
  }
  if (data?.length === 0) {
    return (
      <>
        <Text></Text>
        <Text style={{ alignSelf: "center" }}>
          No hay datos para mostrar grafica
        </Text>
      </>
    );
  }
  return (
    <View style={styles.container}>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={{ x: 35 }} // Adjust the padding between the bars and the edges of the chart
        containerComponent={<VictoryContainer />} // Use VictoryContainer for tooltips
      >
        <VictoryAxis
          dependentAxis // Horizontal chart requires a dependent axis for Y-axis
          style={{
            axis: { stroke: "blue" },
            tickLabels: { fill: "black" },
            margin: 30,
            tickLabels: { fontSize: 15, padding: -375 },

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
              angle={0} // Rotate the label by 45 degrees to fit more text
              textAnchor="end" // Anchor the label at the start position
              verticalAnchor="end" // Vertically center the label
            />
          }
        />

        <VictoryBar
          data={datas}
          x="label"
          y="value"
          style={{
            data: {
              fill: "green",
              stroke: "green",
              strokeWidth: 1,
              borderRadius: 5,
              marginLeft: 10,
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
    marginLeft: -50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
