import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { DataTable } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";

export const EstadoServiceList = (props) => {
  const { data } = props;

  const navigation = useNavigation();
  const newTableData = [];

  if (data) {
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].AvanceAdministrativoTexto !== "Stand by" &&
        data[i].AvanceAdministrativoTexto !== "Cancelacion"
      ) {
        let daysLeft = data[i].NuevaFechaEstimada
          ? (
              (data[i].NuevaFechaEstimada.seconds * 1000 - Date.now()) /
              86400000
            ).toFixed(0)
          : ((data[i].FechaFin.seconds * 1000 - Date.now()) / 86400000).toFixed(
              0
            );

        newTableData.push({
          idServiciosAIT: data[i].idServiciosAIT,
          id: data[i].NumeroAIT,
          avance: data[i].AvanceEjecucion,
          name: data[i].NombreServicio,
          diasPendientes: daysLeft,
        });
      }
    }
  }

  newTableData?.sort((a, b) => a.diasPendientes - b.diasPendientes);
  const goToInformation = (idServiciosAIT) => {
    navigation.navigate(screen.search.tab, {
      screen: screen.search.item,
      params: { Item: idServiciosAIT },
    });
  };

  if (!data) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <DataTable>
        {/* Table header */}
        <DataTable.Header>
          <DataTable.Title style={styles.shortColumn1}>Avance</DataTable.Title>
          <DataTable.Title style={styles.multiLineColumn}>
            Nombre
          </DataTable.Title>
          <DataTable.Title style={styles.shortColumn2}>
            Dias Pendientes
          </DataTable.Title>
        </DataTable.Header>

        {/* Table data */}
        {newTableData.map((item, index) => (
          <DataTable.Row key={index}>
            <Text
              style={{
                flex: 0.75,
                color:
                  item.diasPendientes > 4
                    ? "black"
                    : item.diasPendientes > 0
                    ? "brown"
                    : "red",
                alignSelf: "center",
                textAlign: "left",
              }}
            >
              {item.avance}%
            </Text>
            <Text
              style={{
                flex: 2,
                color:
                  item.diasPendientes > 4
                    ? "black"
                    : item.diasPendientes > 0
                    ? "brown"
                    : "red",
                alignSelf: "center",
              }}
              onPress={() => goToInformation(item.idServiciosAIT)}
            >
              {item.name}
            </Text>
            <Text
              style={{
                flex: 1,
                color:
                  item.diasPendientes > 4
                    ? "black"
                    : item.diasPendientes > 0
                    ? "brown"
                    : "red",
                alignSelf: "center",
                textAlign: "center",
              }}
            >
              {item.diasPendientes} dias
            </Text>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },

  shortColumn1: {
    flex: 0.77, // Adjust the value as per your requirement for the width
    maxWidth: 200, // Adjust the maxWidth as per your requirement
  },
  shortColumn2: {
    flex: 0, // Adjust the value as per your requirement for the width
  },
  multiLineColumn: {
    flex: 1,
  },
});
