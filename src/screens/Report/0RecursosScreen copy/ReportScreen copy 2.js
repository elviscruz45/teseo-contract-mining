import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { PietipoMantto } from "./PieTipoMantto";
import { PietipoIncidente } from "./PieTipoIncidente";
import { ProgressImage } from "./ImageProgress";
import { styles } from "./ReportScreen.styles";
import { RecursosProgress } from "./RecursosProgress";
import { CircularProgress } from "./CircularProgress";
import { PieChart } from "./PieStatus";

export const ReportScreen = () => {
  return (
    <ScrollView>
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
      <RecursosProgress cantidad={10} titulo={"Reparacion"} />
      <RecursosProgress cantidad={50} titulo={"Fabricacion"} />
      <RecursosProgress cantidad={70} titulo={"Ingenieria"} />
      <RecursosProgress cantidad={99} titulo={"Instalacion"} />

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
      <Text
        style={{
          paddingHorizontal: 15,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Reporte de Estado General
      </Text>
      <Text></Text>
      {/* <CircularProgress /> */}
      <PieChart />
    </ScrollView>
  );
};
