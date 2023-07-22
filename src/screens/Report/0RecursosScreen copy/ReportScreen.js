import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { PietipoMantto } from "./PieTipoMantto";
import { PietipoIncidente } from "./PieTipoIncidente";
import { ProgressImage } from "./ImageProgress";
import { styles } from "./ReportScreen.styles";
import { RecursosProgress } from "./RecursosProgress";
import { CircularProgress } from "./CircularProgress";
import { PieChart } from "./PieStatus";
import { BarChartProceso } from "./BarChartProceso";

export const ReportScreen = () => {
  return (
    <ScrollView
      style={{ backgroundColor: "white" }} // Add backgroundColor here
    >
      <Text></Text>
      <Text
        style={{
          paddingHorizontal: 15,
          fontWeight: "900",
          textAlign: "center",
        }}
      >
        PRODISE
      </Text>
      <Text></Text>

      <Text
        style={{
          paddingHorizontal: 15,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Disponibiliad Recursos
      </Text>
      <Text></Text>
      <RecursosProgress
        cantidad={55}
        titulo={"Reparacion"}
        unidad={"tecnicos"}
      />
      <RecursosProgress
        cantidad={10}
        titulo={"Fabricacion"}
        unidad={"tecnicos"}
      />
      <RecursosProgress
        cantidad={40}
        titulo={"Ingenieria"}
        unidad={"tecnicos"}
      />
      <RecursosProgress
        cantidad={59}
        titulo={"Instalacion"}
        unidad={"tecnicos"}
      />

      <Text
        style={{
          paddingHorizontal: 15,
          fontWeight: "300",
          textAlign: "right",
          fontSize: 12,
        }}
      >
        Ultima Actualizacion: 21 Octubre 2023
      </Text>
      <Text></Text>
      <Text></Text>
      <Text
        style={{
          paddingHorizontal: 15,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Reporte de Estado General
      </Text>
      <PieChart />
      <Text
        style={{
          paddingHorizontal: 15,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Cantidad Servicios
      </Text>
      <View style={styles2.container22}>
        <BarChartExample />
      </View>
      <Text
        style={{
          paddingHorizontal: 15,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Monto Servicios
      </Text>
      <View style={styles2.container22}>
        <BarChartExample />
      </View>

      <Text
        style={{
          paddingHorizontal: 15,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Estado de Pago
      </Text>
      <Text></Text>
      <RecursosProgress
        cantidad={55}
        titulo={"EDP Pendientes de Pago"}
        unidad={"soles"}
      />
      <RecursosProgress cantidad={10} titulo={"EDP Pagados"} unidad={"soles"} />
    </ScrollView>
  );
};

const styles2 = StyleSheet.create({
  container22: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});
