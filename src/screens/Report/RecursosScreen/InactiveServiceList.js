import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { DataTable } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";

export const InactiveServiceList = (props) => {
  const { data } = props;
  const navigation = useNavigation();

  const newTableData = [];
  if (data) {
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].AvanceAdministrativoTexto === "Stand by" ||
        data[i].AvanceAdministrativoTexto === "Cancelacion"
      ) {
        newTableData.push({
          idServiciosAIT: data[i].idServiciosAIT,

          id: data[i].NumeroAIT,
          name: data[i].NombreServicio,
          estado: data[i].AvanceAdministrativoTexto,
        });
      }
    }
  }

  const goToInformation = (idServiciosAIT) => {
    navigation.navigate(screen.search.tab, {
      screen: screen.search.item,
      params: { Item: idServiciosAIT },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <DataTable>
        {/* Table header */}
        <DataTable.Header>
          <DataTable.Title style={styles.shortColumn1}>ID</DataTable.Title>
          <DataTable.Title style={styles.multiLineColumn}>
            Nombre
          </DataTable.Title>
          <DataTable.Title style={styles.shortColumn1}>Estado</DataTable.Title>
        </DataTable.Header>

        {newTableData.length === 0 ? (
          <Text>No hay datos Servicios Inactivos</Text>
        ) : (
          newTableData.map((item, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell style={styles.shortColumn1}>
                {item.id}
              </DataTable.Cell>
              <Text
                style={styles.multiLineColumn}
                onPress={() => goToInformation(item.idServiciosAIT)}
              >
                {item.name}
              </Text>
              <DataTable.Cell style={styles.shortColumn1}>
                {item.estado}
              </DataTable.Cell>
            </DataTable.Row>
          ))
        )}
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
  column: {
    flex: 1,
  },
  column4: {
    flex: 1,
  },
  shortColumn1: {
    flex: 0.77, // Adjust the value as per your requirement for the width
    maxWidth: 200, // Adjust the maxWidth as per your requirement
  },
  shortColumn2: {
    flex: 1, // Adjust the value as per your requirement for the width
  },
  shortColumn3: {
    flex: 0.4, // Adjust the value as per your requirement for the width
  },
  multiLineColumn: {
    flex: 2,
  },
});
