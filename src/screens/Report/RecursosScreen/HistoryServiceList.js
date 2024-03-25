import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { DataTable } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";

export const HistoryServiceList = (props) => {
  const { data } = props;
  const navigation = useNavigation();
  const newTableData = [];

  if (data) {
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].AvanceAdministrativoTexto === "Contratista-Inicio Servicio" ||
        data[i].AvanceAdministrativoTexto ===
          "Contratista-Solicitud Aprobacion Doc" ||
        data[i].AvanceAdministrativoTexto === "Usuario-Aprobacion Doc" ||
        data[i].AvanceAdministrativoTexto === "Contratista-Avance Ejecucion" ||
        data[i].AvanceAdministrativoTexto ===
          "Contratista-Solicitud Ampliacion Servicio" ||
        data[i].AvanceAdministrativoTexto === "Usuario-Aprobacion Ampliacion"
      ) {
        let daysLeft = (
          (data[i].FechaFin.seconds * 1000 - Date.now()) /
          86400000
        ).toFixed(0);

        newTableData.push({
          idServiciosAIT: data[i].idServiciosAIT,
          id: data[i].NumeroAIT,
          avance: data[i].AvanceEjecucion,
          name: data[i].NombreServicio,
          diasPendientes: daysLeft,
          fechaPostFormato: data[i].fechaPostFormato,
          createdAt: data[i].createdAt,
        });
      }
    }
  }

  newTableData?.sort((a, b) => a.createdAt - b.createdAt);
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
          <DataTable.Title style={styles.shortColumn1}>Fecha</DataTable.Title>
          <DataTable.Title style={styles.multiLineColumn}>
            Nombre
          </DataTable.Title>
        </DataTable.Header>

        {/* Table data */}
        {newTableData.map((item, index) => (
          <DataTable.Row key={index}>
            <Text
              style={{
                flex: 0.75,

                alignSelf: "center",
                textAlign: "left",
              }}
            >
              {item.fechaPostFormato}
            </Text>
            <Text
              style={{
                flex: 2,

                alignSelf: "center",
              }}
              onPress={() => goToInformation(item.idServiciosAIT)}
            >
              {item.name}
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
