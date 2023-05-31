import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { PietipoMantto } from "./PieTipoMantto";
import { PietipoIncidente } from "./PieTipoIncidente";
import { CircularProgress } from "./CircularProgress";
import { styles } from "./ReportScreen.styles";

export const ReportScreen = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text></Text>
        <Text style={styles.title}>Eventos Registrados</Text>
        <View style={styles.row}>
          <View style={styles.chartContainer}>
            <CircularProgress />
            <Text style={styles.subtitle}>Programado</Text>
          </View>
          <View style={styles.chartContainer}>
            <CircularProgress />
            <Text style={styles.subtitle}>No programado</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.chartContainer}>
            <CircularProgress />
            <Text style={styles.subtitle}>Seguridad</Text>
          </View>
          <View style={styles.chartContainer}>
            <CircularProgress />
            <Text style={styles.subtitle}>Medio Ambiente</Text>
          </View>
        </View>
        <Text style={styles.title}>Eventos de Mantenimiento</Text>
        <View style={styles.row}>
          <View style={styles.chartContainer}>
            <CircularProgress />
            <Text style={styles.subtitle}>Preventivo</Text>
          </View>
          <View style={styles.chartContainer}>
            <CircularProgress />
            <Text style={styles.subtitle}>Correctivo</Text>
          </View>
        </View>
        <Text style={styles.title}>Tipo de Detencion</Text>
        <View style={styles.row}>
          <View style={styles.chartContainer}>
            <CircularProgress />
            <Text style={styles.subtitle}>Mecanico</Text>
          </View>
          <View style={styles.chartContainer}>
            <CircularProgress />
            <Text style={styles.subtitle}>Hidraulico</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.chartContainer}>
            <CircularProgress />
            <Text style={styles.subtitle}>Electrico</Text>
          </View>
          <View style={styles.chartContainer}>
            <CircularProgress />
            <Text style={styles.subtitle}>Instrumentacion</Text>
          </View>
        </View>
        <View style={styles.chartContainer}>
          <CircularProgress />
          <Text style={styles.subtitle}>Operativa</Text>
        </View>
        <Text style={styles.title}>Top 5 - Equipos mas intervenidos</Text>

        <View style={styles.row}>
          <View style={styles.chartContainer}>
            <CircularProgress />
            <Text style={styles.subtitle}>C2-CR001</Text>
          </View>
          <View style={styles.chartContainer}>
            <CircularProgress />
            <Text style={styles.subtitle}>C1-CV001</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.chartContainer}>
            <CircularProgress />
            <Text style={styles.subtitle}>C2-ML001</Text>
          </View>
          <View style={styles.chartContainer}>
            <CircularProgress />
            <Text style={styles.subtitle}>C1-CR001</Text>
          </View>
        </View>
        <View style={styles.chartContainer}>
          <CircularProgress />
          <Text style={styles.subtitle}>C2-SC001</Text>
        </View>
      </View>
    </ScrollView>
  );
};
