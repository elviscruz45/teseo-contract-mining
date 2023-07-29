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

export const BarChartProceso = (props) => {
  const { data } = props;
  let datas = [
    { label: "EDP Pagados", value: 100, unidad: "Soles" },
    { label: "EDP Pendiente", value: 100, unidad: "Soles" },
    { label: "Serv Compl", value: 100, unidad: "Soles" },
    { label: "Serv Compl2", value: 100, unidad: "Soles" },
    // Add more data points as needed
  ];

  let sumByEtapa;
  if (data) {
    sumByEtapa = {};
    console.log(data?.length);
    const totalEntries = data?.length;
  for (let i = 0; i < totalEntries; i++) {
      console.log((data[0])}
      // if (data[i]["AvanceAdministrativoTexto"] === "Contratista-Fin servicio") {
      //   if (data[i]["Moneda"] === "Dolares") {
      //     sumByEtapa["EDPPagados"] += parseInt(data[i].Monto) * 3.5;
      //   }
      //   if (data[i]["Moneda"] === "Euros") {
      //     sumByEtapa["EDPPagados"] += parseInt(data[i].Monto) * 4;
      //   }
      //   sumByEtapa["EDPPagados"] += parseInt(data[i].Monto);
      // } else if (data[i]["AvanceEjecucion"] === "100") {
      //   if (data[i]["Moneda"] === "Dolares") {
      //     sumByEtapa["Compl"] += parseInt(data[i].Monto) * 3.5;
      //   }
      //   if (data[i]["Moneda"] === "Euros") {
      //     sumByEtapa["Compl"] += parseInt(data[i].Monto) * 4;
      //   }
      //   sumByEtapa["Compl"] += parseInt(data[i].Monto);
      // } else if (
      //   data[i]["AvanceAdministrativoTexto"] === "Contratista-Envio EDP"
      // ) {
      //   if (data[i]["Moneda"] === "Dolares") {
      //     sumByEtapa["EDPNoPagados"] += parseInt(data[i].Monto) * 3.5;
      //   }
      //   if (data[i]["Moneda"] === "Euros") {
      //     sumByEtapa["EDPNoPagados"] += parseInt(data[i].Monto) * 4;
      //   }
      //   sumByEtapa["EDPNoPagados"] += parseInt(data[i].Monto);
      // } else if (
      //   data[i]["AvanceAdministrativoTexto"] !== "Stand by" &&
      //   data[i]["AvanceAdministrativoTexto"] !== "Cancelacion"
      // ) {

      //   if (data[i]["Moneda"] === "Dolares") {
      //     sumByEtapa["NoCompl"] = parseInt(data[i].Monto) * 3.5;
      //   }
      //   if (data[i]["Moneda"] === "Euros") {
      //     sumByEtapa["NoCompl"] = parseInt(data[i].Monto) * 4;
      //   }
      //   sumByEtapa["NoCompl"] = parseInt(data[i].Monto);
      // }
    // }
    // datas = [
    //   {
    //     label: "EDP Pagados",
    //     value: 23,
    //     unidad: "Soles",
    //   },
    //   {
    //     label: "EDP Pendiente",
    //     value: 33,
    //     unidad: "Soles",
    //   },
    //   {
    //     label: "Compl",
    //     value: 22,
    //     unidad: "Soles",
    //   },
    //   {
    //     label: "No Compl",
    //     value: 11,
    //     unidad: "Soles",
    //   },
    // ];
    // datas = [
    //   {
    //     label: "No Compl",
    //     value: sumByEtapa["NoCompl"] ?? 0,
    //     unidad: "Soles",
    //   },
    //   {
    //     label: "Compl",
    //     value: sumByEtapa["Compl"] ?? 0,
    //     unidad: "Soles",
    //   },
    //   {
    //     label: "EDP Pendiente",
    //     value: sumByEtapa["EDPNoPagados"] ?? 0,
    //     unidad: "Soles",
    //   },
    //   {
    //     label: "EDP Pagados",
    //     value: sumByEtapa["EDPPagados"] ?? 0,
    //     unidad: "Soles",
    //   },
  //   // ];
  // }
  console.log(sumByEtapa);
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
