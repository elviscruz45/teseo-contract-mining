import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { DataTable } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";

export const MontoEDPList = (props) => {
  const { data } = props;
  const navigation = useNavigation();
  const newTableData = [];

  if (data) {
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].AvanceAdministrativoTexto !== "Stand by" &&
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
          etapa:
            data[i]["AvanceAdministrativoTexto"] ===
              "Contratista-Fin servicio" ||
            data[i]["AvanceAdministrativoTexto"] ===
              "Contratista-Registro de Pago"
              ? "Pagado"
              : data[i]["AvanceAdministrativoTexto"] ===
                  "Usuario-Aprobacion EDP" ||
                data[i]["AvanceAdministrativoTexto"] === "Contratista-Envio EDP"
              ? "NoPagado"
              : data[i]["AvanceEjecucion"] === "100"
              ? "Compl"
              : "Ejec",
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
          <DataTable.Title style={styles.multiLineColumn}>
            Nombre
          </DataTable.Title>
          <DataTable.Title style={styles.shortColumn2}>Etapa</DataTable.Title>
          <DataTable.Title style={styles.column4}>Valor</DataTable.Title>
        </DataTable.Header>

        {/* Table data */}
        {newTableData.map((item, index) => (
          <DataTable.Row key={index}>
            <Text
              style={{
                flex: 2,
                alignSelf: "center",

                color: item.etapa === "NoPagado" ? "red" : "black",
              }}
              onPress={() => goToInformation(item.idServiciosAIT)}
            >
              {item.name}
            </Text>
            <Text
              style={{
                flex: 1,
                alignSelf: "center",

                color: item.etapa === "NoPagado" ? "red" : "black",
              }}
            >
              {item.etapa}
            </Text>
            <Text
              style={{
                flex: 0,
                alignSelf: "center",

                color: item.etapa === "NoPagado" ? "red" : "black",
              }}
            >
              {" "}
              {"S/ "}
              {parseFloat(item.price).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
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
    flex: 1, // Adjust the value as per your requirement for the width
  },
  shortColumn3: {
    flex: 0.4, // Adjust the value as per your requirement for the width
  },
  multiLineColumn: {
    flex: 2,
  },
});
