import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { PietipoMantto } from "./PieTipoMantto";
import { PietipoIncidente } from "./PieTipoIncidente";
import { CircularProgress } from "./CircularProgress";
import { ProgressImage } from "./ImageProgress";
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
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ProgressImage
              progress={75}
              imageSource={require("../../../../assets/equipmentplant/ImageIcons/c2cr001.jpeg")}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
