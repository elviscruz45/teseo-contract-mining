import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { PietipoMantto } from "./PieTipoMantto";
import { PietipoIncidente } from "./PieTipoIncidente";
import { CircularProgress } from "./CircularProgress";

export const ReportScreen = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text></Text>
        <Text>Eventos Registrados</Text>
        <View style={styles.row}>
          <View style={styles.chartContainer}>
            <CircularProgress />
            <Text>Programado</Text>
          </View>
          <View style={styles.chartContainer}>
            <CircularProgress />
            <Text>No programado</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.chartContainer}>
            <CircularProgress />
            <Text>Seguridad</Text>
          </View>
          <View style={styles.chartContainer}>
            <CircularProgress />
            <Text>Medio Ambiente</Text>
          </View>
        </View>
        <Text>Eventos de Mantenimiento</Text>
        <View style={styles.row}>
          <View style={styles.chartContainer}>
            <CircularProgress />
            <Text>Preventivo</Text>
          </View>
          <View style={styles.chartContainer}>
            <CircularProgress />
            <Text>Correctivo</Text>
          </View>
        </View>
        <Text>Tipo de Detencion</Text>
        <View style={styles.row}>
          <View style={styles.chartContainer}>
            <CircularProgress />
            <Text>Mecanico</Text>
          </View>
          <View style={styles.chartContainer}>
            <CircularProgress />
            <Text>Hidraulico</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.chartContainer}>
            <CircularProgress />
            <Text>Electrico</Text>
          </View>
          <View style={styles.chartContainer}>
            <CircularProgress />
            <Text>Instrumentacion</Text>
          </View>
        </View>
        <View style={styles.chartContainer}>
          <CircularProgress />
          <Text>Operativa</Text>
        </View>
        <Text>Top 5 - Equipos mas intervenidos</Text>

        <View style={styles.row}>
          <View style={styles.chartContainer}>
            <CircularProgress />
            <Text>C2-CR001</Text>
          </View>
          <View style={styles.chartContainer}>
            <CircularProgress />
            <Text>C1-CV001</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.chartContainer}>
            <CircularProgress />
            <Text>C2-ML001</Text>
          </View>
          <View style={styles.chartContainer}>
            <CircularProgress />
            <Text>C1-CR001</Text>
          </View>
        </View>
        <View style={styles.chartContainer}>
          <CircularProgress />
          <Text>C2-SC001</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  chartContainer: {
    width: 200, // Adjust the width as needed
    height: 220, // Adjust the height as needed
    margin: 0,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
});
