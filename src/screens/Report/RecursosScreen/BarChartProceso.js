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

export const BarChartProceso = (props) => {
  const { data } = props;
  let datas;
  let sumByEtapa;
  if (data) {
    sumByEtapa = {
      NoCompl: 0,
      EDPNoPagados: 0,
      Compl: 0,
      EDPPagados: 0,
    };

    const totalEntries = data?.length;
    for (let i = 0; i < totalEntries; i++) {
      if (
        data[i].AvanceAdministrativoTexto === "Contratista-Registro de Pago"
      ) {
        if (data[i].Moneda === "Dolares") {
          sumByEtapa["EDPPagados"] += parseInt(data[i].Monto) * 3.5;
        }
        if (data[i].Moneda === "Euros") {
          sumByEtapa["EDPPagados"] += parseInt(data[i].Monto) * 4;
        }
        if (data[i].Moneda === "Soles") {
          sumByEtapa["EDPPagados"] += parseInt(data[i].Monto);
        }
      } else if (
        data[i]["AvanceAdministrativoTexto"] === "Contratista-Envio EDP"
      ) {
        if (data[i]["Moneda"] === "Dolares") {
          sumByEtapa["EDPNoPagados"] += parseInt(data[i].Monto) * 3.5;
        }
        if (data[i]["Moneda"] === "Euros") {
          sumByEtapa["EDPNoPagados"] += parseInt(data[i].Monto) * 4;
        }
        if (data[i]["Moneda"] === "Soles") {
          sumByEtapa["EDPNoPagados"] += parseInt(data[i].Monto);
        }
      } else if (
        data[i]["AvanceAdministrativoTexto"] ===
          "Contratista-Avance Ejecucion" &&
        data[i]["AvanceEjecucion"] === "100"
      ) {
        if (data[i]["Moneda"] === "Dolares") {
          sumByEtapa["Compl"] += parseInt(data[i].Monto) * 3.5;
        }
        if (data[i]["Moneda"] === "Euros") {
          sumByEtapa["Compl"] += parseInt(data[i].Monto) * 4;
        }
        if (data[i]["Moneda"] === "Soles") {
          sumByEtapa["Compl"] += parseInt(data[i].Monto);
        }
      } else if (
        data[i]["AvanceAdministrativoTexto"] !== "Stand by" &&
        data[i]["AvanceAdministrativoTexto"] !== "Cancelacion"
      ) {
        if (data[i]["Moneda"] === "Dolares") {
          sumByEtapa["NoCompl"] += parseInt(data[i].Monto) * 3.5;
        }
        if (data[i]["Moneda"] === "Euros") {
          sumByEtapa["NoCompl"] += parseInt(data[i].Monto) * 4;
        }
        if (data[i]["Moneda"] === "Soles") {
          sumByEtapa["NoCompl"] += parseInt(data[i].Monto);
        }
      }
    }

    datas = [
      {
        label: "Pagado",
        value: sumByEtapa["EDPPagados"],
        unidad: "Soles",
      },
      {
        label: "No Pagado",
        value: sumByEtapa["EDPNoPagados"],
        unidad: "Soles",
      },
      {
        label: "Completado",
        value: sumByEtapa["Compl"],
        unidad: "Soles",
      },
      {
        label: "Ejecucion",
        value: sumByEtapa["NoCompl"],
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
            data={datas}
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
