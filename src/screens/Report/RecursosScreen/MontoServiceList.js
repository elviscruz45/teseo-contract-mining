import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { DataTable } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";

export const MontoServiceList = (props) => {
  const { data } = props;
  const navigation = useNavigation();
  const newTableData = [];

  if (data) {
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].AvanceAdministrativoTexto !== "Standy by" &&
        data[i].AvanceAdministrativoTexto !== "Cancelacion"
      ) {
        newTableData.push({
          idServiciosAIT: data[i].idServiciosAIT,

          id: data[i].NumeroAIT,
          name: data[i].NombreServicio,
          price:
            data[i].Moneda === "Dolares"
              ? data[i].Monto * 3.5
              : data[i].Moneda === "Euros"
              ? data[i].Monto * 4
              : data[i].Monto,
          moneda: data[i].Moneda,
        });
      }
    }
  }

  newTableData?.sort((a, b) => b.price - a.price);
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
          <DataTable.Title style={styles.titulo2}>Nombre</DataTable.Title>
          <DataTable.Title style={styles.titulo3}>Valor</DataTable.Title>
        </DataTable.Header>

        {/* Table data */}
        {newTableData.map((item, index) => (
          <DataTable.Row key={index}>
            <Text
              style={styles.multiLineColumn}
              onPress={() => goToInformation(item.idServiciosAIT)}
            >
              {item.name}
            </Text>
            <DataTable.Cell style={styles.shortColumn2}>
              {"S/ "}

              {parseFloat(item.price).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </DataTable.Cell>
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
  titulo1: {
    flex: 0.77, // Adjust the value as per your requirement for the width
    maxWidth: 200, // Adjust the maxWidth as per your requirement
  },
  titulo2: {
    flex: 1, // Adjust the value as per your requirement for the width
  },
  titulo3: {
    flex: 0.45,
    // alignItems: "center",
  },
  shortColumn1: {
    flex: 0.77, // Adjust the value as per your requirement for the width
    maxWidth: 200, // Adjust the maxWidth as per your requirement
  },
  shortColumn2: {
    flex: 1, // Adjust the value as per your requirement for the width
  },
  multiLineColumn: {
    flex: 2,
    alignSelf: "center",
  },
});
