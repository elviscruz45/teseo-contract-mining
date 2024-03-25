import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { DataTable } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export const MontoComprometido = (props) => {
  const { data } = props;

  // Helper function to get the abbreviated month name
  function getMonthName(month) {
    const monthNames = [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic",
    ];
    return monthNames[month - 1];
  }

  // convertFirebaseTimestampToJSDate
  function convertFirebaseTimestampToJSDate(timestamp) {
    const { seconds, nanoseconds } = timestamp;
    const milliseconds = seconds * 1000 + nanoseconds / 1000000;

    return new Date(milliseconds);
  }

  // Grouping fruits by year and month and calculating the sum of values
  const ServicesByYearAndMonth = {};
  let ServicesByYearAndMonthList = [];
  if (data) {
    data.forEach((item) => {
      if (
        item.AvanceAdministrativoTexto !== "Stand by" &&
        item.AvanceAdministrativoTexto !== "Cancelacion"
      ) {
        const date =
          convertFirebaseTimestampToJSDate(item.NuevaFechaEstimada ?? 0) >
          convertFirebaseTimestampToJSDate(item.FechaFin)
            ? convertFirebaseTimestampToJSDate(item.NuevaFechaEstimada ?? 0)
            : convertFirebaseTimestampToJSDate(item.FechaFin);

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const key = `${year} ${getMonthName(month)}`;
        if (!ServicesByYearAndMonth[key]) {
          ServicesByYearAndMonth[key] = {
            date: date,
            year: year.toString(),
            month: getMonthName(month),
            valueSum: 0,
          };
        }

        ServicesByYearAndMonth[key].valueSum +=
          item.Moneda === "Dolares"
            ? parseInt(item.Monto) * 3.5
            : item.Moneda === "Euros"
            ? parseInt(item.Monto) * 4
            : parseInt(item.Monto);
      }
    });

    ServicesByYearAndMonthList = Object.values(ServicesByYearAndMonth).sort(
      (a, b) => a.date - b.date
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <DataTable>
        {/* Table header */}
        <DataTable.Header>
          <DataTable.Title style={styles.multiLineColumn}>Año</DataTable.Title>
          <DataTable.Title style={styles.multiLineColumn}>Mes</DataTable.Title>
          <DataTable.Title style={styles.column4}>Valor</DataTable.Title>
        </DataTable.Header>

        {/* Table data */}
        {ServicesByYearAndMonthList.map((item, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell style={styles.multiLineColumn}>
              {item.year}
            </DataTable.Cell>
            <DataTable.Cell style={styles.multiLineColumn}>
              {item.month}
            </DataTable.Cell>
            <DataTable.Cell style={styles.multiLineColumn}>
              {"S/ "}
              {parseFloat(item.valueSum).toLocaleString(undefined, {
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

  multiLineColumn: {
    flex: 1,
  },
});
